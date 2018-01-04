package models

import (
	"fmt"

	"github.com/NihalSh/ecommerce/common/persistence"
	"gopkg.in/mgo.v2/bson"
)

type Review struct {
	Id     bson.ObjectId `json:"id" bson:"_id,omitempty"`
	ItemId bson.ObjectId `json:"item_id" bson:"item_id,omitempty"`
	Author string        `json:"owner" bson:"owner,omitempty"`
	Title  string        `json:"title" bson:"title,omitempty"`
	Rating int           `json:"rating" bson:"rating,omitempty"`
	Text   string        `json:"text" bson:"text,omitempty"`
}

func (r *Review) ToString() string {
	return fmt.Sprintf("Review:%v - %v", r.Id, r.Title)
}

func (r *Review) GetId() interface{} {
	return r.Id
}

func (r *Review) SetId(id interface{}) error {
	switch id.(type) {
	case bson.ObjectId:
		r.Id = id.(bson.ObjectId)
	case string:
		if !bson.IsObjectIdHex(id.(string)) {
			return fmt.Errorf("%v is not an ObjectIdHex", id)
		}
		r.Id = bson.ObjectIdHex(id.(string))
	default:
		return fmt.Errorf("%T is an invalid type for review id", id)
	}
	return nil
}

type ReviewsManager struct {
	persistence.IPersistenceManager
}
