import { Outlet, Navigate } from "react-router-dom";

const AdminPage = () => {
  const role = localStorage.getItem("role"); // get role from localStorage

  // redirect non-admins to home
  if (role !== "admin") return <Navigate to="/" />;

  return (
    <div className="min-h-screen bg-green-50 dark:bg-gray-100">
      {/* Optional: Admin sidebar/header here */}
      <Outlet /> {/* renders the matched nested admin page */}
    </div>
  );
};

export default AdminPage;
