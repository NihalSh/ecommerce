sudo docker service rm mongo
sudo docker service create --name=mongo --replicas=1 --network=my_network mongo 
sudo docker service rm itemservice
sudo docker service create --name=itemservice --replicas=1 --network=my_network -p=6767:6767 itemservice
sudo docker service rm orderservice
sudo docker service create --name=orderservice --replicas=1 --network=my_network -p=4242:4242 orderservice
