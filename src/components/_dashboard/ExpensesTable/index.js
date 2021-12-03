import { filter } from "lodash";
import { Icon } from "@iconify/react";
import { sentenceCase } from "change-case";
import { useState, useContext, useReducer, useEffect } from "react";
import plusFill from "@iconify/icons-eva/plus-fill";
import { Link as RouterLink } from "react-router-dom";
import NewExpenseForm from "../NewExpenseForm";
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Backdrop,
  Modal,
  Fade,
  Box,
  TextField,
} from "@mui/material";
import Page from "../../Page";
import Label from "../../Label";
import Scrollbar from "../../Scrollbar";
import SearchNotFound from "../../SearchNotFound";
import UserListHead from "./UserListHead";
import UserListToolbar from "./UserListToolbar";
import UserMoreMenu from "./UserMoreMenu";
//--------------------------------
import USERLIST from "../../../_mocks_/user";
//-------------------------------------------
import { fDate } from "../../../utils/formatTime";
// ----------------------------------------------------------------------
import { useGetExpensesList, useDeleteExpense } from "../../../functions/expense";
//---------------------------------------
import {
  DispatchExpenseContext,
  ExpenseContext,
  UserContext,
} from "../../../state/contexts/contexts";
//---------------------------------------
import { useGetCurrentUser } from "../../../auth/auth";
//-----------------------------------
import firebase, { firestore } from "../../../firebase";
//----------------------------------------
import {
  getExpenseRequest,
  getExpenseFailure,
  getExpenseSuccess,
} from "../../../state/actions/expenseActionTypes";
//---------------------------------

const TABLE_HEAD = [
  { id: "date", label: "Date", alignRight: false },
  { id: "category", label: "Category", alignRight: false },
  { id: "amount", label: "Amount", alignRight: false },
  { id: "comment", label: "Comments", alignRight: false },
];
// ----------------------------------------------------------------------
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (x) => x.category.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ExpensesTable() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("category");
  const [filterCategory, setFilterCategory] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [expensesList, setExpensesList] = useState();
  const { expenses } = useContext(ExpenseContext);
  const { user } = useContext(UserContext);

  const dispatch = useContext(DispatchExpenseContext);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useGetExpensesList();

  //console.log(expenses)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  //const expenseList= useGetExpensesList();

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = expenses.map((n) => n.category);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, category) => {
    const selectedIndex = selected.indexOf(category);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, category);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterCategory(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - expenses.length) : 0;

  const filteredCategory = expenses ? applySortFilter(
    expenses,
    getComparator(order, orderBy),
    filterCategory
  ) : null;
  const isCategoryNotFound = expenses ? filteredCategory.length === 0 : null;

  return (
    <Page title="Expenses Table | Money-Management">
      <div>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Expenses Table
          </Typography>
          <Button
            onClick={handleClickOpen}
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Expense
          </Button>
          <NewExpenseForm open={open} handleClose={handleClose} />
        </Stack>

        {expenses ? (
          <Card>
            <UserListToolbar
              numSelected={selected.length}
              filterCategory={filterCategory}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: "800" }}>
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={expenses.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredCategory
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        const { docId, amount, date, category, comment } = row;
                        const isItemSelected =
                          selected.indexOf(category) !== -1;

                        return (
                          <TableRow
                            hover
                            key={docId}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) =>
                                  handleClick(event, category)
                                }
                              />
                            </TableCell>
                            <TableCell>{date}</TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                <Typography variant="subtitle2" noWrap>
                                  {category}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{amount}</TableCell>
                            <TableCell align="left">{comment}</TableCell>
                            <TableCell align="right">
                              <UserMoreMenu docId={docId}/>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {isCategoryNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <SearchNotFound searchQuery={filterCategory} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={expenses.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        ) : null}
      </div>
    </Page>
  );
}
