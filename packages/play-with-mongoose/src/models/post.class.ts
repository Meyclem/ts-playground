import { Document, Schema, model } from "mongoose";
import { AuthorDocument } from "./author.class";

export type PostData = {
  title: string;
  content: string;
  author: AuthorDocument;
};

export class Post {
  title: string;
  content: string;
  author: AuthorDocument;

  constructor({ title, content, author }: PostData) {
    this.content = content;
    this.title = title;
    this.author = author;
  }

  toUpperCase(): string {
    return this.title.toUpperCase();
  }
}

const schema = new Schema({
  content: {
    type: String,
    minlength: [20, "Less than 20 characters"],
    maxlength: [200, "More than 20 characters"],
    required: [true, "Post without content not accepted"],
  },
  title: {
    type: String,
    minlength: 5,
    maxlength: 30,
    required: [true, "Please enter a title"],
  },
  author: { type: "ObjectId", ref: "AuthorDocument" },
});

// schema.method("toUpperCase", Post.prototype.toUpperCase);
schema.loadClass(Post);

interface PostDocument extends Post, Document {}

export const PostRepository = model<PostDocument>("Post", schema);
