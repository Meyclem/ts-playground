import * as mongoose from "mongoose";
import { PostData, Post } from "./src/models/post";

const databaseUrl = `mongodb://mongoose-app:password@localhost:27017/mongoose-app-database`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(databaseUrl, options);

const db = mongoose.connection;

db.once("open", function () {
  return Post.deleteMany({}, () => {
    const postData: PostData = {
      title: "Hello world",
      content: `azeazeazeazeazeazeazeaze
        azeazeazeazeazeazeazeazeazeazeaze
        azeazeazeazeazeazeaze`,
    };

    const aPost = new Post(postData);

    return aPost
      .save()
      .then((post) => console.log(post.))
      .catch((error) => console.warn("⚠️ ⚠️ ⚠️ Erorr : ", error.errors))
      .finally(() => mongoose.connection.close());

    // Post.create(postData).then((r) => console.log(r.title));
  });
});
