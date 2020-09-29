db.createUser({
  user: "mongo-app",
  pwd: "password",
  roles: [{ role: "readWrite", db: "play-with-mongo" }],
});
