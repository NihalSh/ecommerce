package main

import (
	"fmt"
	"log"

	"github.com/NihalSh/ecommerce/common"
	"github.com/NihalSh/ecommerce/common/adapters"
	"github.com/NihalSh/ecommerce/common/persistence"
	"github.com/NihalSh/ecommerce/order/models"
)

var appName = "ordersservice"

func main() {
	fmt.Printf("Starting %v\n", appName)

	/*buyingOptionsManager := &models.BuyingOptionsManager{
		&persistence.MySqlDbClient{
			DbUrl: "localhost",
			Db:    "orders",
			Table: "buyingoptions",
		},
	}*/
	buyingOptionsManager := &models.BuyingOptionsManager{
		&persistence.MongoDbClient{
			DbUrl:      "127.0.0.1",
			Db:         "orders",
			Collection: "buyingoptions",
		},
	}
	pendingOrdersManager := &models.PendingOrdersManager{
		&persistence.MongoDbClient{
			DbUrl:      "127.0.0.1",
			Db:         "orders",
			Collection: "pendingorders",
		},
	}

	if err := buyingOptionsManager.Open(); err != nil {
		log.Fatalf("main: %v", err)
	}
	if err := pendingOrdersManager.Open(); err != nil {
		log.Fatalf("main: %v", err)
	}

	if err := buyingOptionsManager.Seed(); err != nil {
		log.Fatalf("main: %v", err)
	}
	if err := pendingOrdersManager.Seed(); err != nil {
		log.Fatalf("main: %v", err)
	}

	defer buyingOptionsManager.Close()
	defer pendingOrdersManager.Close()

	persistence.Global.AddModel(&models.BuyingOption{}, buyingOptionsManager)
	persistence.Global.AddModel(&models.PendingOrder{}, pendingOrdersManager)

	var routes []common.Route

	routes = append(
		routes,
		common.CreateRESTRoutes("buyingoption", adapters.MapToModelAdapter{
			func() persistence.IModel { return &models.BuyingOption{} },
			func() interface{} { return &[]models.BuyingOption{} },
		})...,
	)
	routes = append(
		routes,
		common.CreateRESTRoutes("pendingorder", adapters.MapToModelAdapter{
			func() persistence.IModel { return &models.PendingOrder{} },
			func() interface{} { return &[]models.PendingOrder{} },
		})...,
	)

	common.StartWebServer("4242", routes)
}
