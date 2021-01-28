FROM nginx:1.19
EXPOSE 80
# Delete the default welcome to nginx page.
RUN rm /usr/share/nginx/html/*
COPY /default.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]