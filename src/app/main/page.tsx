"use client";

import MidWrapper from './mid-wrapper/mid-wrapper.page';
import RightWrapper from './right-wrapper/right-wrapper.page';
import { MainProps} from './userType';
import './main.css';
import React, { useState, useEffect } from 'react';
import LeftWrapper from './left-wrapper/page';
import { CheckAuth } from './components/CheckAuth';

function Main(props: MainProps) {

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
