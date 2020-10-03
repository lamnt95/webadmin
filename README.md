docker build -t 100111/webadmin:1.0.11 . && docker push 100111/webadmin:1.0.11
docker push 100111/webadmin:1.0.11
docker pull 100111/webadmin:1.0.11
docker run -d -p 3001:3001 --name webadmin-1.0.11 100111/webadmin:1.0.11
docker rm -f webadmin-1.0.11

prod: 
docker run -d -p 3001:3001 --name webadmin-1.0.11 100111/webadmin:1.0.11
