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
} from "../state/contexts/contexts";
//------------------------------------

export const useExpensesList = () => {
  const dispatch = useContext(DispatchExpenseContext);
  const { expenses } = useContext(ExpenseContext);
  //console.log(expenses)
  const userId = useGetCurrentUser();
  //listen to expenses collection changes
    if (userId) {
      return firestore
        .collection("expenses")
        .where("uid", "==", userId.id)
        .orderBy("date", "desc")
        .get()
        .then((result) => {
          const data = result.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch(getExpenseSuccess(data))
        })
    }
};
