package persistence

import (
	"context"
	"errors"
)

type IModel interface {
	GetId() interface{}
	SetId(interface{}) error
}

type IPersistenceManager interface {
	Open() error
	Seed() error
	Create(context.Context, IModel) error
	Save(context.Context, IModel) error
	FindId(context.Context, interface{}, IModel) error
	FindAll(context.Context, IModel, interface{}) error
	Delete(context.Context, IModel) error
	Close() error
}

var (
	ErrNoSuchElement = errors.New("NoSuchElement")
)
