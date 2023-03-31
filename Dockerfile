# build

# FROM node:lts as builder

# RUN echo "running react app in prod mode"

# RUN apt-get update
# # RUN apt-get install -y make
# # RUN apt-get install -y gyp
# # RUN apt-get install -y build-essential


# COPY ./client ./app
# WORKDIR /app

# RUN npm install -g npm
# RUN npm install -g react-app-rewired
# # RUN npm install -g sass node-sass
# # RUN npm install -g node-gyp
# # RUN npm rebuild node-sass
# RUN npm install --legacy-peer-deps

# RUN npm run build





#server
FROM node:lts as server

RUN echo "running prod mode"

RUN apt-get update
# RUN apt-get install -y nano

COPY ./server ./app
WORKDIR /app

COPY /client/build /app/build

RUN npm install -g npm
RUN npm install -g nodemon
# RUN npm install -g typescript
# RUN npm install -g ts-node

RUN npm install --legacy-peer-deps

ENTRYPOINT [ "nodemon" ] 


# # prod

# FROM nginx:latest

# COPY --from=builder /app/build /usr/share/nginx/html

# CMD ["nginx","-g","daemon off;"]
# # ENTRYPOINT [ "nodemon" ] 