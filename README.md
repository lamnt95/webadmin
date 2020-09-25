docker build -t 100111/webadmin:1.0.10 . && docker push 100111/webadmin:1.0.10
docker push 100111/webadmin:1.0.10
docker pull 100111/webadmin:1.0.10
docker run -d -p 3001:3001 --name webadmin-1.0.10 100111/webadmin:1.0.10
docker rm -f webadmin-1.0.10

prod: 
docker run -d -p 3001:3001 --name webadmin-1.0.10 100111/webadmin:1.0.10
