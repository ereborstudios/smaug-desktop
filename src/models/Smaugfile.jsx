import { ObjectModel, ArrayModel, FunctionModel } from 'objectmodel'
import { sep } from '@tauri-apps/api/path'

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
