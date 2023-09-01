'use client'

import { useEffect } from "react";

export function useCookie() {

  const getCookie = (name: string): string | undefined => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  }

  const deleteCookie = (name: string) => {
    document.cookie = name + '=; Max-Age=-99999999;';
  }

  useEffect(() => {
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
}