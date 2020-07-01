# Mongo DB Basics

### What is Mongo DB
- Database solution (others solution: MySql, Postgres, etc... **Do we have to talk about this?**)
- Talk about collection with examples
  - e.g. shop (database) -> users / orders (collections)
- Each collection has multiple documents (each user is a document) pretty much Js Objects.
- Documents flexibily with ⚠️. (but we want some kind of structure anyway). JSON format.


### Installation

I'd like to use [this](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
> It's also the right moment to talk about `brew services list/start/stop`.

### MongoDB documentation

Teach students to use the MongoDB documentation. Short part here but imo mandatory.

### Shell

Show and explain [mongoDB Shell tool](https://docs.mongodb.com/manual/mongo/#local-mongodb-instance-on-default-port).
It's the first part when we interact with mongoDB.

### CRUD with Shell

In this part we should have a look at the availabe basic CRUD operations (In the shell rather than with Compass)

### Drivers

- This is the code integration part.
- Explain how we can combine Apps (front / backend) & Data with MongoDB server

### CRUD with code

Same as before but with code

### Queries

- Simple queries: get a document in a collection
- Advanced queries: with filters. Do we need to see relations here? If yes, it allows to talk about query a collection to get some info and with that, query related documents in another one (e.g.: get ID of one Brand and related products).

### Exercises

- Integrate Mongodb in TS code with the client.
- create db, & collections.
- CRUD operations
- Queries (with various difficulties)
