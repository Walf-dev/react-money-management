export const addNewExpenseRequest = () => {
    return {
      type: "ADD_EXPENSE_REQUEST",
    };
  };
  
  export const addExpenseSuccess = (user) => {
    return {
      type: "ADD_EXPENSE_SUCCESS",
      payload: user,
    };
  };
  
  export const addExpenseFailure = (err) => {
    return {
      type: "ADD_EXPENSE_FAILURE",
      payload: err && err.message ? err.message : err,
    };
  };
  
  // ------------------------------
  export const updateExpenseRequest = () => {
    return {
      type: "UPDATE_EXPENSE_REQUEST",
    };
  };
  
  export const updateExpenseSuccess = (user) => {
    return {
      type: "UPDATE_EXPENSE_SUCCESS",
      payload: user,
    };
  };
  
  export const updateExpenseFailure = (err) => {
    return {
      type: "UPDATE_EXPENSE_FAILURE",
      payload: err && err.message ? err.message : err,
    };
  };
