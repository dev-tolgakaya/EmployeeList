import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Delete, Edit } from "@mui/icons-material";
import {
  Grid,
  Tooltip,
  IconButton,
  Modal,
  Box,
  Typography,
  Container,
  Button,
} from "@mui/material";
import { deleteEmploye } from "../../redux/reducer/employee";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

function ButtonsColumn({ row }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const deleteEmployee = (id) => {
    handleClose();
    dispatch(deleteEmploye(id));
  };
  return (
    <>
      <Grid direction="row" container spacing={2} justifyContent="center">
        <Tooltip title="Delete">
          <IconButton
            onClick={() => {
              setOpen(true);
            }}
          >
            <Delete color="error" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Update">
          <IconButton
            onClick={()=>navigate(`/addEdit/${row.id}`)}
          >
            <Edit color="primary" />
          </IconButton>
        </Tooltip>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid>
            <Container>
              <Typography variant="body1">
                Are you sure you want to delete employee named{" "}
                {row.employee_name}?
              </Typography>
            </Container>
            <Box>
              <Grid container justifyContent="flex-end">
                <Box mt={2}>
                  <Grid item>
                    <Button variant="contained" onClick={handleClose}>
                      Cancel
                    </Button>
                  </Grid>
                </Box>
                <Box mt={2} ml={2}>
                  <Grid item>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => deleteEmployee(row.id)}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </Modal>
    </>
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
