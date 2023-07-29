import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  getEmployeeById,
  resetEmployeeById,
  updateEmployee,
  addEmployee,
} from "../../redux/reducer/employee";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Grid, Paper, TextField, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import { onlyNumberReplace } from "../../utils/customFunctions";

function AddEditEmployee() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const mounted = useRef(false);
  const employeeById = useSelector((state) => state.employee.employeeById);

  const formik = useFormik({
    initialValues: {
      name: "",
      salary: "",
      age: "",
      id: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      salary: Yup.number().required("Required"),
      age: Yup.number().required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(
        params.id
          ? updateEmployee(values,navigate)
          : addEmployee({ ...values, id: Math.floor(Math.random() * 100000) },navigate)
      );
    },
  });

  useEffect(() => {
    return () => {
      formik.resetForm();
      dispatch(resetEmployeeById());
    };
  }, []);

  useEffect(() => {
    if (!params.id || mounted.current) return;
    dispatch(getEmployeeById(params.id));
    mounted.current = true;
  }, [params.id]);

  useEffect(() => {
    if (!employeeById) return;
    formik.setValues({
      ...formik.values,
      name: employeeById.employee_name,
      salary: employeeById.employee_salary,
      age: employeeById.employee_age,
      id: employeeById.id,
    });
  }, [employeeById]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Container>
        <Box component={Paper} p={3} mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                name="name"
                label="Employee Name"
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                name="salary"
                label="Employee Salary"
                error={formik.touched.salary && Boolean(formik.errors.salary)}
                helperText={formik.touched.salary && formik.errors.salary}
                value={formik.values.salary}
                onChange={(e) =>
                  formik.setFieldValue(
                    "salary",
                    onlyNumberReplace(e.target.value)
                  )
                }
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                name="age"
                label="Employee Age"
                error={formik.touched.age && Boolean(formik.errors.age)}
                helperText={formik.touched.age && formik.errors.age}
                value={formik.values.age}
                onChange={(e) =>
                  formik.setFieldValue("age", onlyNumberReplace(e.target.value))
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent="flex-end" spacing={2}>
                <Box mt={2} mr={2}>
                  <Grid item>
                    <Button variant="contained" onClick={() => navigate("/")}>
                      Cancel
                    </Button>
                  </Grid>
                </Box>
                <Box mt={2}>
                  <Grid item>
                    <Button
                      variant="contained"
                      type="submit"
                      color="warning"
                      startIcon={<SaveIcon />}
                      disabled={params.id && !employeeById}
                    >
                      {params.id ? "Update" : "Create"}
                    </Button>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </form>
  );
}

export default AddEditEmployee;
