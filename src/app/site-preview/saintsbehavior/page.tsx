"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useBasePath } from "@/frontend/shared/contexts/basepath-context";
import { useGetSaintsBehaviorData } from "@/frontend/admin-dashboard/api-hooks/useGetSaintsBehaviorData";

export default function Page() {
  const { data, isError } = useGetSaintsBehaviorData();
  const router = useRouter();
  const basePath = useBasePath();

  useEffect(() => {
    if (data) {
      router.replace(`${basePath}/${data[0].url}`);
    }
  }, [basePath, data, router]);
  if (isError) {
    return <div>error....</div>;
  }
  return null;
}
