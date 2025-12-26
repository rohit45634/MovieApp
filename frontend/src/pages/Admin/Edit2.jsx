import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

const MovieForm = () => {
  const { id } = useParams();          //  key
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    title: "",
    rating: "",
    releaseDate: "",
   
  });

  // fetch movie only in edit mode
  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:8080/movies/${id}`)
        .then((res) => setMovie(res.data));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit) {
      await axios.patch(
        `http://localhost:8080/movies/${id}`,
        
        {
      title: movie.title,
      releaseDate: movie.releaseDate,
      
      rating: Number(movie.rating),

    },  { withCredentials: true }

      );
    } else {
      await axios.post(
        "http://localhost:8080/movies",
        movie,  { withCredentials: true }

      );
    }

    navigate("/admin/edit");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        {isEdit ? "Edit Movie" : "Add Movie"}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
       <TextField
  label="Title"
  name="title"
  value={movie.title}
  onChange={handleChange}
/>

<TextField
  type="date"
  label="Release Date"
  name="releaseDate"
  value={movie.releaseDate?.slice(0, 10)}
  onChange={handleChange}
  InputLabelProps={{ shrink: true }}
/>

<TextField
  label="Rating"
  name="rating"
  value={movie.rating}
  onChange={handleChange}
/>

        <Button type="submit" variant="contained">
          {isEdit ? "UPDATE MOVIE" : "ADD MOVIE"}
        </Button>
      </Box>
    </Container>
  );
};

export default MovieForm;
