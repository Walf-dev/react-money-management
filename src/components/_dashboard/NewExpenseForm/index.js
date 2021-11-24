import React, { useState, useContext } from "react";
// material
import {
  Box,
  Grid,
  Container,
  Typography,
  TextField,
  Divider,
  MenuItem,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// components

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
//-------------------------------
import {
  addNewExpenseRequest,
  addExpenseFailure,
  addExpenseSuccess,
} from "../../../state/actions/expenseActionTypes";
//-------------------------------
import {
  DispatchExpenseContext,
  ExpenseContext,
} from "../../../state/contexts/contexts";
//-------------------------------

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];
export default function NewExpenseForm({ handleClose, open }) {
  const [currency, setCurrency] = React.useState("EUR");
  const [value, setValue] = React.useState(new Date());

  const handleDate = (newValue) => {
    setValue(newValue);
  };

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> New Expense</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Fiil-in the form below to add a new expense.
            <br />
            Expense should be greater than 0.
          </DialogContentText>
          <form>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Choose The Date"
                inputFormat="MM/dd/yyyy"
                fullWidth
                value={value}
                onChange={handleDate}
                renderInput={(params) => <TextField {...params} />}
                sx={{ mt: 3, mb: 1 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </LocalizationProvider>
            <TextField
              fullWidth
              label="Enter The Expense Amount"
              id="outlined-number"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              sx={{ mt: 3, mb: 3 }}
            />
            <TextField
              select
              fullWidth
              label="Select The Category"
              value={currency}
              onChange={handleChange}
              sx={{ mb: 3 }}
              InputLabelProps={{
                shrink: true,
              }}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Type A Comment"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <DialogActions sx={{ mt: 2 }}>
              <Button onClick={handleClose}>Cancel</Button>
              <LoadingButton
                type="submit"
                variant="contained"
                onClick={handleClose}
              >
                Submit
              </LoadingButton>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
