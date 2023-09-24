'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useRedirect(targetUrl: string, condition: boolean): void {

  const router = useRouter();

  useEffect(() => {
    if (condition) {
      router.push(targetUrl);
    }
  }, [condition, router, targetUrl]);
}