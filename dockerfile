FROM node:17.8.0


# install
WORKDIR /user/application/rtarf-user-service
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile
ADD . /user/application/rtarf-user-service

# build
RUN yarn build

EXPOSE 3000
CMD ["yarn", "start:prod"]