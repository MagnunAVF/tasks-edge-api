# Tasks Edge API

API to save your tasks on the Edge. Edge API using Hono framework and PlanetScale database.

## Pre-requisites
### Cloudflare Workerd
Run in terminal:
```
sudo apt install clang libc++-dev libc++abi-dev lld python3 python3-distutils -y
```

## PlanetScale
You must have installed in your machine PlanetScale. Check the references below to install it.
* https://planetscale.com/docs/concepts/planetscale-environment-setup
* https://developers.cloudflare.com/workers/learning/integrations/databases/#planetscale

## Setup
Create the database in localhost:
```
pscale auth login
pscale db create tasks-database
```

Now create the table:
```
pscale shell tasks-database main
```

Then run in terminal:
```
npm install
```

## Running in localhost

```
npm run dev
```

## Format and lint

```
npm run format && npm run lint
```

## Deploy

```
npm run deploy
```
