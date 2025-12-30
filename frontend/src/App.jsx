import { BrowserRouter, Routes, Route, Navigate,  } from "react-router-dom";
import './App.css'
import AllMovies from "./pages/Movie.jsx";
import Home from "./pages/Home.jsx";
import AddMovie from "./pages/Admin/addMovie.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/login.jsx";
import AdminDashboard from "./pages/Admin/Dashboard.jsx";
import EditMovie from "./pages/Admin/Edit1.jsx";
import MovieForm from "./pages/Admin/Edit2.jsx";
import { useContext } from "react";
import { AuthContext } from "../src/pages/context.jsx";
import { ToastContainer } from "react-toastify";





function App() {
  const { role } = useContext(AuthContext);
  const isLoggedIn = !!role;
  const isAdmin = role === "admin";

  

  return (
  <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />

  <Routes>
     <Route path ="/signup" element={<Signup/>} />
                <Route path ="/login" element={<Login/>} />
            <Route path ="/" element={<Home/> }/>

        <Route path ="/movies" element={isLoggedIn ?<AllMovies/> :<Navigate to={"/login"}/>} />
                <Route path ="/add" element={<AddMovie/>} />
                               

                                <Route path ="/dashborad"  element={isAdmin ?<AdminDashboard/>:<Navigate to={"/login"}/>} />
                        <Route path ="/admin/edit" element={<EditMovie/>} />
                        <Route path="/admin/movie/:id" element={isAdmin ?<MovieForm/>:<Navigate to={"/login"}/>} />





                

        


  </Routes>
  
  </BrowserRouter>
  )
}

export default App;
