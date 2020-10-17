docker build -t 100111/webadmin:1.0.18 . && docker push 100111/webadmin:1.0.18
docker push 100111/webadmin:1.0.18
docker pull 100111/webadmin:1.0.18

docker run -d -p 3001:3001 --name webadmin-1.0.18 100111/webadmin:1.0.18 && docker run -d -p 3001:3001 --name webadmin-1.0.18 100111/webadmin:1.0.18
docker rm -f webadmin-1.0.18

prod: 
docker run -d -p 3001:3001 --name webadmin-1.0.18 100111/webadmin:1.0.18
