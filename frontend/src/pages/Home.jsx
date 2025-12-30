import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      {/* 🔹 TOP BAR */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          mt: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>

        <Button
          variant="contained"
          onClick={() => navigate("/signup")}
        >
          Signup
        </Button>
      </Box>

      {/* 🔹 MAIN CONTENT */}
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" gutterBottom>
          🎬 Explore Top Movies
        </Typography>

        <Typography variant="h6" color="text.secondary" mb={4}>
          Browse, search and explore top movies
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/movies")}
        >
          View Movies
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
