package api

import (
	"errors"
	"fmt"
	"net/http"
	"net/url"
)

func ApproveOrder(userId string, orderId string, amount int) error {
	params := url.Values{"order_id": {orderId}, "amount": {fmt.Sprintf("%v", amount)}, "userid": {userId}}
	resp, err := http.PostForm("http://account-service:60001/approveorder", params)
	if err != nil {
		return fmt.Errorf("POST http://account-service:60001/ params = %v: %v", params, err)
	}
	if resp.StatusCode != 200 && resp.StatusCode != 201 {
		return errors.New(resp.Status)
	}
	return nil
}
