import { Teacher } from "./teacher-resource";
import { User } from "./user-resource";

export class Discipline {
  name?: string;
  id?: number;
  startDateTime?: Date;
  finalDateTime?: Date;
  dayOfWeek?: string;
  classroom?: string;
  image?: string;
  teacher?: Teacher;
  users?: User;

  constructor(init?: Partial<Discipline>) {
    Object.assign(this, init);
  }
}
