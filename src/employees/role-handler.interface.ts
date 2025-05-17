import { Employee } from './employee.interface';

export interface RoleHandler {
  getRoleInfo(employee: Employee): string;
}