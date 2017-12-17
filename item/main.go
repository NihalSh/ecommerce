package main

import (
	"fmt"

	"github.com/NihalSh/ecommerce/item/dbclient"
	"github.com/NihalSh/ecommerce/item/service"
)

var appName = "itemservice"

func main() {
	fmt.Printf("Starting %v\n", appName)
	initializeDbClient()
	service.StartWebServer("6767")
}

func initializeDbClient() {
	service.DbClient = &dbclient.MockDbClient{}
	service.DbClient.OpenDb()
	service.DbClient.Seed()
}
