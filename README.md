## Running the app  
In container
-----

```bash
Simply run the following command

$ docker-compose up --build 

```
Locally 
-----
- Configure database locally :
```bash
$ brew services start postgresql 
$ psql postgres 
$ CREATE DATABASE ${database_name};
```
- Set DATABASE_URL value in .env file
```javascript
DATABASE_URL = postgresql://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${DATABASE_NAME}?schema=public
```
- Install deps and run application
```bash
# install all the dependencies listed in the package.json 
$ yarn install 

# run app in development mode
$ yarn run start:dev
```

##### Note: .env file already exists.

## API Endpoints

###### POST /auth/me

This is a test authenticated endpoint for obtaining user profile data

###### GET /api-docs

This endpoint for opening swagger documentation

## Links
Github repository: [REPO](https://github.com/antonenkodv/authorization-and-authentication).

## Commands:
1. `brew services start postgresql`  Starts the PostgreSQL service on your local machine using Homebrew
2. `psql postgres`  Opens the PostgreSQL command-line interface (psql) and connects to the default postgres database
3. `CREATE DATABASE ${database_name};` Create a new database within a PostgreSQL server