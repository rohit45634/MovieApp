import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
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
