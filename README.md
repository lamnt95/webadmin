docker build -t 100111/webadmin:1.0.14 . && docker push 100111/webadmin:1.0.14
docker push 100111/webadmin:1.0.14
docker pull 100111/webadmin:1.0.14

docker run -d -p 3001:3001 --name webadmin-1.0.14 100111/webadmin:1.0.14 && docker run -d -p 3001:3001 --name webadmin-1.0.14 100111/webadmin:1.0.14
docker rm -f webadmin-1.0.14

prod: 
docker run -d -p 3001:3001 --name webadmin-1.0.14 100111/webadmin:1.0.14
