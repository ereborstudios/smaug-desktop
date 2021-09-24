import { ObjectModel, ArrayModel } from 'objectmodel'

export const Smaugfile = ObjectModel({
  project: {
    name: String,
    title: String,
    version: String,
    authors: ArrayModel(String),
    icon: String,
    compile_ruby: Boolean,
  },
}).defaultTo({
  compile_ruby: false,
}).as('Smaugfile');
