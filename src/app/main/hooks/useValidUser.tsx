'use client'

import { getMyInfo } from "@/app/api/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useValidUser() {
  const router = useRouter();

  useEffect(() => {
    getMyInfo().catch((err) => {
      router.push('/login');
    });
  }, []);
}