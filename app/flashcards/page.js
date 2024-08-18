"use client"; // Add this directive at the top of your file

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  writeBatch,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import {
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  AppBar,
  Toolbar,
  CircularProgress,
} from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useSearchParams, useRouter } from "next/navigation";

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [collections, setCollections] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [editCollectionId, setEditCollectionId] = useState(null);
  const [newCollectionName, setNewCollectionName] = useState("");

  useEffect(() => {
    async function getCollections() {
      if (!user) {
        return;
      }
      const userDocRef = doc(collection(db, "users"), user.id);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const collectionsWithId = (data.flashcards || []).map(
          (collection, index) => ({
            ...collection,
            id: collection.id || index, // Ensure there's a unique ID
          })
        );
        setCollections(collectionsWithId);
      }
    }
    getCollections();
  }, [user]);

  useEffect(() => {
    async function getFlashcards() {
      if (!search || !user) {
        return;
      }
      const colRef = collection(doc(collection(db, "users"), user.id), search);
      const docs = await getDocs(colRef);
      const flashcards = [];

      docs.forEach((doc) => {
        flashcards.push({ id: doc.id, ...doc.data() });
      });
      setFlashcards(flashcards);
    }
    getFlashcards();
  }, [user, search]);

  const handleCollectionClick = (name) => {
    router.push(`/flashcards?id=${name}`);
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredCollections = collections.filter((collection) =>
    collection.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (id) => {
    const collectionToEdit = collections.find(
      (collection) => collection.id === id
    );
    if (collectionToEdit) {
      setEditCollectionId(id);
      setNewCollectionName(collectionToEdit.name);
    }
  };

  const handleSaveEdit = async () => {
    if (!newCollectionName) {
      alert("Please enter a new name");
      return;
    }

    const userDocRef = doc(collection(db, "users"), user.id);
    const batch = writeBatch(db);

    const updatedCollections = collections.map((collection) =>
      collection.id === editCollectionId
        ? { ...collection, name: newCollectionName }
        : collection
    );
    batch.set(userDocRef, { flashcards: updatedCollections }, { merge: true });

    await batch.commit();
    setCollections(updatedCollections);
    setEditCollectionId(null);
    setNewCollectionName("");
  };

  const handleCancelEdit = () => {
    setEditCollectionId(null);
    setNewCollectionName("");
  };

  const handleDelete = async (id) => {
    const userDocRef = doc(collection(db, "users"), user.id);
    const batch = writeBatch(db);

    const updatedCollections = collections.filter(
      (collection) => collection.id !== id
    );
    batch.set(userDocRef, { flashcards: updatedCollections }, { merge: true });

    await batch.commit();
    setCollections(updatedCollections);
  };

  if (!isLoaded || !isSignedIn) {
    return <></>;
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Ankicard</Typography>
          <Box sx={{ flexGrow: 1 }} />
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

          <Button color="inherit" onClick={() => router.push("/flashcards")}>
            Collections
          </Button>
          <Button color="inherit" onClick={() => router.push("/generate")}>
            Generate
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md">
        {!search ? (
          <Box
            sx={{
              mt: 4,
              mb: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Flashcard Collections</Typography>
            {/* Search Box */}
            <TextField
              label="Search Collections"
              variant="outlined"
              fullWidth
              sx={{ mt: 3, mb: 3 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {editCollectionId === null ? (
              <Grid container spacing={3} sx={{ mt: 4 }}>
                {filteredCollections.map((collection) => (
                  <Grid item xs={12} sm={6} md={4} key={collection.id}>
                    <Card>
                      <CardActionArea
                        onClick={() => handleCollectionClick(collection.name)}
                      >
                        <CardContent>
                          <Typography variant="h5" component="div">
                            {collection.name}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button onClick={() => handleEdit(collection.id)}>
                          Edit
                        </Button>
                        <Button onClick={() => handleDelete(collection.id)}>
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box
                sx={{
                  mt: 4,
                  mb: 6,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6">Edit Collection Name</Typography>
                <TextField
                  label="New Collection Name"
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 3, mb: 3 }}
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                />
                <Button
                  onClick={handleSaveEdit}
                  color="primary"
                  variant="contained"
                >
                  Save
                </Button>
                <Button
                  onClick={handleCancelEdit}
                  color="secondary"
                  variant="contained"
                  sx={{ ml: 2 }}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Box>
        ) : (
          <Container maxWidth="100vw">
            <Grid container spacing={3} sx={{ mt: 4 }}>
              {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardActionArea onClick={() => handleCardClick(index)}>
                      <CardContent
                        sx={{ background: "linear-gradient(#FFFFFF, #FFFFFF)" }}
                      >
                        <Box
                          sx={{
                            perspective: "1000px",
                            "& > div": {
                              transition: "transform 0.6s",
                              transformStyle: "preserve-3d",
                              position: "relative",
                              width: "100%",
                              height: "200px",
                              transform: flipped[index]
                                ? "rotateY(180deg)"
                                : "rotateY(0deg)",
                            },
                            "& > div > div": {
                              position: "absolute",
                              width: "100%",
                              height: "200px",
                              backfaceVisibility: "hidden",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              padding: 2,
                              boxSizing: "border-box",
                            },
                            "& > div > div:nth-of-type(1)": {
                              visibility: flipped[index] ? "hidden" : "visible",
                            },
                            "& > div > div:nth-of-type(2)": {
                              transform: "rotateY(180deg)",
                              visibility: flipped[index] ? "visible" : "hidden",
                            },
                          }}
                        >
                          <div>
                            <div>
                              <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                  fontSize: "1.0rem",
                                  background:
                                    "linear-gradient(#FFFFFF, #FFFFFF)",
                                }}
                              >
                                {flashcard.front}
                              </Typography>
                            </div>
                            <div>
                              <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                  fontSize: "1.0rem",
                                  background:
                                    "linear-gradient(#FFFFFF, #FFFFFF)",
                                }}
                              >
                                {flashcard.back}
                              </Typography>
                            </div>
                          </div>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        )}
      </Container>
    </>
  );
}
