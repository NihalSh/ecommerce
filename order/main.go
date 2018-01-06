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
	activeOrdersManager := &models.ActiveOrdersManager{
		&persistence.MongoDbClient{
			DbUrl:      "127.0.0.1",
			Db:         "orders",
			Collection: "activeorders",
		},
	}

	OpenAndSeed(buyingOptionsManager)
	OpenAndSeed(pendingOrdersManager)
	OpenAndSeed(activeOrdersManager)

	defer buyingOptionsManager.Close()
	defer pendingOrdersManager.Close()
	defer activeOrdersManager.Close()

	persistence.Global.AddModel(&models.BuyingOption{}, buyingOptionsManager)
	persistence.Global.AddModel(&models.PendingOrder{}, pendingOrdersManager)
	persistence.Global.AddModel(&models.ActiveOrder{}, activeOrdersManager)

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
	routes = append(
		routes,
		common.CreateRESTRoutes("activeorder", adapters.MapToModelAdapter{
			func() persistence.IModel { return &models.ActiveOrder{} },
			func() interface{} { return &[]models.ActiveOrder{} },
		})...,
	)

	common.StartWebServer("4242", routes)
}

func OpenAndSeed(ipm persistence.IPersistenceManager) {
	if err := ipm.Open(); err != nil {
		log.Fatalf("main: %v", err)
	}
	if err := ipm.Seed(); err != nil {
		log.Fatalf("main: %v", err)
	}
}
