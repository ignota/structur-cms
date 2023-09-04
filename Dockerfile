# ------------------------------ BUILD CONTAINER -------------------------------
FROM 474766710609.dkr.ecr.us-east-2.amazonaws.com/jutta:latest AS webpack

WORKDIR /usr/src/structur-cms

COPY package.json yarn.lock /usr/src/structur-cms/

RUN yarn

COPY . /usr/src/structur-cms

RUN . secrets/aws.sh && yarn build:production

# ----------------------------- RUNTIME CONTAINER ------------------------------
FROM 474766710609.dkr.ecr.us-east-2.amazonaws.com/jutta:latest AS runtime

ENV NODE_ENV=production

WORKDIR /usr/lib/structur-cms

COPY --from=webpack /usr/src/structur-cms/dist /usr/lib/structur-cms/

COPY package.json yarn.lock /usr/lib/structur-cms/

RUN yarn install --production --cache-folder=/tmp/yarn-cache \
  && rm -rf /tmp/yarn-cache

COPY config/nginx/nginx.production.conf /etc/nginx/sites-enabled/cms.conf

RUN chown -R www-data:www-data /usr/lib/structur-cms

EXPOSE 80

CMD ["/sbin/nginx", "-c", "/etc/nginx/nginx.conf"]
