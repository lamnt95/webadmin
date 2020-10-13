docker build -t 100111/webadmin:1.0.15 . && docker push 100111/webadmin:1.0.15
docker push 100111/webadmin:1.0.15
docker pull 100111/webadmin:1.0.15

docker run -d -p 3001:3001 --name webadmin-1.0.15 100111/webadmin:1.0.15 && docker run -d -p 3001:3001 --name webadmin-1.0.15 100111/webadmin:1.0.15
docker rm -f webadmin-1.0.15

prod: 
docker run -d -p 3001:3001 --name webadmin-1.0.15 100111/webadmin:1.0.15
