import React, { useState, useContext, useEffect } from "react";
//----------------------------------------------------------------
import { useGetCurrentUser } from "../auth/auth";
//----------------------------------------------------------------
import firebase, { firestore } from "../firebase";
//------------------------------
import {
  getExpenseRequest,
  getExpenseFailure,
  getExpenseSuccess,
} from "../state/actions/expenseActionTypes";
//---------------------------------
import {
  DispatchExpenseContext,
  ExpenseContext,
  UserContext
} from "../state/contexts/contexts";
//------------------------------------

export const useExpensesList = () => {
  const dispatch = useContext(DispatchExpenseContext);
  const { expenses } = useContext(ExpenseContext);
  const { user } = useContext(UserContext);

  console.log(expenses)
  useEffect(() => {
    function getExpenses() {
      if (user && user.id && expenses==null) {
        return firestore
          .collection("expenses")
          .where("uid", "==", user.id)
          .orderBy("date", "desc")
          .get()
          .then((result) => {
            const data = result.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            dispatch(getExpenseSuccess(data));
          });
      }
    }
    getExpenses();
  });
};
