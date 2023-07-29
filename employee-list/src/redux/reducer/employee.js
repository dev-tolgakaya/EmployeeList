import { createSlice } from "@reduxjs/toolkit";
import { EmployeeService } from "../../services/EmployeeService";
import { openLoading, closeLoading, setTost } from "./runtime";

const initialState = {
  employeeList: null,
  employeeById: null,
};

const slice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    updateEmployeeList: (state, action) => {
      state.employeeList = action.payload;
    },
    employeeById: (state, action) => {
      state.employeeById = action.payload;
    },
    resetEmployeeById: (state) => {
      state.employeeById = initialState.employeeById;
    },
  },
});

export default slice.reducer;

export const { updateEmployeeList, employeeById, resetEmployeeById } =
  slice.actions;

const empServ = new EmployeeService();

export const getEmployeeList = (_data) => async (dispatch) => {
  dispatch(openLoading());
  try {
    await empServ
      .getEmployeeList()
      .then((res) => {
        dispatch(updateEmployeeList(res.data));
        dispatch(
          setTost({
            open: true,
            message: res.message,
            severity: "success",
          })
        );
      })
      .catch((err) => {
        console.log("err", err);
        dispatch(
          setTost({ open: true, message: err.message, severity: "error" })
        );
      })
      .finally(() => dispatch(closeLoading()));
  } catch (error) {
    return console.error(error);
  }
};

export const getEmployeeById = (id) => async (dispatch) => {
  dispatch(openLoading());
  try {
    await empServ
      .getEmployeeById(id)
      .then((res) => {
        dispatch(employeeById(res.data));
        dispatch(
          setTost({
            open: true,
            message: res.message,
            severity: "success",
          })
        );
      })
      .catch((err) => {
        console.log("err", err);
        dispatch(
          setTost({ open: true, message: err.message, severity: "error" })
        );
      })
      .finally(() => dispatch(closeLoading()));
  } catch (error) {
    return console.error(error);
  }
};

export const deleteEmploye = (id) => async (dispatch) => {
  dispatch(openLoading());
  try {
    await empServ
      .deleteEmployee(id)
      .then((res) => {
        dispatch(
          setTost({
            open: true,
            message: res.message,
            severity: "success",
          })
        );
        dispatch(getEmployeeList());
      })
      .catch((err) => {
        console.log("err", err);
        dispatch(
          setTost({ open: true, message: err.message, severity: "error" })
        );
      })
      .finally(() => dispatch(closeLoading()));
  } catch (error) {
    return console.error(error);
  }
};

export const addEmployee = (data,navigate) => async (dispatch) => {
  dispatch(openLoading());
  try {
    await empServ
      .addEmployee(data)
      .then((res) => {
        dispatch(
          setTost({
            open: true,
            message: res.message,
            severity: "success",
          })
        );
        dispatch(getEmployeeList());
        navigate("/");
      })
      .catch((err) => {
        console.log("err", err);
        dispatch(
          setTost({ open: true, message: err.message, severity: "error" })
        );
      })
      .finally(() => dispatch(closeLoading()));
  } catch (error) {
    return console.error(error);
  }
};

export const updateEmployee = (data,navigate) => async (dispatch) => {
  dispatch(openLoading());
  try {
    await empServ
      .updateEmployee(data)
      .then((res) => {
        dispatch(
          setTost({
            open: true,
            message: res.message,
            severity: "success",
          })
        );
        dispatch(getEmployeeList());
        navigate("/");
      })
      .catch((err) => {
        console.log("err", err);
        dispatch(
          setTost({ open: true, message: err.message, severity: "error" })
        );
      })
      .finally(() => dispatch(closeLoading()));
  } catch (error) {
    return console.error(error);
  }
};
