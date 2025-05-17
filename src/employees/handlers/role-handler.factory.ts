import { RoleHandler } from '../role-handler.interface';
import { CTOHandler } from './cto.handler';
import { SeniorEngineerHandler } from './senior-engineer.handler';
import { EngineerHandler } from './engineer.handler';
import { PinoLogger } from 'nestjs-pino';

export class RoleHandlerFactory {
  static getHandler(role: string, logger: PinoLogger): RoleHandler {
    switch (role.toLowerCase()) {
      case 'cto':
        return new CTOHandler(logger);
      case 'senior software eng':
        return new SeniorEngineerHandler(logger);
      case 'software eng':
        return new EngineerHandler(logger);
      default:
        throw new Error(`No handler found for role: ${role}`);
    } 
  }
} 
