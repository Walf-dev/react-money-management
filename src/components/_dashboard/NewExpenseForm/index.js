import * as React from "react";
// material
import {
  Box,
  Grid,
  Container,
  Typography,
  TextField,
  Divider,
  MenuItem,
} from "@mui/material";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
//
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
export default function NewExpenseForm() {
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
      <form>
        <Typography id="transition-modal-title" variant="h6" component="h2">
          Add an expense
        </Typography>
        <Divider />
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
      </form>
    </>
  );
}
