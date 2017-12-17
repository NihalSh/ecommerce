package service

import (
	"encoding/json"
	"fmt"
	"net/http/httptest"
	"testing"

	"github.com/NihalSh/ecommerce/item/dbclient"
	"github.com/NihalSh/ecommerce/item/model"
	. "github.com/smartystreets/goconvey/convey"
)

func TestGetAccount(t *testing.T) {
	mockRepo := &dbclient.MockDbClient{}

	mockRepo.On("QueryItem", "123").Return(model.Item{Id: "123", Name: "shampoo"}, nil)
	mockRepo.On("QueryItem", "456").Return(model.Item{}, fmt.Errorf("Some error"))
	DbClient = mockRepo

	Convey("Given a HTTP request for /items/123", t, func() {
		req := httptest.NewRequest("GET", "/items/123", nil)
		resp := httptest.NewRecorder()

		Convey("When the request is handled by the Router", func() {
			NewRouter().ServeHTTP(resp, req)

			Convey("Then the response should be a 200", func() {
				So(resp.Code, ShouldEqual, 200)

				account := model.Item{}
				json.Unmarshal(resp.Body.Bytes(), &account)
				So(account.Id, ShouldEqual, "123")
				So(account.Name, ShouldEqual, "shampoo")
			})
		})
	})

	Convey("Given a HTTP request for /accounts/456", t, func() {
		req := httptest.NewRequest("GET", "/accounts/456", nil)
		resp := httptest.NewRecorder()

		Convey("When the request is handled by the Router", func() {
			NewRouter().ServeHTTP(resp, req)

			Convey("Then the response should be a 404", func() {
				So(resp.Code, ShouldEqual, 404)
			})
		})
	})
}

func TestGetAccountWrongPath(t *testing.T) {

	Convey("Given a HTTP request for /invalid/123", t, func() {
		req := httptest.NewRequest("GET", "/invalid/123", nil)
		resp := httptest.NewRecorder()

		Convey("When the request is handled by the Router", func() {
			NewRouter().ServeHTTP(resp, req)

			Convey("Then the response should be a 404", func() {
				So(resp.Code, ShouldEqual, 404)
			})
		})
	})
}
