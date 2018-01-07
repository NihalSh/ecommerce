sudo docker network create --driver overlay my_network
cd $(dirname $0)/item
sudo docker rmi itemservice
sudo docker build -t itemservice .
cd ../order
sudo docker rmi orderservice
sudo docker build -t orderservice .
cd ../account
sudo docker rmi account-service
sudo docker build -t account-service:latest .
cd ../auth
sudo docker rmi auth-service
sudo docker build -t auth-service:latest .
cd ..