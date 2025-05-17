import { RoleHandler } from '../role-handler.interface';
import { Employee } from '../employee.interface';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';

export class EngineerHandler implements RoleHandler {
  constructor(
  @InjectPinoLogger(EngineerHandler.name)
  private readonly logger: PinoLogger
) {}

  getRoleInfo(employee: Employee): string {
    this.logger.debug(`Handling Engineer: ${employee.name}`);
    return `Engineer: ${employee.name}`;
  }
}
