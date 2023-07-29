import React, { useEffect, useRef, useState, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Paper, Button, Grid } from "@mui/material";
import { makeColumns } from "./columns";
import { useSelector, useDispatch } from "react-redux";
import { Add } from "@mui/icons-material";
import { getEmployeeList } from "../../redux/reducer/employee";
import { useNavigate } from "react-router-dom";
import TablePagination from "../../components/pagination";

function QuickToolbar() {
  const navigate = useNavigate();
  return (
    <Box mt={2} p={1}>
      <Grid container spacing={2} justifyContent="flex-end">
        <Button
          size="small"
          variant="contained"
          color="warning"
          startIcon={<Add />}
          onClick={() => navigate("/addEdit")}
        >
          Add Employee
        </Button>
      </Grid>
    </Box>
  );
}

function DataTable() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const mounted = useRef(false);
  const employeeList = useSelector((state) => state.employee.employeeList);
  const columns = makeColumns();

  useEffect(() => {
    if (mounted.current) return;
    dispatch(getEmployeeList());
    mounted.current = true;
  }, []);

  const filteredEmployeeList = useMemo(() => {
    return (
      (employeeList && employeeList.slice((page - 1) * 10, page * 10)) || []
    );
  }, [page, employeeList]);

  const handlePagination = (page) => {
    setPage(page);
  };

  return (
    <Box mt={2} p={2} component={Paper}>
      <DataGrid
        className={"uikit-datagrid"}
        rows={filteredEmployeeList}
        columns={columns}
        autoHeight
        pagination
        disableSelectionOnClick
        components={{
          Toolbar: QuickToolbar,
          Pagination: () => (
            <TablePagination
              page={page}
              pageCount={10}
              totalCount={(employeeList && employeeList.length) || 0}
              onChange={handlePagination}
            />
          ),
        }}
      />
    </Box>
  );
}

export default DataTable;
