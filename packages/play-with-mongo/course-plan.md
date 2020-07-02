# Mongo DB Basics

## The need of a database

We should explain students why applications often need a database. This is a pretty obvious statement but it doesn't prevent us from telling them the reasons anyway.

In most of the case an application should store data about:
- customers (personal informations, preferences, billing)
- Business (products, sales)
- Internal subjects (accountacy, employees)
- etc...

## Databases solutions

Talk about some of the database types and related solutions:
- Relational (MySQL / Postgres)
- Graph (Neo4J, GunDB)
- NoSql / documents (MongoDB, RethinkDB)

Explain that each solution has advantages in some cases and why we choosed Mongo over the other.

## What is Mongo DB

- Mongo server hold several databases
- Each db contains multiple collections

> e.g. shop (database) -> users / orders (collections)

- Each collection has multiple documents (e.g. each `user` is a **document**) pretty much like POJO.
- Documents flexibily with ⚠️. (but we want some kind of structure anyway). JSON format.


## Installation

Make a point about why it is a good thing to have all the config in the app itself:
- It's cool for anybody who have to work on the project to not depend on software versions

- install Docker (and explain a bit)
- create a simple project with a `docker-compose.yml`
- explain why we need a root user and a per-db user

## MongoDB documentation

Teach students to use the MongoDB documentation. Short part here but imo mandatory.

## Shell

Show and explain [mongoDB Shell tool](https://docs.mongodb.com/manual/mongo/#local-mongodb-instance-on-default-port).
It's the first part when we interact with mongoDB.

### CRUD with Shell

In this part we should have a look at the availabe basic CRUD operations:
- on collections
  - createCollection
  - getCollection
  - collection.drop
- on documents
  - insertOne / insertMany
  - findOne / find
  - updateOne / updateMany
  - deleteOne / deleteMany

## Drivers & DB Client

Show student the basic blocks of code needed to run any TS app with mongo:
- mongo package
- db init
- db connection

### CRUD with code

Same as before but with TS code

### Schema validation

Despite that Documents database accept differently formated documents in one collection, we need to explain why the business and the code need us to respect some kind of schema to have data consistency.

Show them the needed code and the [base requirements](https://docs.mongodb.com/manual/core/schema-validation/) to do so.

## Queries

[Documentation](https://docs.mongodb.com/manual/reference/operator/query/)
- Simple queries: get a document in a collection
- Advanced queries. In this part we'll need to talk about relations
