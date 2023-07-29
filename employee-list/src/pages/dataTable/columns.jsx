import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Delete, Edit } from "@mui/icons-material";
import { Grid, Tooltip, IconButton } from "@mui/material";

function ButtonsColumn({ row }) {
  return (
    <Grid direction="row" container spacing={2} justifyContent="center">
      <Tooltip title="Delete">
        <IconButton
        //   onClick={() => {
        //     dispatch(
        //       actions.updateQuotaHistoryFilters({ ...filters, QuotaId: id })
        //     );
        //     dispatch(actions.loadQuotaReportHistory());
        //   }}
        >
          <Delete color="error" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Update">
        <IconButton
        //   onClick={() => {
        //     dispatch(
        //       actions.updateQuotaHistoryFilters({ ...filters, QuotaId: id })
        //     );
        //     dispatch(actions.loadQuotaReportHistory());
        //   }}
        >
          <Edit color="primary" />
        </IconButton>
      </Tooltip>
    </Grid>
  );
}

export function makeColumns() {
  return [
    {
      field: "employee_name",
      headerName: "Name",
      flex: 4,
      minWidth: 150,
      sortable: false,
    },
    {
      field: "employee_age",
      headerName: "Age",
      minWidth: 200,
      sortable: false,
      flex: 4,
    },
    {
      field: "employee_salary",
      headerName: "Salary",
      minWidth: 150,
      sortable: false,
      flex: 3,
    },
    {
      field: "Buttons",
      headerName: "Buttons",
      minWidth: 150,
      sortable: false,
      flex: 1,
      renderCell: (row) => <ButtonsColumn row={row.row} />,
    },
  ];
}
