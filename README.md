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

docker run -v ${PWD}:/app itkdev/yarn:latest install

docker-compose exec node node_modules/knex/bin/cli.js migrate:latest
docker-compose exec node node_modules/knex/bin/cli.js seed:run
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
  "Husnr": "11",
  "Etage": null,
  "Side": null,
  "Adresseringsadresse": null,
  "Bynavn": "Roskilde",
  "Postnummer": "4000",
  "Postdistrikt": null,
  "PostnummerOgBy": null
}
```

## Deployment
 Not implemented yet.