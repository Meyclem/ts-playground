db.createUser({
  user: "mongoose-app",
  pwd: "password",
  roles: [{ role: "readWrite", db: "mongoose-app-database" }],
});
