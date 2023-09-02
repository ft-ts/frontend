'use client'

import { validateUser } from "@/app/api/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useValidUser() {
  const router = useRouter();

  useEffect(() => {
    validateUser().then((res) => {
      if (res.status === 200) {
        return;
      }
      router.push('/login');
    })
    .catch((err) => {
      router.push('/login');
    });
  }, []);
}