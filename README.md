docker build -t 100111/webadmin:1.0.16 . && docker push 100111/webadmin:1.0.16
docker push 100111/webadmin:1.0.16
docker pull 100111/webadmin:1.0.16

docker run -d -p 3001:3001 --name webadmin-1.0.16 100111/webadmin:1.0.16 && docker run -d -p 3001:3001 --name webadmin-1.0.16 100111/webadmin:1.0.16
docker rm -f webadmin-1.0.16

prod: 
docker run -d -p 3001:3001 --name webadmin-1.0.16 100111/webadmin:1.0.16
