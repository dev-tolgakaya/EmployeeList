import axiosApiInstance from "./axios-instance";

const apiURL = process.env.REACT_APP_API_URL;


export class EmployeeService {
  getEmployeeList(_data) {
    const config = {
      method: "GET",
      url: apiURL + "/employees",
    };
    return  axiosApiInstance(config)
  }
}
