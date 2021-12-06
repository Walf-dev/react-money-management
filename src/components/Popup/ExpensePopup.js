import React, {useContext, useEffect, useState} from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  closeSnackbar,
} from "../../state/actions/expenseActionTypes";
//---------------------------------
import {
  DispatchExpenseContext,
  UserContext,
  ExpenseContext
} from "../../state/contexts/contexts";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ExpensePopup() {
  const [open, setOpen] = useState(false);
  const { error } = useContext(UserContext);
  const {successMessage, severity} = useContext(ExpenseContext);
  const dispatch = useContext(DispatchExpenseContext);

  useEffect(() => {
    if ((error != null) || (successMessage != null)) {
      setOpen(true);
    }
  }, [error, successMessage]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    dispatch(closeSnackbar());
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical:"top", horizontal:"center" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {(error && error) || (successMessage && successMessage)}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
