import { UserRole } from './user-role.enum';

export interface User {
  id: number;
  email: string;
  lastname: string;
  firstname: string;
  dateOfBirth: Date;
  role: UserRole;
}
