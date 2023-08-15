"use client";

import LeftWrapper from './left-wrapper/page';
import MidWrapper from './mid-wrapper/page';
import RightWrapper from './right-wrapper/page';
import MyPage from '../../../pages/my-page';
import { UserInfoContainer, UserProps, MainProps} from './userType';
import './main.css';
import React, { useState } from 'react';

export default function Main(props: MainProps) {
  const [channelId, setChannelId] = useState<number | null>(null);
    return (
      <div id="main">
        { <LeftWrapper setChannelId={setChannelId}/> }
        { <MidWrapper channelId={channelId}/> }
        { <RightWrapper OneUser={props.OneUser} /> }
      </div>
    )
  }
