docker build -t 100111/webadmin:1.0.13 . && docker push 100111/webadmin:1.0.13
docker push 100111/webadmin:1.0.13
docker pull 100111/webadmin:1.0.13

docker run -d -p 3001:3001 --name webadmin-1.0.13 100111/webadmin:1.0.13 && docker run -d -p 3001:3001 --name webadmin-1.0.13 100111/webadmin:1.0.13
docker rm -f webadmin-1.0.13

prod: 
docker run -d -p 3001:3001 --name webadmin-1.0.13 100111/webadmin:1.0.13
