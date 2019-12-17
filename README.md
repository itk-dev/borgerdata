# borgerdata

Proxy service for looking up citizen data stored in a SQL server.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installing

```bash
# Make a .env file based on .env.dist
cp .env.dist .env

docker-compose pull
docker-compose up --detach

docker-compose exec node yarn install

# Make sure there is a database created on the server before running the following commands
# Migrations and seeds are only needed in a test/development context so don't run them in production.
docker-compose exec node yarn knex migrate:latest
docker-compose exec node yarn knex seed:run
```

You should now be able to send a request and get some data back:
```bash
curl http://$(docker-compose port node 8081)/citizen/1234567891
```

Expected result:
```json
{
  "CPR": "1234567891",
  "Fornavn": "Hans",
  "Mellemnavn": null,
  "Efternavn": "Hansen",
  "Adresseringsnavn": null,
  "Vejnavn": "Testvej",
  "HusNr": "11",
  "Etage": null,
  "Side": null,
  "Adresseringsadresse": null,
  "Bynavn": "Roskilde",
  "Postnummer": "4000",
  "Postdistrikt": null,
  "PostnummerOgBy": null
}
```

## Release

This software does not follow a versioning scheme, instead the latest production ready version is the one in the master branch.

Whenever changes is merged in to the master branch, a docker image should be build and pushed to the package repository:
```bash
docker build -t itkdev/borgerdata .
docker tag <DOCKER_IMAGE> docker.pkg.github.com/itk-dev/borgerdata/app:latest
docker push docker.pkg.github.com/itk-dev/borgerdata/app:latest
```

## Deployment
 
 You will need an environment where the following is present:

- [Node js](https://nodejs.org) v10.17.0.
- [Yarn](https://yarnpkg.com/) v1.19.1.

Place the code in the environment and create a .env file with the following contents:

```ini
###> node ###
NODE_ENV=production
###< node ###

###> APP ###
APP_PORT=8081
###< APP ###

SQL_SERVER=<URL-TO-SQL-SERVER>
SQL_PORT=<PORT>
SQL_USER=<USER>
SQL_PASSWORD=<PASSWORD>
SQL_DATABASE=<DATABASE>
SQL_SCHEMA=<SCHEMA>
SQL_TABLE=<TABLE>
#SQL_DOMAIN=<DOMAIN>
```

Install the dependencies:
```bash
yarn install --production
```

Run the app:
```bash
yarn serve
```