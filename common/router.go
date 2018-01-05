package common

import (
	"net/http"

	"github.com/gorilla/mux"
)

type Route struct {
	name        string
	method      string
	pattern     string
	handlerFunc http.HandlerFunc
}

func NewRouter(routes []Route) *mux.Router {

	router := mux.NewRouter().StrictSlash(true)
	for _, r := range routes {

		router.Methods(r.method).
			Path(r.pattern).
			Name(r.name).
			Handler(r.handlerFunc)

	}
	return router
}
