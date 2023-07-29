import React, { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { resetToast } from "../../redux/reducer/runtime";



function Index() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const toastInfo = useSelector((state) => state.runtime.toast);
  const handleClose = () => {
    setOpen(false);
    dispatch(resetToast());
  };

  useEffect(() => {
    if (!toastInfo) return;
    setOpen(toastInfo.open);
  }, [toastInfo]);

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={toastInfo.severity}
        sx={{ width: "100%" }}
      >
        {toastInfo.message}
      </Alert>
    </Snackbar>
  );
}

export default Index;
