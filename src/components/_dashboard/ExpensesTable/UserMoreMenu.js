import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, TextField, Button } from '@mui/material';
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
//------------------------
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
// ----------------------------------------------------------------------
import { useGetExpensesList,  } from "../../../functions/expense";
//---------------------------------------

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

export default function UserMoreMenu({docId}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  //---------------------
  const [currency, setCurrency] = useState("EUR");
  const [value, setValue] = useState(new Date());

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDate = (newValue) => {
    setValue(newValue);
  };

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };


  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24}/>
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" onClick={handleClickOpen} primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Modify Expense</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Fill-in the form below to modify expense. Expense should be greater than 0.
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
