"use client";
import { CircularProgress, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Logout() {
  const [error, setError] = useState<null | string>(null);
  const router = useRouter();
  useEffect(() => {
    axios
      .get("/api/auth/sign-out")
      .then(() => {
        router.push("/");
      })
      .catch(() => {
        setError("Something Went Wrong");
      });
  }, [router]);
  return (
    <Stack
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      {error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <CircularProgress />
      )}
    </Stack>
  );
}
