- `bash copy_env.sh` or copy `.env` file to `docker/.env`
- docker-compose -f docker/docker-compose-dev.yml up -d
- yarn
- yarn start:dev


# - ./db/init-user.sh:/docker-entrypoint-initdb.d/init-user.sh
CREATE USER $POSTGRES_SERVICE_USER WITH ENCRYPTED PASSWORD '$POSTGRES_SERVICE_PASSWORD';
CREATE DATABASE $POSTGRES_SERVICE_DB;
GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_SERVICE_DB TO $POSTGRES_SERVICE_USER;