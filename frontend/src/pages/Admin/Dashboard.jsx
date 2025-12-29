import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 4 }}>
      {/* HEADER */}
      <Typography variant="h4" textAlign="center" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* ACTION BUTTONS */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/add")}
        >
           Add Movie
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/admin/edit")}
        >
           Edit / Delete Movies
        </Button>

        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          🚪 Logout
        </Button>
      </Box>

      {/* DASHBOARD CARDS */}
      <Grid container spacing={3}>
        {/* CARD 1 */}
        <Grid xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="180"
              image="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba"
              alt="Movies"
            />
            <CardContent>
              <Typography variant="h6">Manage Movies</Typography>
              <Typography variant="body2">
                Add, edit or delete movies in your platform.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* CARD 2 */}
        <Grid xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="180"
              image="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4"
              alt="Admin"
            />
            <CardContent>
              <Typography variant="h6">Admin Controls</Typography>
              <Typography variant="body2">
                Only admins can access and manage this data.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* CARD 3 */}
        <Grid xs={12} sm={6} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="180"
              image="https://images.unsplash.com/photo-1517602302552-471fe67acf66"
              alt="Security"
            />
            <CardContent>
              <Typography variant="h6">Secure Access</Typography>
              <Typography variant="body2">
                Role-based authentication & authorization.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
