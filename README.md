docker build -t 100111/webadmin:1.0.4 .
docker push 100111/webadmin:1.0.4
docker pull 100111/webadmin:1.0.4
docker run -d -p 3001:3001 --name webadmin-1.0.4 100111/webadmin:1.0.4