import { UserRole } from './user-role.enum';

export interface User {
  id: string;
  email: string;
  lastname: string;
  firstname: string;
  dateOfBirth: Date;
  role: UserRole;
}
