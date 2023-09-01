'use client'

import React, { useEffect } from 'react';
import LeftWrapper from './left-wrapper/page';
import MidWrapper from './mid-wrapper/page';
import RightWrapper from './right-wrapper/page';
import './main.css';

function Main() {

    useEffect(() => {
        const getCookie = (name: string): string | undefined => {
            const value = "; " + document.cookie;
            const parts = value.split("; " + name + "=");
            if (parts.length === 2) return parts.pop()?.split(";").shift();
        }

        const deleteCookie = (name: string) => {
            document.cookie = name + '=; Max-Age=-99999999;'; 
        }

        const accessToken = getCookie('accessToken');
        const refreshToken = getCookie('refreshToken');

        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            deleteCookie('accessToken');
        }
        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
            deleteCookie('refreshToken');
        }
    }, []); 

    return (
        <div id="main">
            <LeftWrapper />
            <MidWrapper />
            <RightWrapper />
        </div>
    );
}

export default Main;


