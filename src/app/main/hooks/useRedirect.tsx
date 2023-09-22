'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useRedirect(targetUrl: string, condition: boolean): void {

  const router = useRouter();

  useEffect(() => {
    if (condition) { // router.isReady를 확인
      router.push(targetUrl);
    }
  }, [condition, router, targetUrl]);
}