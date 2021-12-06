import { INITIAL_STATE } from "../initial_state.js";

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  //console.log({ type });
  //console.log({ payload });
  switch (type) {
    case "USER_LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "USER_LOGIN_SUCCESS":
      return {
        ...state,
        user: payload,
        loading: false,
        authenticated: true,
      };
    case "USER_LOGIN_FAILURE":
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case "USER_LOGOUT":
      return {
        ...state,
        loading: false,
        user: null,
      };
    case "GET_CURRENT_USER":
      return {
        ...state,
        user: payload,
        authenticated: true,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    case "EMAIL_SENT":
      return {
        ...state,
        loading: false,
      };
    case "SEND_EMAIL_LINK_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "SEND_EMAIL_LINK_SUCCESS":
      return {
        ...state,
        loading: false,
      };

    case "SEND_EMAIL_LINK_FAILURE":
      return {
        ...state,
        error: payload,
        loading: false,
      };
    //----------------------------------------------------------------
    case "ADD_EXPENSE_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "ADD_EXPENSE_SUCCESS":
      return {
        ...state,
        loading: false,
        severity: "success",
        successMessage: "Expense added successfully",
        
      };

    case "ADD_EXPENSE_FAILURE":
      return {
        ...state,
        error: payload,
        loading: false,
        severity: "warning",
        
      };
    //-------------------------------
    case "UPDATE_EXPENSE_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "UPDATE_EXPENSE_SUCCESS":
      return {
        ...state,
        expense: payload,
        loading: false,
        severity: "success",
        successMessage: "Expense updated successfully",
        
      };

    case "UPDATE_EXPENSE_FAILURE":
      return {
        ...state,
        error: payload,
        loading: false,
        severity: "warning",
        
      };

    //------------------------------
    case "GET_EXPENSE_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_EXPENSE_SUCCESS":
      return {
        ...state,
        expenses: payload,
        loading: false,
      };

    case "GET_EXPENSE_FAILURE":
      return {
        ...state,
        error: payload,
        loading: false,
        severity: "warning",
        
      };
    //------------------------------
    case "DELETE_EXPENSE_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "DELETE_EXPENSE_SUCCESS":
      return {
        ...state,
        expenses: payload,
        loading: false,
        severity: "success",
        successMessage: "Expense deleted successfully",
        
      };

    case "DELETE_EXPENSE_FAILURE":
      return {
        ...state,
        error: payload,
        loading: false,
        severity: "warning",
        
      };
    //----------------------------
    case "CLOSE_SNACKBAR":
      return {
        ...state,
        severity: "success",
        successMessage: null,
        error: null,
      };
    //--------------------------------------
    default:
      return state;
  }
};

export default reducer;
