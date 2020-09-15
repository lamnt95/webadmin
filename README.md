docker build -t 100111/webadmin:1.0.2 .
docker push 100111/webadmin:1.0.2
docker run -d -p 3001:3001 --name webadmin 100111/webadmin:1.0.2