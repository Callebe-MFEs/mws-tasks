FROM nginx:1.23.3-alpine as build

LABEL name="mfe-app-lit3.1" \
      description="Micro-Frontend application using react, module federation and Single-SPA" \
      eu.mia-platform.url="https://www.mia-platform.eu" \
      eu.mia-platform.version="0.1.0"

COPY nginx /etc/nginx

RUN touch ./off \
  && chmod o+rw ./off \
  && echo "mfe-app-lit3.1: $COMMIT_SHA" >> /etc/nginx/commit.sha

WORKDIR /usr/static

COPY ./dist .

USER nginx
