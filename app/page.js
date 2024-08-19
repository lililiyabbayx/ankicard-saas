import Image from "next/image";
//import getstripe from "@utilis/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Head from "next/head";
import {
  Container,
  Toolbar,
  Typography,
  AppBar,
  Button,
  Box,
  Grid,
} from "@mui/material";
export default function Home() {
  return (
    <Container>
      <Head>
        <title>Ankicard Saas</title>
        <meta name="description" content="Create flashcard from youe text!" />
      </Head>

      <AppBar
        position="static"
        sx={{
          backgroundColor: "#000000", // AppBar background color
          color: "#ffffff",
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {" "}
            Ankicard{" "}
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
      {/*Hero section */}
      <Box
        sx={{
          textAlign: "center",
          my: 6,
        }}
      >
        <Typography variant="h3">Welcome to Anki Card</Typography>{" "}
        <Typography variant="h6">
          The easist way to make flashcard with text!
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
          }}
        >
          Start Creating
        </Button>
      </Box>

      {/*Features */}
      <Box>
        <Grid container spacing={4}>
          <Grid
            item
            xs={4}
            md={3}
            sx={{ backgroundColor: "#000000", padding: 1 }}
          >
            <Typography variant="h3" component="h2" sx={{ color: "#ffffff" }}>
              Features
            </Typography>
          </Grid>
          <Grid
            item
            xs={8}
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
            </Typography>{" "}
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
      </Box>

      <Box sx={{ my: 8, textAlign: "left" }}>
        <Typography variant="h2" component="h2" textAlign="center">
          Pricing
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Box backgroundColor="#000000" sx={{ py: 4 }}>
              <Typography
                textAlign="center"
                gutterBottom
                sx={{ color: "#ffffff" }}
              >
                Free: $0{" "}
              </Typography>
              <Typography textAlign="center" sx={{ color: "#ffffff" }}>
                {" "}
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
                  display: "block", // Makes the button behave like a block element, which allows it to be centered
                  mx: "auto", // Centers the button horizontally (auto margin on the left and right)
                  my: 2, // Adds margin on the top and bottom (you can adjust this value as needed)
                }}
              >
                {" "}
                Choose
              </Button>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box backgroundColor="#000000" sx={{ py: 4 }}>
              <Typography
                textAlign="center"
                gutterBottom
                sx={{ color: "#ffffff" }}
              >
                Standard: $1{" "}
              </Typography>
              <Typography textAlign="center" sx={{ color: "#ffffff" }}>
                {" "}
                Perfect for individual
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#14ed2d", // Button background color
                  color: "#000000", // Button text color
                  "&:hover": {
                    backgroundColor: "#ffffff", // Background color on hover
                  },
                  display: "block", // Makes the button behave like a block element, which allows it to be centered
                  mx: "auto", // Centers the button horizontally (auto margin on the left and right)
                  my: 2, // Adds margin on the top and bottom (you can adjust this value as needed)
                }}
              >
                {" "}
                Choose
              </Button>
            </Box>
          </Grid>
          <Grid item xs>
            <Box backgroundColor="#000000" sx={{ py: 4 }}>
              <Typography
                textAlign="center"
                gutterBottom
                sx={{ color: "#ffffff" }}
              >
                Pro: $5{" "}
              </Typography>
              <Typography textAlign="center" sx={{ color: "#ffffff" }}>
                {" "}
                Perfect for individuals
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#14ed2d", // Button background color
                  color: "#000000", // Button text color
                  "&:hover": {
                    backgroundColor: "#ffffff", // Background color on hover
                  },
                  display: "block", // Makes the button behave like a block element, which allows it to be centered
                  mx: "auto", // Centers the button horizontally (auto margin on the left and right)
                  my: 2, // Adds margin on the top and bottom (you can adjust this value as needed)
                }}
              >
                {" "}
                Choose
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
