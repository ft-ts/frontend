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

  useEffect(() => {
    getMyInfo().then((res) => {
      setMyInfo(res.data);
      setCurrentUser(res.data);
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
