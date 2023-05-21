import { constructByInterface } from "@/utils/constructByInterface";

interface EmployeeInterface {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  description: string;
}

export class EmployeeModel implements EmployeeInterface {
  id!: number;
  firstName!: string;
  middleName!: string;
  lastName!: string;
  birthDate!: string;
  description!: string;

  constructor(o?) {
    constructByInterface(o, this);
  }
}
