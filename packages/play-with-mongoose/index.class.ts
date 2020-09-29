import * as mongoose from "mongoose";
import { PostData, Post, PostRepository } from "./src/models/post.class";
import { AuthorRepository, Author, AuthorData } from "./src/models/author.class";

const databaseUrl = `mongodb://mongoose-app:password@localhost:27017/mongoose-app-database`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(databaseUrl, options);

const db = mongoose.connection;

db.once("open", async function () {
  // await PostRepository.deleteMany({});
  // await AuthorRepository.deleteMany({});
  const post = await PostRepository.findOne({ title: "Hello world" }).populate("author", "name", Author);
  console.log(post?.toUpperCase());
  const { author } = post as Post;
  author.name = "Albert";
  await author.save();
  console.log(author.toUpperCase());
  // const authorData: AuthorData = { name: "Toto" };
  // const author = await AuthorRepository.create(new Author(authorData));
  // console.log(author);

  // const postData: PostData = {
  //   title: "Hello world",
  //   content: `azeazeazeazeazeazeazeaze
  //       azeazeazeazeazeazeazeazeazeazeaze
  //       azeazeazeazeazeazeaze`,
  //   author,
  // };

  // const post = new Post(postData);
  // console.log(post.toUpperCase());
  // return PostRepository.create(post)
  //   .then((postDoc) => {
  //     console.log(postDoc.author);
  //   })
  //   .catch((error) => console.warn("⚠️ ⚠️ ⚠️ Erorr : ", error))
  //   .finally(() => mongoose.connection.close());

  // PostRepository.create(post, (error: mongoose.Error.ValidationError, post: Partial<PostDocument>): void => {
  //   if (error) {
  //     error.errors && console.warn("⚠️ ⚠️ ⚠️ Erorr : ", error);
  //   }

  //   post && post.toUpperCase && console.log(post.title);
  mongoose.connection.close();
  // });
});
