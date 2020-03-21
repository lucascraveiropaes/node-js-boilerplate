# NodeJS Boilerplate API

NodeJS Rest API developed with Express.

## Versions

Each branch has a different version of the API:

* **Master:** [A NodeAPI that uses Express + Sequelize + MySQL](https://github.com/lucascraveiropaes/node-js-boilerplate)
* **Mongo:** [A NodeAPI that uses Express + MongoDB](https://github.com/lucascraveiropaes/node-js-boilerplate/tree/mongo)

## Download and installation

Download the project:

```git
git clone https://github.com/lucascraveiropaes/node-js-boilerplate
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

* [Express](https://expressjs.com)
* [MongoDB](https://github.com/mongodb/node-mongodb-native)

## Routes User

|     Rota     | Método |     Descrição              |
|--------------|--------|----------------------------|
| /            | GET    | [Home da API](#home)       |
| /users/login | POST   | [Login](#login)            |
| /users       | GET    | [Listar Users](#listar-users)|
| /users       | POST   | [Adicionar User](#adicionar-users)|
| /users/:id   | DELETE | [Deletar User Pelo ID](#deletar-user-pelo-id)|
| /users/      | PUT    | [Atualizar Dados](#atualizar-dados)|

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

**Resposta**

```json
{
    "status": true,
    "user": {
        "_id": "5e5d70461c9d440000708b0b",
        "name": "Lucas Craveiro Paes",
        "login": "lucascraveiropaes"
    }
}
```
-----------------------------------------------------

### Listar Users

```
GET /users
```

**Resposta**

```json
{
    "status": true,
    "data": [{
        "_id": "5e5d70461c9d440000708b0b",
        "name": "Lucas Craveiro Paes",
        "login": "lucascraveiropaes"
    }, {
        "_id": "5e5e6ad41c9d44000017b791",
        "name": "Beatriz Rocha",
        "login": "bearocha"
    }, {
        "_id": "5e6925937da1ce18080b538b",
        "name": "Banana",
        "login": "loginbanana"
    }]
}
```

-----------------------------------------------------

### Adicionar Users

```
POST /users
```

**Body**

```json
{
	"name": "Banana",
	"login": "loginbanana"
}
```

**Resposta**

```json
{
    "status": true,
    "data": [{
        "name": "Banana",
        "login": "loginbanana",
        "password": "BA3253876AED6BC22D4A6FF53D8406C6AD864195ED144AB5C87621B6C233B548BAEAE6956DF346EC8C17F5EA10F35EE3CBC514797ED7DDD3145464E2A0BAB413",
        "token": null,
        "_id": "5e6925937da1ce18080b538b"
    }]
}
```

-----------------------------------------------------

### Deletar User Pelo ID

```
DELETE /users/:id
```

**Exemplo**
```
DELETE /users/5e6925937da1ce18080b538b
```

**Resposta**

```json
{
    "status": true,
    "message": "Usuário deletado com sucesso!"
}
```


-----------------------------------------------------

### Atualizar Dados

```
PUT /users/
```

**Body**
```json
{
    "name": "New name for user"
}
```

**Resposta**

```json
{
    "status": true,
    "message": "Dados atualizados com sucesso!"
}
```
