import { Discipline } from "./discipline-resource";

export class Teacher {
    id?: number;
    name?: string;
    department?: string;
    email?: string;
    disciplines?: Discipline[];
  
    constructor(init?: Partial<Teacher>) {
      Object.assign(this, init);
    }
  }
  