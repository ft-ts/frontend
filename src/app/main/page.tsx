"use client";

import { CheckAuth } from './components/CheckAuth';
import { MainProps } from './userType';
import './main.css';
import React, { useState, useEffect } from 'react';
import MidWrapper from './mid-wrapper/mid-wrapper.page';
import RightWrapper from './right-wrapper/right-wrapper.page';
import LeftWrapper from './left-wrapper/page';
import { useGlobalContext } from '../Context/store';
import { getMyInfo }  from '@/app/axios/client';

function Main(props: MainProps) {
  const { setMyInfo } : any = useGlobalContext();
  const { setCurrentUser } : any = useGlobalContext();

  useEffect(() => {
    getMyInfo().then((res) => {
      setMyInfo(res.data);
      setCurrentUser(res.data);
    });
  }, []);

  return (
      <div id="main">
        <CheckAuth />
        <LeftWrapper />
        <MidWrapper />
        <RightWrapper />
      </div>
  );
}

export default Main;
