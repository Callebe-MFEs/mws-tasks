FROM nginx:1.23.3-alpine as build

LABEL name="mws-tasks" \
      description="Micro-Frontend application using lit, module federation and Single-SPA"

COPY nginx /etc/nginx

RUN touch ./off \
  && chmod o+rw ./off \
  && echo "mws-tasks: $COMMIT_SHA" >> /etc/nginx/commit.sha

WORKDIR /usr/static

COPY ./dist .

USER nginx
