docker build -t 100111/webadmin:1.0.8 .
docker push 100111/webadmin:1.0.8
docker pull 100111/webadmin:1.0.8
docker run -d -p 3001:3001 --name webadmin-1.0.8 100111/webadmin:1.0.8
docker rm -f webadmin-1.0.8

prod: 
docker run -d -p 3001:3001 --name webadmin-1.0.8 100111/webadmin:1.0.8
