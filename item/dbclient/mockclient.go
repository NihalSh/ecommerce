package dbclient

import (
	"github.com/NihalSh/ecommerce/item/model"
	"github.com/stretchr/testify/mock"
)

// MockBoltClient is a mock implementation of a datastore client for testing purposes
type MockDbClient struct {
	mock.Mock
}

func (m *MockDbClient) QueryItem(itemId string) (model.Item, error) {
	args := m.Mock.Called(itemId)
	return args.Get(0).(model.Item), args.Error(1)
}

func (m *MockDbClient) FetchAllItems() ([]model.Item, error) {
	args := m.Mock.Called()
	return args.Get(0).([]model.Item), args.Error(1)
}

func (m *MockDbClient) OpenDb() {
	// Does nothing
}

func (m *MockDbClient) Seed() {
	// Does nothing
}
