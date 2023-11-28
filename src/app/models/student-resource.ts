import { Discipline } from "./discipline-resource";

export class Student {
    id?: number;
    name?: string;
    age?: number;
    email?: string;
    discipline?: Discipline[];
  
    constructor(init?: Partial<Student>) {
      Object.assign(this, init);
    }
  }