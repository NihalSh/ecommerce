package service

import "net/http"

// Defines a single route, e.g. a human readable name, HTTP method, pattern the function that will execute when the route is called.
type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

// Initialize our routes
var routes = []Route{

	Route{
		"GetItem",         // Name
		"GET",             // HTTP method
		"/items/{itemId}", // Route pattern
		GetItem,
	},
}
