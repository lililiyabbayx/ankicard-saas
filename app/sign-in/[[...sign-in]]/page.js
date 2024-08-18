﻿import React from "react";
import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import { SignIn } from "@clerk/nextjs";

export default function SignUpPage() {
  // The page uses Material-UI’s `Container` and `Box` components to create a centered, responsive layout. The `maxWidth=”sm”` prop on the Container ensures the content doesn’t stretch too wide on larger screens.
  return (
    <main>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Ankicard </Typography>

            <Button color="inherit" href="/sign-in">
              Login
            </Button>
            <Button color="inherit" href="/sign-up">
              Sign Up
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ textAlign: "center", my: 4 }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Sign In
          </Typography>
          <SignIn />
          {/* - The `SignIn` component from Clerk, which handles the actual sign-in process, a pre-built, customizable component that handles various authentication methods. It typically includes fields for email/username and password, as well as options for social logins or other authentication methods you’ve configured in your Clerk settings. */}
        </Box>
      </div>
    </main>
  );
}
