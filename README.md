# NodeJS Boilerplate API

NodeJS Rest API developed with Express.

## Download and installation

Download the project:

```git
git clone https://github.com/maksen-git/TOTAL-GESTAO_DE_FROTA-API.git
```

Install all dependencies:

```bash
npm install
```

Run the most recent migration to create and update the database (explanation below).  
**Note:** The database must be created before performing the migration, and the name must be **app**.

Finally, start the server:

```bash
npm run start
```

## Principais Dependências

* [Sequelize](https://sequelize.org)
* [Express](https://expressjs.com)
* [Nodemailer](https://nodemailer.com/about)
* [Mysql2](https://github.com/sidorares/node-mysql2)

## Migrations

Migrations are used to create database changes through scripts, not manual changes. The library used is the own [sequelize migration](https://sequelize.org/master/manual/migrations.html).

**Create a migration**

```bash
npx sequelize migration:create --name=<nome-do-script>
```

Within the file created in the ```src/migrations``` folder, add the code for the required changes:

```js
'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("Users");
    }
};

```

**Execute migration**

```bash
npx sequelize db:migrate
```

**Undo the last migration**
```
npx sequelize-cli db:migrate:undo
```

## Routes User

|       Rota      | Método |     Descrição              |
|-----------------|--------|----------------------------|
| /               | GET    | [Home da API](#home)       |
| /users/login    | POST   | [Login](#login)            |

-----------------------------------------------------

### Home

```
GET /
```

**Resposta**

```
NodeJS Boilerplate API - v0.1
```

-----------------------------------------------------

### Login

```
POST /users/login
```

**Body**

```js
{
	"login": "user_email@gmail.com",
	"password": "somepassword"
}
```

**Header Example**

```json
client-key: ++6sdfs21cs65dc4s2df12
```

**Resposta**

```json
{
    "status": true,
    "user": {
        "id": 1,
        "name": "User Full Name",
        "email": "user_email@gmail.com",
        "token": "b1O3KBTGPg(...@FgWw0w3l9",
        "clientKey": "++6sdfs21cs65dc4s2df12",
        "createdAt": "2019-09-07T03:27:25.000Z",
        "updatedAt": "2019-09-07T06:28:49.000Z"
    }
}
```
