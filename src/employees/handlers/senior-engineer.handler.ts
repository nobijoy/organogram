import { RoleHandler } from '../role-handler.interface';
import { Employee } from '../employee.interface';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';

export class SeniorEngineerHandler implements RoleHandler {
  constructor(
  @InjectPinoLogger(SeniorEngineerHandler.name)
  private readonly logger: PinoLogger
) {}

  getRoleInfo(employee: Employee): string {
    this.logger.debug(`Handling Senior Engineer: ${employee.name}`);
    return `Senior Engineer: ${employee.name}`;
  }
}
