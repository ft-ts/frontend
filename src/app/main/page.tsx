"use client";

import MidWrapper from './mid-wrapper/page';
import RightWrapper from './right-wrapper/page';
import { MainProps } from './userType';
import './main.css';
import React, { useState, useEffect } from 'react';
import LeftWrapper from './left-wrapper/page';
import { CheckAuth } from './components/CheckAuth';
import { apiClient, getMyInfo } from '../api/client';
import { useValidUser } from './hooks/useValidUser';
import { useCookie } from './hooks/useCookie';

function Main(props: MainProps) {
  const [channelId, setChannelId] = useState<number | null>(null);
  useValidUser();
  useCookie();

  return (
    <div id="main">
      <CheckAuth />
      <LeftWrapper setChannelId={setChannelId} />
      <MidWrapper channelId={channelId} />
      <RightWrapper channelId={channelId} />
    </div>
  );
}

export default Main;
