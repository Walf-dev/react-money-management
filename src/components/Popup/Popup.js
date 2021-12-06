import React, { useState, useContext, useEffect } from "react";
import { Snackbar, Slide } from "@mui/material";
import { UserContext } from "../../state/contexts/contexts";
import { ExpenseContext } from "../../state/contexts/contexts";

function Popup() {
  const [open, setOpen] = useState(false);
  const { error } = useContext(UserContext);
  const {successMessage} = useContext(ExpenseContext);
  useEffect(() => {
    if ((error != null) || (successMessage != null)) {
      setOpen(true);
    }
  }, [error, successMessage]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      TransitionComponent={Slide}
      open={open}
      onClose={() => setOpen(false)}
      autoHideDuration={5000}
      message={(error && error) || (successMessage && successMessage)}
    />
  );
}

export default Popup;
