import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Head from "next/head";
import {
  Toolbar,
  Typography,
  AppBar,
  Button,
  Box,
  Grid,
  Container,
} from "@mui/material";

export default function Home() {
  return (
    <>
      <Head>
        <title>Ankicard Saas</title>
        <meta name="description" content="Create flashcard from your text!" />
      </Head>

      <AppBar
        position="static"
        sx={{
          backgroundColor: "#000000", // AppBar background color
          color: "#ffffff",
          width: "100vw", // Full width
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Ankicard
          </Typography>

          <SignedOut>
            <Button
              href="/sign-in"
              sx={{
                backgroundColor: "#14ed2d", // Button background color
                color: "#000000", // Button text color
                "&:hover": {
                  backgroundColor: "#ffffff", // Background color on hover
                },
              }}
            >
              Login
            </Button>
            <Button
              href="/sign-up"
              sx={{
                backgroundColor: "#14ed2d", // Button background color
                color: "#000000", // Button text color
                "&:hover": {
                  backgroundColor: "#ffffff", // Background color on hover
                },
                ml: 2, // Margin left to add some space between buttons
              }}
            >
              Sign Up
            </Button>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      {/* Hero section */}
      <Box
        sx={{
          textAlign: "center",
          py: 6, // Adjust vertical padding
          width: "100vw", // Full width
          backgroundColor: "#f0f0f0", // Background color for the section
        }}
      >
        <Typography variant="h3">Welcome to Anki Card</Typography>
        <Typography variant="h6">
          The easiest way to make flashcards with text!
        </Typography>
        <Button
          variant="contained"
          href="/generate"
          sx={{
            backgroundColor: "#14ed2d", // Button background color
            color: "#000000", // Button text color
            "&:hover": {
              backgroundColor: "#ffffff", // Background color on hover
            },
            mt: 4, // Margin top to add space above the button
          }}
        >
          Start Creating
        </Button>
      </Box>

      {/* Features */}
      <Container>
        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            md={5}
            sx={{ backgroundColor: "#000000", padding: 1 }}
          >
            <Typography variant="h3" component="h2" sx={{ color: "#ffffff" }}>
              Features
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={7}
            sx={{ backgroundColor: "#14ed2d", padding: 1 }}
          >
            <Typography
              variant="h6"
              component="h2"
              textAlign="left"
              sx={{ color: "#000000" }}
            >
              Easy text input
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              textAlign="left"
              sx={{ color: "#000000" }}
            >
              Simply input your text and let the software do the rest!
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              textAlign="left"
              sx={{ color: "#000000" }}
            >
              Accessible anywhere
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Pricing */}
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h2" component="h2">
          Pricing
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Box backgroundColor="#000000" sx={{ py: 4, width: "100%" }}>
              <Typography
                textAlign="center"
                gutterBottom
                sx={{ color: "#ffffff" }}
              >
                Free: $0
              </Typography>
              <Typography textAlign="center" sx={{ color: "#ffffff" }}>
                Perfect for getting started
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#14ed2d", // Button background color
                  color: "#000000", // Button text color
                  "&:hover": {
                    backgroundColor: "#ffffff", // Background color on hover
                  },
                  display: "block",
                  mx: "auto",
                  my: 2,
                }}
              >
                Choose
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box backgroundColor="#000000" sx={{ py: 4, width: "100%" }}>
              <Typography
                textAlign="center"
                gutterBottom
                sx={{ color: "#ffffff" }}
              >
                Standard: $1
              </Typography>
              <Typography textAlign="center" sx={{ color: "#ffffff" }}>
                Perfect for individuals
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#14ed2d",
                  color: "#000000",
                  "&:hover": {
                    backgroundColor: "#ffffff",
                  },
                  display: "block",
                  mx: "auto",
                  my: 2,
                }}
              >
                Choose
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box backgroundColor="#000000" sx={{ py: 4, width: "100%" }}>
              <Typography
                textAlign="center"
                gutterBottom
                sx={{ color: "#ffffff" }}
              >
                Pro: $5
              </Typography>
              <Typography textAlign="center" sx={{ color: "#ffffff" }}>
                Perfect for individuals
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#14ed2d",
                  color: "#000000",
                  "&:hover": {
                    backgroundColor: "#ffffff",
                  },
                  display: "block",
                  mx: "auto",
                  my: 2,
                }}
              >
                Choose
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
