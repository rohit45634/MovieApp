import { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
          await axios.post("http://localhost:8080/movies", {...formData,rating: Number(formData.rating)},{withCredentials:true});

    toast.success("Movie added successfully");

    setFormData({
      title: "",
      description:"",
      rating: "",
      releaseDate: "",
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
          value={formData.releaseDate}
          onChange={handleChange}
          required
        />


        <Button type="submit" variant="contained">
          Add Movie
        </Button>
      </Box>
    </Container>
  </>);
};

export default AddMovie;
