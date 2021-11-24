import faker from 'faker';
import { sample } from 'lodash';
// utils
import { mockImgAvatar } from '../utils/mockImages';

// ----------------------------------------------------------------------
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
