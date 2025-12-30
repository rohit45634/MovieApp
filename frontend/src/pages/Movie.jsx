import { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  TextField,
  InputAdornment,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Box, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";




const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortBy, setSortBy] = useState("");
const [order, setOrder] = useState("asc");
const navigate = useNavigate();



  useEffect(() => {
     const fetchMovies = async () => {
 const url = searchKeyword
      ? `movies-backend.up.railway.app
/movies/search?keyword=${searchKeyword}`
      :sortBy
        ? `movies-backend.up.railway.app
/movies/sorted?sortBy=${sortBy}&order=${order}`
      : `movies-backend.up.railway.app
/movies?page=${page}`;

          const res = await axios.get(url, { withCredentials: true } );

        if (searchKeyword) {
    setMovies(res.data);       
    setTotalPages(1);          
  } else {
    setMovies(res.data.movies);
    setTotalPages(res.data.totalPages);
  }

    };
    fetchMovies();
  }, [page,searchKeyword,sortBy,order]);

  //  SEARCH BUTTON CLICK
  const handleSearch = () => {
    setPage(1);      // reset pagination
      setSearchKeyword(keyword);  // 🔥 trigger search

  };
  const handleLogout = async () => {
  try {
    await axios.get(
      "movies-backend.up.railway.app/auth/logout",
      
      { withCredentials: true }
    );

    localStorage.removeItem("role");
    navigate("/login");
  } catch (err) {
    console.error("Logout failed", err);
  }
};

  return (
   <Container maxWidth="lg" sx={{ py: 4 }}>
    <Box
  sx={{
    position: "absolute",
    top: 20,
    right: 30,
  }}
>
  <Button
    variant="outlined"
    color="error"
    onClick={handleLogout}
  >
    Logout
  </Button>
</Box>
  <Typography variant="h4" textAlign="center" gutterBottom>
    All Movies
  </Typography> 
  
<div style={{ display: "flex", gap: "5px", maxWidth: "500px",margin:"10px" }}>
        <input
          type="text"
          placeholder="Search movie name..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ flex: 1, padding: "10px" }}
        />
        <button onClick={handleSearch }>Search</button>
      </div>
{/*  SORT DROPDOWN */}
<div style={{ marginTop: "15px", display: "flex", gap: "10px",  margin :"10px"}}>
  <select 
  style={{
      padding: "10px ",
      fontSize: "15px",
      height: "40px",
      borderRadius: "6px",
      cursor: "pointer"
    }}
    value={sortBy}
    onChange={(e) => {
      setSortBy(e.target.value);
      setPage(1);
    }}
  >
    <option value="">Sort By</option>
    <option value="title">Name</option>
    <option value="rating">Rating</option>
    <option value="releaseDate">Release Date</option>
  </select>

  <select   style={{  gap: "10px"}}
    value={order}
    onChange={(e) => setOrder(e.target.value)}
  >
    <option value="asc">Ascending</option>
    <option value="desc">Descending</option>
  </select>
</div>
  {/* MOVIE GRID */}
  <Grid container spacing={3}>
    {movies.map((movie) => (
      <Grid
        
        key={movie._id}
        xs={12}   // mobile → 1 card
        sm={6}    // tablet → 2 cards
        md={4}    // laptop → 3 cards
        lg={3}    // desktop → 4 cards
      >
        <Card
          sx={{
            height: "320",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* FIXED SIZE IMAGE */}
          <CardMedia
            component="img"
            image={
              
                `https://image.tmdb.org/t/p/w500${movie.posterPath}`
                
            }
            alt={movie.title}
            sx={{
              height: 360,
              objectFit: "cover",
            }}
          />

          {/* CONTENT */}
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontSize: "1rem",
                fontWeight: 600,
                height: 48,          // fixed title height
                overflow: "hidden",
              }}
            >
              {movie.title}
            </Typography>
<Typography
  variant="body2"
  color="text.secondary"
  sx={{
    height: 40,              // fixed height
    overflow: "hidden",      // hide extra text
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,      // show only 2 lines
    WebkitBoxOrient: "vertical",
    mb: 1,
  }}
>
  {movie.description}
</Typography>

            <Typography variant="body2" color="text.secondary">
              Release: {movie.releaseDate?.slice(0, 10)}
            </Typography>

            <Typography variant="body2">
              ⭐ Rating: {movie.rating}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>

  {/* PAGINATION */}
  <Box
    sx={{
      mt: 4,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 2,
      flexWrap: "wrap",   // 🔥 responsive
    }}
  >
    <Button
      variant="contained"
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
    >
      Prev
    </Button>

    <Typography>
      Page {page} of {totalPages}
    </Typography>

    <Button
      variant="contained"
      disabled={page === totalPages}
      onClick={() => setPage(page + 1)}
    >
      Next
    </Button>
  </Box>
</Container>

  );
};

export default AllMovies;
