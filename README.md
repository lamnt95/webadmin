docker build -t 100111/webadmin:1.0.5 .
docker push 100111/webadmin:1.0.5
docker pull 100111/webadmin:1.0.5
docker run -d -p 3001:3001 --name webadmin-1.0.5 100111/webadmin:1.0.5
docker rm -f webadmin-1.0.5

prod: 
docker run -d -p 3001:3001 --name webadmin-1.0.5 100111/webadmin:1.0.5
