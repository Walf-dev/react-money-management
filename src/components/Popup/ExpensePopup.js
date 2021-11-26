import React, { useState, useContext, useEffect } from "react";
import { Snackbar, Slide } from "@mui/material";
import { ExpenseContext } from "../../state/contexts/contexts";

function ExpensePopup() {
  const [open, setOpen] = useState(false);
  const { expenseError } = useContext(ExpenseContext);

  useEffect(() => {
    if (expenseError != null) {
      setOpen(true);
    }
  }, [expenseError]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      TransitionComponent={Slide}
      open={open}
      onClose={() => setOpen(false)}
      autoHideDuration={5000}
      message={expenseError && expenseError}
    />
  );
}

export default ExpensePopup;
