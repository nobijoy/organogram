import { Controller, Get, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly service: EmployeesService,
    @InjectPinoLogger(EmployeesController.name)
    private readonly logger: PinoLogger,
  ) {}

  @Get('subordinates')
  getSubordinates(@Query('id') id: string) {
    const managerId = parseInt(id, 10);
    this.logger.info(`Request received for subordinates of manager ID: ${managerId}`);
    const subs = this.service.findSubordinates(managerId);
    this.logger.info({ count: subs.length }, 'Subordinates found');
    return { managerId, subordinates: subs };
  }
}
