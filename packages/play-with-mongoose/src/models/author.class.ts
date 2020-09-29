import { Document, Schema, model } from "mongoose";

export type AuthorData = {
  name: string;
};

export class Author {
  name: string;

  constructor({ name }: AuthorData) {
    this.name = name;
  }

  /* any method would be defined here*/
  toUpperCase(): string {
    return this.name.toUpperCase();
  }
}

const schema = new Schema({
  name: String,
});

schema.method("toUpperCase", Author.prototype.toUpperCase);
schema.method("save", Author.prototype.toUpperCase);

export interface AuthorDocument extends Author, Document {}

export const AuthorRepository = model<AuthorDocument>("Author", schema);
