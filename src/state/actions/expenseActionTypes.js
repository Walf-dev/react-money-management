export const addNewExpenseRequest = () => {
    return {
      type: "ADD_EXPENSE_REQUEST",
    };
  };

  export const addExpenseSuccess = () => {
    return {
      type: "ADD_EXPENSE_SUCCESS",
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
//---------------------------------------------------

export const getExpenseSuccess = (expenses) => {
  return {
    type: "GET_EXPENSE_SUCCESS",
    payload: expenses,
  };
};

export const getExpenseRequest = () => {
  return {
    type: "GET_EXPENSE_REQUEST",
  };
};

export const getExpenseFailure = (err) => {
  return {
    type: "GET_EXPENSE_FAILURE",
    payload: err && err.message ? err.message : err,
  };
};
