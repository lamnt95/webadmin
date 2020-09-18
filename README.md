docker build -t 100111/webadmin:1.0.7 .
docker push 100111/webadmin:1.0.7
docker pull 100111/webadmin:1.0.7
docker run -d -p 3001:3001 --name webadmin-1.0.7 100111/webadmin:1.0.7
docker rm -f webadmin-1.0.7

prod: 
docker run -d -p 3001:3001 --name webadmin-1.0.7 100111/webadmin:1.0.7
