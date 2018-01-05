package adapters

import (
	"context"
	"fmt"
	"reflect"

	"github.com/NihalSh/ecommerce/common/persistence"
	"github.com/mitchellh/mapstructure"
	"gopkg.in/mgo.v2/bson"
)

type MapToModelAdapter struct {
	NewModelInstance func() persistence.IModel
	NewModelSlice    func() interface{}
}

func (mma MapToModelAdapter) mapToModelInstance(m map[string]interface{}) (persistence.IModel, error) {
	obj := mma.NewModelInstance()
	decoder, _ := mapstructure.NewDecoder(&mapstructure.DecoderConfig{
		DecodeHook: func(from reflect.Type, to reflect.Type, data interface{}) (interface{}, error) {
			if from == reflect.TypeOf("") && to == reflect.TypeOf(bson.ObjectId("")) {
				if !bson.IsObjectIdHex(data.(string)) {
					return data, fmt.Errorf("Invalid ObjectIdHex %v ", data)
				}
				return bson.ObjectIdHex(data.(string)), nil
			}
			return data, nil
		},
		WeaklyTypedInput: true,
		Metadata:         nil,
		Result:           obj,
		TagName:          "json",
	})
	if err := decoder.Decode(m); err != nil {
		return obj, fmt.Errorf("mapstructure.decode %v into type %T: %v", m, obj, err)
	}

	return obj, nil
}

func (mma MapToModelAdapter) FindId(ctx context.Context, id string) (persistence.IModel, error) {
	obj := mma.NewModelInstance()
	if err := persistence.Global.FindId(ctx, id, obj); err != nil {
		return obj, err
	}
	return obj, nil
}

func (mma MapToModelAdapter) FindAll(ctx context.Context, selector map[string]string) (interface{}, error) {
	objslice := mma.NewModelSlice()
	m := make(map[string]interface{})
	for k, v := range selector {
		m[k] = v
	}
	selectorobj, err := mma.mapToModelInstance(m)
	if err != nil {
		return objslice, err
	}

	if err := persistence.Global.FindAll(ctx, selectorobj, objslice); err != nil {
		return objslice, fmt.Errorf("findAll with selector %v : %v", selectorobj, err)
	}
	return objslice, nil
}

func (mma MapToModelAdapter) Create(ctx context.Context, m map[string]interface{}) error {
	obj, err := mma.mapToModelInstance(m)

	if err != nil {
		return err
	}

	return persistence.Global.Create(ctx, obj)
}

func (mma MapToModelAdapter) Save(ctx context.Context, m map[string]interface{}) error {
	obj, err := mma.mapToModelInstance(m)

	if err != nil {
		return err
	}

	return persistence.Global.Save(ctx, obj)
}

func (mma MapToModelAdapter) DeleteId(ctx context.Context, id string) error {
	obj, err := mma.FindId(ctx, id)
	if err != nil {
		return fmt.Errorf("FindId %v, object %v : %v", id, obj, err)
	}
	return persistence.Global.Delete(ctx, obj)
}
