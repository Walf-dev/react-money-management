import React, { useState, useContext, useEffect } from "react";
import { Snackbar, Slide } from "@mui/material";
import { UserContext } from "../../state/contexts/contexts";

function Popup() {
  const [open, setOpen] = useState(false);
  const { error } = useContext(UserContext);

  useEffect(() => {
    if (error != null) {
      setOpen(true);
    }
  }, [error]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      TransitionComponent={Slide}
      open={open}
      onClose={() => setOpen(false)}
      autoHideDuration={5000}
      message={error && error}
    />
  );
}

export default Popup;
