docker build -t 100111/webadmin:1.0.17 . && docker push 100111/webadmin:1.0.17
docker push 100111/webadmin:1.0.17
docker pull 100111/webadmin:1.0.17

docker run -d -p 3001:3001 --name webadmin-1.0.17 100111/webadmin:1.0.17 && docker run -d -p 3001:3001 --name webadmin-1.0.17 100111/webadmin:1.0.17
docker rm -f webadmin-1.0.17

prod: 
docker run -d -p 3001:3001 --name webadmin-1.0.17 100111/webadmin:1.0.17
