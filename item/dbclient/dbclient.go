package dbclient

import (
	"github.com/NihalSh/ecommerce/item/model"
)

type IDbClient interface {
	OpenDb()
	QueryItem(itemId string) (model.Item, error)
	FetchAllItems() ([]model.Item, error)
	Seed()
}
