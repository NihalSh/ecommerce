package models

import (
	"context"
	"errors"
	"fmt"

	"github.com/NihalSh/ecommerce/api"
	"github.com/NihalSh/ecommerce/common/persistence"
	"gopkg.in/mgo.v2/bson"
)

type Order struct {
	Id             bson.ObjectId `json:"id" bson:"_id,omitempty"`
	ItemId         string        `json:"item_id" bson:"item_id"`
	BuyingOptionId string        `json:"buying_option_id" bson:"buying_option_id"`
	Qty            int           `json:"qty" bson:"qty,omitempty"`
	BuyerId        string        `json:"buyer_id" bson:"buyer_id"`
}

func (o *Order) ToString() string {
	return fmt.Sprintf("Order:%v - item %v qty %v buyer %v", o.GetId(), o.Qty, o.BuyerId)
}

func (o *Order) GetId() interface{} {
	return o.Id
}

func (o *Order) SetId(id interface{}) error {
	switch id.(type) {
	case bson.ObjectId:
		o.Id = id.(bson.ObjectId)
	case string:
		if !bson.IsObjectIdHex(id.(string)) {
			return fmt.Errorf("%v is not an ObjectIdHex", id)
		}
		o.Id = bson.ObjectIdHex(id.(string))
	default:
		return fmt.Errorf("%T is an invalid type for item id", id)
	}
	return nil
}

type PendingOrder struct {
	Order `json:",squash" bson:",inline"` // tag needed for mapstructure and bson to work with embedded structs
}

type CancelledOrder struct {
	Order
}

type ActiveOrder struct {
	Order
}

type CompletedOrder struct {
	Order
}

type PendingOrdersManager struct {
	persistence.IPersistenceManager
}

type CancelledOrdersManager struct {
	persistence.IPersistenceManager
}

type ActiveOrdersManager struct {
	persistence.IPersistenceManager
}

type CompletedOrdersManager struct {
	persistence.IPersistenceManager
}

func (pom *PendingOrdersManager) Create(ctx context.Context, po persistence.IModel) error {
	pendingOrder := po.(*PendingOrder)
	uid := ctx.Value("userId")
	if uid == nil {
		return errors.New("Unauthenticated")
	}
	pendingOrder.BuyerId = uid.(string)

	id := bson.NewObjectId()
	pendingOrder.SetId(id)

	var buyingOption BuyingOption
	if err := persistence.Global.FindId(ctx, pendingOrder.BuyingOptionId, &buyingOption); err != nil {
		return fmt.Errorf("Create PendingOrder: Unable to get BuyingOption %v: %v", pendingOrder.BuyingOptionId, err)
	}
	if buyingOption.Qty < pendingOrder.Qty {
		return errors.New("Insufficient Stock")
	}

	if err := pom.IPersistenceManager.Create(ctx, pendingOrder); err != nil {
		return fmt.Errorf("Create PendingOrder: %v", err)
	}

	var potemp PendingOrder
	persistence.Global.FindId(ctx, id, &potemp)

	if err := api.ApproveOrder(pendingOrder.BuyerId, id.Hex(), buyingOption.Price*pendingOrder.Qty); err != nil {
		return fmt.Errorf("Create PendingOrder: ApproveOrder uid %v, amount %v : %v", id, buyingOption.Price*pendingOrder.Qty, err)
	}

	buyingOption.Qty -= pendingOrder.Qty

	if err := persistence.Global.Save(ctx, &buyingOption); err != nil {
		return fmt.Errorf("Create PendingOrder: Save BuyingOption %v: %v", pendingOrder, err)
	}

	if err := persistence.Global.Delete(ctx, pendingOrder); err != nil {
		return fmt.Errorf("Create PendingOrder: Delete PendingOrder %v: %v", pendingOrder, err)
	}

	ao := ActiveOrder{pendingOrder.Order}
	if err := persistence.Global.Create(ctx, &ao); err != nil && err != persistence.ErrNoSuchElement {
		return fmt.Errorf("Create PendingOrder: Create ActiveOrder %+v: %v", ao, err)
	}

	return nil
}
