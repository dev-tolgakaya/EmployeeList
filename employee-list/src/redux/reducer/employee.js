import { createSlice } from "@reduxjs/toolkit";
import { EmployeeService } from "../../services/EmployeeService";
import { openLoading, closeLoading, setTost } from "./runtime";

const initialState = {
  employeeList: null,
};

const slice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    updateEmployeeList: (state, action) => {
      state.employeeList = action.payload;
    },
  },
});

export default slice.reducer;

export const { updateEmployeeList } = slice.actions;

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
