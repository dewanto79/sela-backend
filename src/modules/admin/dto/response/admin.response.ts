import { AdminRole } from '../../enums/role.enum';

export interface AdminResponse {
  email: string;
  name: string;
  roles: string[];
  status: string;
  password: string;
}
