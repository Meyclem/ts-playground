import { model, Schema, Document } from "mongoose";

export type PostData = {
  content: string;
  title: string;
};

export type IPost = Document & PostData;

export const postSchema = new Schema({
  content: {
    type: String,
    minlength: [20, "Less than 20 characters"],
    maxlength: [200, "More than 20 characters"],
    required: [true, "Post without content not accepted"],
  },
  title: {
    type: String,
    minlength: 1,
    maxlength: 30,
    required: [true, "Please enter a title"],
  },
});

export const Post = model<IPost>("Post", postSchema);
