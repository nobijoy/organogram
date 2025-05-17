import { RoleHandler } from '../role-handler.interface';
import { Employee } from '../employee.interface';
import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';

export class CTOHandler implements RoleHandler {
  constructor(
  @InjectPinoLogger(CTOHandler.name)
  private readonly logger: PinoLogger
) {}

  getRoleInfo(employee: Employee): string {
    this.logger.debug(`Handling CTO: ${employee.name}`);
    return `CTO: ${employee.name}`;
  }
}
