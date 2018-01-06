package main

import (
	"fmt"
	"log"

	"github.com/NihalSh/ecommerce/common"
	"github.com/NihalSh/ecommerce/common/adapters"
	"github.com/NihalSh/ecommerce/common/persistence"
	"github.com/NihalSh/ecommerce/item/models"
)

var appName = "itemservice"

func main() {
	fmt.Printf("Starting %v\n", appName)

	itemsManager := &models.ItemsManager{
		&persistence.MongoDbClient{
			DbUrl:      "mongo",
			Db:         "test",
			Collection: "item",
		},
	}
	reviewsManager := &models.ReviewsManager{
		&persistence.MongoDbClient{
			DbUrl:      "mongo",
			Db:         "test",
			Collection: "reviews",
		},
	}

	if err := itemsManager.Open(); err != nil {
		log.Fatalf("main: %v", err)
	}
	if err := reviewsManager.Open(); err != nil {
		log.Fatalf("main: %v", err)
	}

	defer itemsManager.Close()
	defer reviewsManager.Close()

	persistence.Global.AddModel(&models.Item{}, itemsManager)
	persistence.Global.AddModel(&models.Review{}, reviewsManager)

	var routes []common.Route

	routes = append(
		routes,
		common.CreateRESTRoutes("item", adapters.MapToModelAdapter{
			func() persistence.IModel { return &models.Item{} },
			func() interface{} { return &[]models.Item{} },
		})...,
	)
	routes = append(
		routes,
		common.CreateRESTRoutes("review", adapters.MapToModelAdapter{
			func() persistence.IModel { return &models.Review{} },
			func() interface{} { return &[]models.Review{} },
		})...,
	)

	common.StartWebServer("6767", routes)
}
