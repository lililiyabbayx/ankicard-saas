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

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Ankicard </Typography>

          <SignedOut>
            <Button color="inherit" href="/sign-in">
              Login
            </Button>
            <Button color="inherit" href="/sign-up">
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
        <Button variant="contained" color="inherit" href="/generate">
          Start Creating
        </Button>
      </Box>

      {/*Features */}
      <Box>
        <Grid container spacing={4}>
          <Grid item xs={4} md={3}>
            <Typography variant="h3" component="h2">
              Features
            </Typography>
          </Grid>
          <Grid item xs={8} md={7}>
            <Typography variant="h6" component="h2" textAlign="left">
              Easy text input
            </Typography>{" "}
            <Typography variant="h6" component="h2" textAlign="left">
              Simply input your text and let the software do the rest!
            </Typography>
            <Typography variant="h6" component="h2" textAlign="left">
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
            <Box>
              <Typography textAlign="center" gutterBottom>
                Free: $0{" "}
              </Typography>
              <Typography textAlign="center">
                {" "}
                Perfect for getting started
              </Typography>
              <Button variant="container"> Choose</Button>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <Typography textAlign="center" gutterBottom>
                Standard: $1{" "}
              </Typography>
              <Typography textAlign="center">
                {" "}
                Perfect for individual
              </Typography>
              <Button variant="container"> Choose</Button>
            </Box>
          </Grid>
          <Grid item xs>
            <Box>
              <Typography textAlign="center" gutterBottom>
                Pro: $5{" "}
              </Typography>
              <Typography textAlign="center">
                {" "}
                Perfect for individuals
              </Typography>
              <Button variant="container"> Choose</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
