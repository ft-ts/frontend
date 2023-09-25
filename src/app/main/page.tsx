'use client';

import './main.css';
import React, { useEffect } from 'react';
import MidWrapper from './mid-wrapper/mid-wrapper.page';
import RightWrapper from './right-wrapper/right-wrapper.page';
import LeftWrapper from './left-wrapper/page';
import { CheckAuth } from './components/CheckAuth';
import { useGlobalContext } from '../Context/store';
import { getMyInfo }  from '@/app/axios/client';

function Main() {
  const { setMyInfo } : any = useGlobalContext();
  const { setCurrentUser } : any = useGlobalContext();
  const { setBlockList } : any = useGlobalContext();
  const { setIsNotificationVisible }: any = useGlobalContext();
  const { setErrorMessage }: any = useGlobalContext();

  useEffect(() => {
    getMyInfo().then((res) => {
      const { data } = res;
      data.blocked?.forEach((blockedUser: any) => {
        setBlockList((prev: number[]) => [...prev, blockedUser.blocked.uid]);
      });
      setMyInfo(data);
      setCurrentUser(data);
    }).catch((err) => {
      setErrorMessage('Failed to get my info');
      setIsNotificationVisible(true);
      setTimeout(() => {
        setIsNotificationVisible(false);
        setErrorMessage('');
      }, 2000);
    });
  }, []);

  return (
    <>
      <CheckAuth />
      <div id="main">
        <LeftWrapper />
        <MidWrapper />
        <RightWrapper />
      </div>
    </>
  );
}



export default Main;
