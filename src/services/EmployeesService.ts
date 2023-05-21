import { EmployeeModel } from "@/models/Employee";
import LocalStorageAdapter from "@/services/utils/localStorageAdapter";

export default class EmployeesService {
  protected _adapter = new LocalStorageAdapter<EmployeeModel>("employees");

  get(id: number) {
    return this._adapter.get(id);
  }

  getList(): EmployeeModel[] {
    return this._adapter.getItems();
  }

  post(data: EmployeeModel) {
    return this._adapter.post(data);
  }

  put(data: EmployeeModel) {
    return this._adapter.put(data);
  }

  delete(id: number) {
    return this._adapter.delete(id);
  }
}
