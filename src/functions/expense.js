import React, { useState, useContext, useEffect } from "react";
//----------------------------------------------------------------
import { useGetCurrentUser } from "../auth/auth";
//----------------------------------------------------------------
import firebase, { firestore } from "../firebase";
//------------------------------

export const useExpensesList = () => {
  const [expensesCollection, setExpensesCollection] = useState(null);
  const userId = useGetCurrentUser();
  const array = [];
  //listen to expenses collection changes
  useEffect(() => {
    if (userId) {
      return firestore
        .collection("expenses")
        .where("uid", "==", userId.id)
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            array.push(doc.data());
            setExpensesCollection(array);
          });
        });
    }
  });
  return expensesCollection;
};
