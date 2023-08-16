"use client";

import LeftWrapper from './left-wrapper/page';
import MidWrapper from './mid-wrapper/page';
import RightWrapper from './right-wrapper/page';
import { MainProps} from './userType';
import './main.css';
import React, { useState } from 'react';

function Main(props: MainProps | any) {
  const [channelId, setChannelId] = useState<number | null>(null);
  
  return (
    <div id="main">
      <LeftWrapper setChannelId={setChannelId} />
      <MidWrapper channelId={channelId} />
      <RightWrapper OneUser={props.OneUser} />
    </div>
  );
}

export default Main;
