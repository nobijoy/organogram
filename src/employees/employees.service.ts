import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import employeesData from '../data/employees.json';
import { RoleHandlerFactory } from '../employees/handlers/role-handler.factory';
import { Employee } from './employee.interface';

@Injectable()
export class EmployeesService {
  private employees: Employee[] = employeesData;

  constructor(
    @InjectPinoLogger(EmployeesService.name)
    private readonly logger: PinoLogger,
  ) {}

  findSubordinates(managerId: number): string[] {
    this.logger.info(`Finding subordinates for manager ID: ${managerId}`);
    const result: string[] = [];

    for (const emp of this.employees) {
      if (emp.managerId === managerId) {
        const handler = RoleHandlerFactory.getHandler(emp.title, this.logger);
        const roleInfo = handler.getRoleInfo(emp);
        this.logger.debug({ emp }, 'Found subordinate');

        result.push(roleInfo);
        result.push(...this.findSubordinates(emp.id));
      }
    }

    this.logger.debug({ managerId, count: result.length }, 'Subordinate fetch complete');
    return result;
  }
}
