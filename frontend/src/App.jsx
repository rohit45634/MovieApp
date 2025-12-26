import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import AllMovies from "./pages/Movie.jsx";
import Home from "./pages/Home.jsx";
import AddMovie from "./pages/Admin/addMovie.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/login.jsx";
import AdminDashboard from "./pages/Admin/Dashboard.jsx";
import EditMovie from "./pages/Admin/Edit1.jsx";
import MovieForm from "./pages/Admin/Edit2.jsx";

function App() {

  return (
  <BrowserRouter>
  <Routes>
            <Route path ="/" element={<Home/>} />

        <Route path ="/movies" element={<AllMovies/>} />
                <Route path ="/add" element={<AddMovie/>} />
                                <Route path ="/signup" element={<Signup/>} />
                <Route path ="/login" element={<Login/>} />
                                <Route path ="/dashborad" element={<AdminDashboard/>} />
                        <Route path ="/admin/edit" element={<EditMovie/>} />
                        <Route path="/admin/movie/:id" element={<MovieForm />} />





                

        


  </Routes>
  
  </BrowserRouter>
  )
}

export default App;
