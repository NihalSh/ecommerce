package common

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strconv"
	"strings"

	"github.com/NihalSh/ecommerce/common/adapters"
	"github.com/NihalSh/ecommerce/common/persistence"
	"github.com/gorilla/mux"
)

func CreateRESTRoutes(resource string, mma adapters.MapToModelAdapter) []Route {
	capitalized := strings.Title(resource)
	prefix := "/" + resource + "s"
	idURL := prefix + "/{id:[a-zA-Z0-9]+}"
	return []Route{

		Route{
			"Get" + capitalized + "s",
			"GET",
			prefix,
			func(w http.ResponseWriter, r *http.Request) {
				ctx := AddUserToContext(context.Background(), r.URL.Query())

				obj, err := mma.FindAll(ctx, flatten(r.URL.Query()))
				if err != nil {
					fmt.Println(err.Error())
					w.WriteHeader(http.StatusInternalServerError)
					return
				}
				WriteJSONResponse(w, obj)
			},
		},
		Route{

			"Get" + capitalized,
			"GET",
			idURL,
			func(w http.ResponseWriter, r *http.Request) {
				ctx := AddUserToContext(context.Background(), r.URL.Query())

				id := mux.Vars(r)["id"]
				obj, err := mma.FindId(ctx, id)
				if err != nil {
					if err == persistence.ErrNoSuchElement {
						http.Error(w, err.Error(), 404)
						return
					}
					fmt.Println(err.Error())
					w.WriteHeader(http.StatusInternalServerError)
					return
				}
				WriteJSONResponse(w, obj)
			},
		},
		Route{
			"Create" + capitalized,
			"POST",
			prefix,
			func(w http.ResponseWriter, r *http.Request) {
				ctx := AddUserToContext(context.Background(), r.URL.Query())

				m := make(map[string]interface{})
				if r.Body == nil {
					http.Error(w, "Please send a request body", 400)
					return
				}
				defer r.Body.Close()
				if err := json.NewDecoder(r.Body).Decode(&m); err != nil {
					fmt.Println("decoding request body : " + err.Error())
					w.WriteHeader(http.StatusInternalServerError)
					return
				}
				if err := mma.Create(ctx, m); err != nil {
					fmt.Println(err.Error())
					w.WriteHeader(http.StatusInternalServerError)
					return
				}
				w.WriteHeader(http.StatusCreated)

			},
		},
		Route{
			"Update" + capitalized,
			"PUT",
			idURL,
			func(w http.ResponseWriter, r *http.Request) {
				ctx := AddUserToContext(context.Background(), r.URL.Query())

				m := make(map[string]interface{})
				if r.Body == nil {
					http.Error(w, "Please send a request body", 400)
					return
				}
				if err := json.NewDecoder(r.Body).Decode(&m); err != nil {
					fmt.Println(err.Error())
					return
				}
				id := mux.Vars(r)["id"]
				m["id"] = id
				if err := mma.Save(ctx, m); err != nil {
					fmt.Println(r.URL.Path + " " + ": " + err.Error())
					w.WriteHeader(http.StatusInternalServerError)
				}
			},
		},
		Route{
			"Delete" + capitalized,
			"DELETE",
			idURL,
			func(w http.ResponseWriter, r *http.Request) {
				ctx := AddUserToContext(context.Background(), r.URL.Query())

				id := mux.Vars(r)["id"]
				if err := mma.DeleteId(ctx, id); err != nil {
					fmt.Println(r.URL.Path + " " + ": " + err.Error())
					w.WriteHeader(http.StatusInternalServerError)
				}
			},
		},
	}
}

// converts url.Values (map[string][]string to map[string]string by joining the values
func flatten(v url.Values) map[string]string {
	m := make(map[string]string)
	for key, value := range v {
		m[key] = strings.Join(value, ",")
	}
	return m
}
func WriteJSONResponse(w http.ResponseWriter, data interface{}) {
	jsonData, _ := json.Marshal(data)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Content-Length", strconv.Itoa(len(jsonData)))
	w.WriteHeader(http.StatusOK)
	w.Write(jsonData)
}

func AddUserToContext(ctx context.Context, r url.Values) context.Context {
	userArray, ok := r["user_id"]
	if !ok {
		return ctx
	}
	return context.WithValue(ctx, "userId", userArray[0])

}
