// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const role = localStorage.getItem("role");
  //   if (role !== "admin") {
  //     navigate("/login");
  //   }
  // }, [navigate]);



  return (  
    <> 
     <div className="admin-container" style={{ padding: "20px" }}>

      <h2>Admin Dashboard</h2>
    <div className="admin-content">
      <button onClick={() => navigate("/add")}>
        ➕ Add Movie
      </button >
      <button onClick={()=> navigate("/admin/edit")}>
      ✏️ Edit / 🗑 Delete
    </button>
    </div>
    </div>
    </>
  );
};

export default AdminDashboard;
