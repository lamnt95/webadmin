docker build -t 100111/webadmin:1.0.9 .
docker push 100111/webadmin:1.0.9
docker pull 100111/webadmin:1.0.9
docker run -d -p 3001:3001 --name webadmin-1.0.9 100111/webadmin:1.0.9
docker rm -f webadmin-1.0.9

prod: 
docker run -d -p 3001:3001 --name webadmin-1.0.9 100111/webadmin:1.0.9
