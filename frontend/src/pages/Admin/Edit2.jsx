import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { toast } from "react-toastify";

const MovieForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    title: "",
    description: "",
    rating: "",
    releaseDate: "",
    posterPath: "",
  });

  // ✅ FETCH MOVIE FOR EDIT
  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:8080/movies/${id}`, { withCredentials: true })
        .then((res) => {
          setMovie({
            ...res.data,
            releaseDate: res.data.releaseDate?.slice(0, 10),
          });
        })
        .catch(() => toast.error("Failed to load movie"));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8080/movies/${id}`,
        {
          ...movie,
          rating: Number(movie.rating),
        },
        { withCredentials: true }
      );

      toast.success("Movie updated successfully");
      navigate("/admin/edit");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Edit Movie
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
        <TextField
          label="Title"
          name="title"
          value={movie.title}
          onChange={handleChange}
          required
        />

        <TextField
          label="Description"
          name="description"
          value={movie.description}
          onChange={handleChange}
          multiline
          rows={3}
          required
        />

        <TextField
          type="date"
          label="Release Date"
          name="releaseDate"
          value={movie.releaseDate}
          onChange={handleChange}
          required
        />

        <TextField
          label="Rating"
          name="rating"
          type="number"
          value={movie.rating}
          onChange={handleChange}
          required
        />

        <TextField
          label="Poster URL"
          name="posterPath"
          value={movie.posterPath}
          onChange={handleChange}
        />

        <Button type="submit" variant="contained">
          UPDATE MOVIE
        </Button>
      </Box>
    </Container>
  );
};

export default MovieForm;
