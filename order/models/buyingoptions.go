package models

import (
	"fmt"

	"github.com/NihalSh/ecommerce/common/persistence"
	"gopkg.in/mgo.v2/bson"
)

type BuyingOption struct {
	Id       bson.ObjectId `json:"id" bson:"_id,omitempty"`
	ItemId   string        `json:"item_id" bson:"item_id,omitempty"`
	SellerId string        `json:"seller_id" bson:"seller_id,omitempty"`
	Price    int           `json:"price" bson:"price,omitempty"`
	Qty      int           `json:"qty" bson:"qty,omitempty"`
}

func (bo *BuyingOption) ToString() string {
	return fmt.Sprintf("BuyingOption:%v - item %v seller %v", bo.GetId(), bo.ItemId, bo.SellerId)
}

func (bo *BuyingOption) GetId() interface{} {
	return bo.Id
}

func (bo *BuyingOption) SetId(id interface{}) error {
	switch id.(type) {
	case bson.ObjectId:
		bo.Id = id.(bson.ObjectId)
	case string:
		if !bson.IsObjectIdHex(id.(string)) {
			return fmt.Errorf("%v is not an ObjectIdHex", id)
		}
		bo.Id = bson.ObjectIdHex(id.(string))
	default:
		return fmt.Errorf("%T is an invalid type for item id", id)
	}
	return nil
}

/*func (bo *BuyingOption) SetId(id interface{}) error {
	var ok bool
	bo.Id, ok = id.(string)
	if !ok {
		return fmt.Errorf("Invalid BuyingOption.Id expected string, got %T", id)
	}
	return nil
}*/

type BuyingOptionsManager struct {
	persistence.IPersistenceManager
}
