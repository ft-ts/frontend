import { RecoilState, atom, selector, GetCallback } from 'recoil';
import { getMyInfo, getUserList } from '../api/client';

interface User {
  name: string;
}

export const myInfo: RecoilState<any> = atom({
  key: 'myInfo',
  default: { "name": "test" },
});

export const myInfoSelector: RecoilState<any> = selector({
  key: 'myInfoSelector',
  set: ({ set }, newValue) => {
    set(myInfo, newValue);
  },
  get: ({ get }) => {
    const res = get(myInfo);
    getMyInfo().then((res) => {
      console.log(res.data);
    })
    return res;
  }
});