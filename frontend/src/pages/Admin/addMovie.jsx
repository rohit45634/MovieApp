import { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
          const navigate =useNavigate()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rating: "",
    releaseDate: "",
    posterPath: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  //prevent page reload 

try {
          await axios.post("http://localhost:8080/movies", formData,{withCredentials:true});

    alert("Movie added successfully");

    setFormData({
      title: "",
      description: "",
      rating: "",
      releaseDate: "",
      posterPath: ""
    });

          
} catch (error) {
console.log(error)
          
}
   
  };

  return (<>
    <Container maxWidth="sm" sx={{ py: 4 }}>
          
              <Button variant="outlined"onClick={() => navigate(-1)}>
      ⬅ Back
    </Button>
      <Typography variant="h4" textAlign="center" gutterBottom>

       
        Add Movie (Admin)
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
          required
        />

        <TextField
          label="Rating"
          name="rating"
          type="number"
          value={formData.rating}
          onChange={handleChange}
          required
        />

        <TextField
          label="Release Date"
          name="releaseDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.releaseDate}
          onChange={handleChange}
          required
        />

       

        <TextField
          label="Poster URL"
          name="posterPath"
          value={formData.posterPath}
          onChange={handleChange}
        />

        <Button type="submit" variant="contained">
          Add Movie
        </Button>
      </Box>
    </Container>
  </>);
};

export default AddMovie;
