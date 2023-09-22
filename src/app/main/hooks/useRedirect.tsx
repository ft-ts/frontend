'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * 원하는 URL로 리다이렉트하는 훅
 * @param {string} targetUrl 리다이렉트하려는 URL
 * @param {boolean} condition 리다이렉트 조건 (true일 경우 리다이렉트)
 */
export function useRedirect(targetUrl: string, condition: boolean): void {

  const router = useRouter();

  useEffect(() => {
    if (condition) { // router.isReady를 확인
      router.push(targetUrl);
    }
  }, [condition, router, targetUrl]);
}