import { RecoilState, atom, selector } from 'recoil';
import { getMyInfo } from '../api/client';

interface User {
  name: string;
}

export const userList: RecoilState<any> = atom({
  key: 'userList',
  default: {"name": "test"},
});

export const userListSelector: RecoilState<any> = selector({
  key: 'userListSelector',
  set: ({ set }, newValue) => {
    set(userList, newValue);
  },
  get: ({ get }) => {
    const res = get(userList);
    return res;
  }
});