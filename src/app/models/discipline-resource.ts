import { Teacher } from "./teacher-resource";

export class Discipline {
    id?: number;
    name?: string;
    startDateTime?: Date;
    finalDateTime?: Date;
    dayOfWeek?: string;
    classroom?: string;
    teacher?: Teacher;
  
    constructor(init?: Partial<Discipline>) {
      Object.assign(this, init);
    }
  }
  