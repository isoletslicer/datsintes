Datasintesa Backend Developer Test

Tech Stack : Nest.js (TypeScript), Mongoose, Passport, JWT, bcrypt.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Notes & Disclaimer :

I dont have any idea how to auto migrate mongodb (im using mongoose package for shorten time). I have seen TypeORM Migration that using mongodb package but still getting confused.
Therefore, I do manually insert user and product myself in local (files are products_datasintesa.json & users_datasintesa.json. they are in root folder here already.). Please insert it manually the json database into your database with database name `datasintesa_techtes` and the collections are `products` and `users`

Right now . as admin you can login 2 username (pessi, penaldo) with same password as username, as customer you can login 2 username (becca, ishowspeed) with same password as username.
By default, if you register a user, its role will be automatically as customer.

Because I have manually insert in my local, you can safely use the endpoints (with localhost:3000).
I am using Postman for making and testing req/res for REST API

Progress so far : crud user, crud product, authentification, authorization.
