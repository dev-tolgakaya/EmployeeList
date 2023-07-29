import axiosApiInstance from "./axios-instance";

const apiURL = process.env.REACT_APP_API_URL;

export class EmployeeService {
  getEmployeeList(_data) {
    const config = {
      method: "GET",
      url: apiURL + "/employees",
    };
    return axiosApiInstance(config);
  }
  getEmployeeById(id) {
    const config = {
      method: "GET",
      url: apiURL + `/employee/${id}`,
    };
    return axiosApiInstance(config);
  }
  deleteEmployee(id) {
    const config = {
      method: "DELETE",
      url: apiURL + `/delete/${id}`,
    };
    return axiosApiInstance(config);
  }
  addEmployee(data) {
    const config = {
      method: "POST",
      url: apiURL + `/create`,
      data,
    };
    return axiosApiInstance(config);
  }
  updateEmployee(data) {
    const config = {
      method: "put",
      url: apiURL + `/update/${data.id}`,
      data,
    };
    return axiosApiInstance(config);
  }
}
