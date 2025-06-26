"use client";

import { PropsWithChildren, useEffect } from "react";
import { AdminRootLayout } from "@/frontend/admin-dashboard/components/AdminRootLayout";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loading } from "@/frontend/admin-dashboard/components/Loading";

const useGetMe = () => {
  return useQuery({
    queryKey: ["GET_ME_QUERY_KEY"],
    queryFn: async () => {
      const { data } = await axios.get("/api/auth/get-me");
      return data;
    },
  });
};

const RedirectToLogin = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/admin/login");
  }, [router]);
  return null;
};

export default function AdminLayout({ children }: PropsWithChildren) {
  const { data, isFetching } = useGetMe();

  if (isFetching) return <Loading />;
  if (!data?.user) return <RedirectToLogin />;
  return <AdminRootLayout>{children}</AdminRootLayout>;
}
