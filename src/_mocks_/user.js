import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';
// ----------------------------------------------------------------------
/*const userId = useGetCurrentUser();
  
//listen to expenses collection changes
  if (userId) {
    return firestore
      .collection("expenses")
      .where("uid", "==", userId.id)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          expensesCollection.push(doc.data());
      });
      });
  }*/
//------------------------------------------------------------------------



let num=1
const users = [...Array(4)].map((_, index) => ({
  id: faker.datatype.uuid(),
  num: num++,
  date: faker.date.recent(),
  category: faker.name.title(),
  expense: faker.finance.amount(),
  comment: faker.datatype.boolean(),
}));

export default users;
