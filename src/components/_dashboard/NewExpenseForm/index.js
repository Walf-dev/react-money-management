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
import { Icon } from "@iconify/react";
//--------------------------
import firebase, { firestore, auth } from "../../../firebase";
/*const currencies = [
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
];*/

const categories = [
  {
    value: "Food",
    icon: "emojione-v1:pot-of-food",
  },
  {
    value: "Automobile",
    icon: "noto:oncoming-automobile",
  },
  {
    value: "Entertainment",
    icon: "icon-park:entertainment",
  },
  {
    value: "Clothing",
    icon: "emojione-v1:womans-clothes",
  },
  {
    value: "Healthcare",
    icon: "iconoir:healthcare",
  },
  {
    value: "Travel",
    icon: "la:plane",
  },
  {
    value: "Shopping",
    icon: "emojione:shopping-bags",
  },
  {
    value: "Investment",
    icon: "emojione-v1:money-bag",
  },
  {
    value: "Gifts & Donations",
    icon: "emojione:wrapped-gift",
  },
  {
    value: "Bills & Utilities",
    icon: "icon-park:bill",
  },
  {
    value: "Others",
    icon: "emojione:exclamation-question-mark",
  },
];

//Add loggedIn user to `users` collection
export async function addExpenseToCollection(expense) {
  const db = firebase.firestore();
  const expenses = db.collection("expenses");
  try {
    await expenses.add(expense);
  } catch (error) {
    console.log("Expense not added to collection due to", error);
  }
}

export default function NewExpenseForm({ handleClose, open }) {
  const [category, setCategory] = React.useState("");
  const [date, setdate] = React.useState(new Date());
  const [amount, setAmount] = React.useState("");
  const [comment, setComment] = React.useState("");
  const dispatch = useContext(DispatchExpenseContext);
  const { isLoading } = useContext(ExpenseContext);
  console.log(ExpenseContext);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    return new Promise((resolve, reject) => {
      if (!category) {
        return reject("Choose a category");
      } else if (!date || !amount || !comment) {
        return reject("Fill in all the fields");
      }
      if (!isLoading) {
        dispatch(addNewExpenseRequest());
        addExpenseToCollection(expenseObject)
          .then((expense) => {
            dispatch(addExpenseSuccess(expense));
          })
          .catch((err) => dispatch(addExpenseFailure(err)));
      }
    });
  };

  const expenseObject = {
    category: category,
    date: date,
    amount: amount,
    comment: comment,
    user: auth.currentUser.uid,
  };
  console.log(expenseObject);

  const handleDate = (newValue) => {
    setdate(newValue);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleAmount = (event) => {
    setAmount(event.target.value);
  };

  const handleComment = (event) => {
    setComment(event.target.value);
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> New Expense</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Fiil-in the form below to add a new expense. Expense should be
            greater than 0.
          </DialogContentText>
          <form noValidate onSubmit={handleOnSubmit}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Choose The Date"
                inputFormat="MM/dd/yyyy"
                name="date"
                autoComplete="date"
                autoFocus
                value={date}
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
              name="amount"
              autoComplete="amount"
              onChange={handleAmount}
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
              name="category"
              autoComplete="category"
              value={category}
              onChange={handleChange}
              sx={{ mb: 3 }}
              InputLabelProps={{
                shrink: true,
              }}
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                  <Icon
                    icon={option.icon}
                    style={{ height: "25px", width: "30px" }}
                  />
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              onChange={handleComment}
              name="comment"
              autoComplete="comment"
              label="Type A Comment"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <DialogActions sx={{ mt: 2 }}>
              <Button onClick={handleClose}>Cancel</Button>
              <LoadingButton type="submit" variant="contained">
                {isLoading ? `Submitting...` : `Submit`}
              </LoadingButton>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
