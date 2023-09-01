"use client";

import MidWrapper from './mid-wrapper/page';
import RightWrapper from './right-wrapper/page';
import { MainProps} from './userType';
import './main.css';
import React, { useState } from 'react';
import LeftWrapper from './left-wrapper/page';

function Main(props: MainProps) {
  const [channelId, setChannelId] = useState<number | null>(null);
  
  return (
    <div id="main">
      <LeftWrapper setChannelId={setChannelId} />
      <MidWrapper channelId={channelId} />
      <RightWrapper channelId={channelId}/>
    </div>
  );
}

export default Main;
