"use client";

import {
  Button,
  Divider,
  Stack,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("/api/auth/sign-in", {
        login,
        password,
      });
      router.push("/admin/dashboard/site-view");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      setError("Invalid Credentials");
      setIsLoading(false);
    }
  };
  return (
    <Stack
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      bgcolor="lightgrey"
    >
      <Stack
        component="form"
        p={2}
        borderRadius={2}
        width="500px"
        gap={2}
        bgcolor="background.paper"
        onSubmit={handleLogin}
      >
        <Typography color="error">{error}</Typography>
        <TextField
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          size="medium"
          label="Login"
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          size="medium"
          label="Password"
          type={showPassword ? "text" : "password"}
          slotProps={{
            input: {
              endAdornment: (
                <IconButton onClick={() => setShowPassword((p) => !p)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            },
          }}
        />
        <Divider />
        <Button
          disabled={isLoading}
          loading={isLoading}
          type="submit"
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
}
