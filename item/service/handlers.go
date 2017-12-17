package service

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/NihalSh/ecommerce/item/dbclient"
	"github.com/gorilla/mux"
)

var DbClient dbclient.IDbClient

func GetItem(w http.ResponseWriter, r *http.Request) {

	// Read the 'itemId' path parameter from the mux map
	var itemId = mux.Vars(r)["itemId"]

	// Read the item struct
	item, err := DbClient.QueryItem(itemId)

	// If err, return a 404
	if err != nil {
		fmt.Println("GetItem " + itemId + ": " + err.Error())
		w.WriteHeader(http.StatusNotFound)
		return
	}

	// If found, marshal into JSON, write headers and content
	data, _ := json.Marshal(item)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Content-Length", strconv.Itoa(len(data)))
	w.WriteHeader(http.StatusOK)
	w.Write(data)
}
