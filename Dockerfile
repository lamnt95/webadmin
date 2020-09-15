FROM node:12.13-alpine

WORKDIR /webadmin

COPY ./package.json ./yarn.* ./
RUN npm i
COPY . .
RUN npm run build && ls -a

EXPOSE 3001
CMD ["npm", "run", "start"]
