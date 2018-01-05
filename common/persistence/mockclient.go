package persistence

import (
	"context"

	"github.com/stretchr/testify/mock"
)

// MockBoltClient is a mock implementation of a datastore client for testing purposes
type MockDbClient struct {
	mock.Mock
}

func (m *MockDbClient) FindId(ctx context.Context, id string, im IModel) error {
	args := m.Mock.Called(ctx, id, im)
	return args.Error(2)
}

func (m *MockDbClient) FindAll(ctx context.Context, query IModel, ims interface{}) error {
	args := m.Mock.Called(ctx, query, ims)
	return args.Error(2)
}

func (m *MockDbClient) Create(ctx context.Context, query map[string]interface{}) error {
	args := m.Mock.Called(ctx, query)
	return args.Error(1)
}

func (m *MockDbClient) Save(ctx context.Context, query map[string]interface{}) error {
	args := m.Mock.Called(ctx, query)
	return args.Error(1)
}

func (m *MockDbClient) Delete(ctx context.Context, im IModel) error {
	args := m.Mock.Called(ctx, im)
	return args.Error(1)
}

func (m *MockDbClient) Open() error {
	return nil
	// Does nothing
}

func (m *MockDbClient) Close() error {
	return nil
	// Does nothing
}

func (m *MockDbClient) Seed() error {
	return nil
	// Does nothing
}
