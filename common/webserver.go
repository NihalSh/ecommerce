package common

import (
	"log"
	"net/http"
)

func StartWebServer(port string, routes []Route) {

	r := NewRouter(routes)
	http.Handle("/", r)

	log.Println("Starting HTTP service at " + port)
	err := http.ListenAndServe(":"+port, nil)

	if err != nil {
		log.Println("An error occured starting HTTP listener at port " + port)
		log.Println("Error: " + err.Error())
	}
}
