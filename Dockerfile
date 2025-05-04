# Dockerfile for App2 (Employee Details Viewer)
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# In App2 directory
# docker build -t app2-react .
# docker run -d -p 3001:80 app2-react
