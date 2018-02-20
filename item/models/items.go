package models

import (
	"fmt"

	"github.com/NihalSh/ecommerce/common/persistence"
	"gopkg.in/mgo.v2/bson"
)

type Item struct {
	Id   bson.ObjectId `json:"id" bson:"_id,omitempty"`
	Name string        `json:"name" bson:"name,omitempty"`
        Description string        `json:"description" bson:"description,omitempty"`
        Image       string        `json:"image" bson:"image,omitempty"`
}

func (i *Item) ToString() string {
	return fmt.Sprintf("Item:%v - %v", i.GetId(), i.Name)
}

func (i *Item) GetId() interface{} {
	return i.Id
}

func (i *Item) SetId(id interface{}) error {
	switch id.(type) {
	case bson.ObjectId:
		i.Id = id.(bson.ObjectId)
	case string:
		if !bson.IsObjectIdHex(id.(string)) {
			return fmt.Errorf("%v is not an ObjectIdHex", id)
		}
		i.Id = bson.ObjectIdHex(id.(string))
	default:
		return fmt.Errorf("%T is an invalid type for item id", id)
	}
	return nil
}

type ItemsManager struct {
	persistence.IPersistenceManager
}
