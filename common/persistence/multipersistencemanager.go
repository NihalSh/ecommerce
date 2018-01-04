package persistence

import (
	"context"
	"errors"
	"reflect"
)

var Global multiPersistenceManager

func init() {
	Global.persistenceManager = make(map[reflect.Type]IPersistenceManager)
}

type multiPersistenceManager struct {
	persistenceManager map[reflect.Type]IPersistenceManager
}

func (mpm *multiPersistenceManager) AddModel(modelInstance IModel, pm IPersistenceManager) error {
	modelType := reflect.TypeOf(modelInstance)
	if modelType == nil {
		return errors.New("modelInstance is a nil interface")
	}
	mpm.persistenceManager[modelType] = pm
	return nil
}

func (mpm multiPersistenceManager) Create(ctx context.Context, obj IModel) error {
	pm := mpm.persistenceManager[reflect.TypeOf(obj)]
	return pm.Create(ctx, obj)
}

func (mpm multiPersistenceManager) Save(ctx context.Context, obj IModel) error {
	pm := mpm.persistenceManager[reflect.TypeOf(obj)]
	return pm.Save(ctx, obj)
}

func (mpm multiPersistenceManager) FindId(ctx context.Context, id interface{}, obj IModel) error {
	pm := mpm.persistenceManager[reflect.TypeOf(obj)]
	return pm.FindId(ctx, id, obj)
}

func (mpm multiPersistenceManager) FindAll(ctx context.Context, selector IModel, obj interface{}) error {
	pm := mpm.persistenceManager[reflect.TypeOf(selector)]
	return pm.FindAll(ctx, selector, obj)
}

func (mpm multiPersistenceManager) Delete(ctx context.Context, obj IModel) error {
	pm := mpm.persistenceManager[reflect.TypeOf(obj)]
	return pm.Delete(ctx, obj)
}
