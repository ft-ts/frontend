"use client";

import MidWrapper from './mid-wrapper/mid-wrapper.page';
import RightWrapper from './right-wrapper/right-wrapper.page';
import './main.css';
import React from 'react';
import LeftWrapper from './left-wrapper/page';
import { CheckAuth } from './components/CheckAuth';

function Main() {

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
