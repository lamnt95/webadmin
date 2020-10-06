docker build -t 100111/webadmin:1.0.12 . && docker push 100111/webadmin:1.0.12
docker push 100111/webadmin:1.0.12
docker pull 100111/webadmin:1.0.12

docker run -d -p 3001:3001 --name webadmin-1.0.12 100111/webadmin:1.0.12 && docker run -d -p 3001:3001 --name webadmin-1.0.12 100111/webadmin:1.0.12
docker rm -f webadmin-1.0.12

prod: 
docker run -d -p 3001:3001 --name webadmin-1.0.12 100111/webadmin:1.0.12
