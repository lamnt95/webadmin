docker build -t 100111/webadmin:1.0.6 .
docker push 100111/webadmin:1.0.6
docker pull 100111/webadmin:1.0.6
docker run -d -p 3001:3001 --name webadmin-1.0.6 100111/webadmin:1.0.6
docker rm -f webadmin-1.0.6

prod: 
docker run -d -p 3001:3001 --name webadmin-1.0.6 100111/webadmin:1.0.6
