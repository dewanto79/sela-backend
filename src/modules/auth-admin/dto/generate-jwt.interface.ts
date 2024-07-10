import { AdminRole } from 'src/modules/admin/enums/role.enum';

export interface GenerateJWT {
  email: string;
  roles: AdminRole[];
  id: string;
  name: string;
  status: string;
}
