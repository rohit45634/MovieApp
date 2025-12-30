import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminMovies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get(
        `https://movies-backend.up.railway.app/movies?page=${page}`, { withCredentials: true } 
      );

      setMovies(res.data.movies);
      setTotalPages(res.data.totalPages);
    };

    fetchMovies();
  }, [page]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this movie?")) return;

    await axios.delete(`https://movies-backend.up.railway.app/movies/${id}`,  { withCredentials: true }
);

    const res = await axios.get(
      `https://movies-backend.up.railway.app/movies?page=${page}`,  { withCredentials: true }

    );
    setMovies(res.data.movies);
  };

  return (
    <>
      <Container sx={{ py: 4 }}>
        <Button
          variant="outlined"
          sx={{ mb: 2 }}
          onClick={() => navigate("/dashborad")}
        >
          ⬅ Back to Dashboard
        </Button>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Admin – Manage Movies
        </Typography>

        {movies.map((movie) => (
          <Box
            key={movie._id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              mb: 2,
              border: "1px solid #ddd",
              borderRadius: 2,
            }}
          >
            <Typography>{movie.title}</Typography>

            <Box>
              <Button
                variant="outlined"
                sx={{ mr: 1 }}
                onClick={() =>
                  navigate(`/admin/movie/${movie._id}`)
                }
              >
                 Edit
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(movie._id)}
              >
                🗑 Delete
              </Button>
            </Box>
          </Box>
        ))}
      </Container>

      {/* PAGINATION */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </Button>

        <Typography>
          Page {page} of {totalPages}
        </Typography>

        <Button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </Box>
    </>
  );
};
  
export default AdminMovies;
