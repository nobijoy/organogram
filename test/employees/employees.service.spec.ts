import { EmployeesService } from '../../src/employees/employees.service';
import { Employee } from '../../src/employees/employee.interface';

const testEmployees: Employee[] = [
  { id: 1, name: 'Alice', title: 'CTO', managerId: null },
  { id: 2, name: 'Bob', title: 'Senior Software Eng', managerId: 1 },
  { id: 3, name: 'Carol', title: 'Software Eng', managerId: 2 },
  { id: 4, name: 'Dave', title: 'Software Eng', managerId: 2 }
];

describe('EmployeesService', () => {
  let service: EmployeesService;

  let mockLogger: any;

  beforeEach(() => {
    mockLogger = { info: jest.fn(), error: jest.fn(), warn: jest.fn(), debug: jest.fn() };
    service = new EmployeesService(mockLogger);
    (service as any).employees = testEmployees;
  });

  it('should return subordinates recursively', () => {
    const result = service.findSubordinates(1);
    expect(result).toContain('Senior Engineer: Bob');
    expect(result).toContain('Engineer: Carol');
    expect(result).toContain('Engineer: Dave');
  });
});
