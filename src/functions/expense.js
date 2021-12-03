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
  deleteExpenseFailure,
  deleteExpenseRequest,
  deleteExpenseSuccess,
} from "../state/actions/expenseActionTypes";
//---------------------------------
import {
  DispatchExpenseContext,
  ExpenseContext,
  UserContext
} from "../state/contexts/contexts";
//------------------------------------

export const useGetExpensesList = () => {
  const dispatch = useContext(DispatchExpenseContext);
  const { expenses } = useContext(ExpenseContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    function getExpenses() {
      if (user && user.id && expenses==null) {
        return firestore
          .collection("expenses")
          .where("uid", "==", user.id)
          .orderBy("date", "desc")
          .onSnapshot((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
              docId: doc.id,
              ...doc.data(),
            }));
            dispatch(getExpenseSuccess(data));
          })
      }
    }
    getExpenses();
  });
};

export const useDeleteExpense = () => {
  const dispatch = useContext(DispatchExpenseContext);
  const { expenses } = useContext(ExpenseContext);
  const { user } = useContext(UserContext);

    useEffect(() => {
    function deleteExpense(docId) {
      if (user && user.id && expenses != null) {
        dispatch(deleteExpenseRequest());
        return firestore
          .collection("expenses")
          .doc(docId)
          .delete()
          .then(() => {
            dispatch(deleteExpenseSuccess());
          })
          .catch((error) => {
            dispatch(deleteExpenseFailure(error));
          })
      }
    }
     deleteExpense();
    });
};
