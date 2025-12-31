import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

/* Pages */
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Plants from "./pages/Plants";
import PlantDetail from "./pages/PlantDetail";

/* Virtual Tour Pages */
import VirtualTours from "./pages/VirtualTours";
import VirtualTourDetail from "./pages/VirtualTourDetail";
import AdminTours from "./pages/AdminTours";

/* Admin Pages */
import AdminDashboard from "./pages/AdminDashboard";
import ManagePlants from "./pages/ManagePlants";
import ManageUsers from "./pages/ManageUsers";

/* Navbars */
import UserNavbar from "./components/UserNavbar";
import AdminNavbar from "./components/AdminNavbar";

/* ===================== ROUTE GUARDS ===================== */

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "admin") {
    toast.error("Admin access required!");
    return <Navigate to="/login" replace />;
  }
  return children;
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("You need to login first!");
    return <Navigate to="/login" replace />;
  }
  return children;
};

/* ===================== NAVBAR WRAPPER ===================== */

const NavbarWrapper = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const hideNavbarRoutes = ["/", "/login", "/register"];
  if (hideNavbarRoutes.includes(location.pathname)) return null;
  if (!token) return null;

  return role === "admin" ? <AdminNavbar /> : <UserNavbar />;
};

/* ===================== APP ===================== */

function App() {
  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <NavbarWrapper />

      <Routes>
        {/* -------- PUBLIC -------- */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* -------- USER -------- */}
        <Route
          path="/plants"
          element={
            <ProtectedRoute>
              <Plants />
            </ProtectedRoute>
          }
        />
        <Route
          path="/plants/:id"
          element={
            <ProtectedRoute>
              <PlantDetail />
            </ProtectedRoute>
          }
        />

        {/* -------- VIRTUAL TOURS (USER + ADMIN) -------- */}
        <Route
          path="/tours"
          element={
            <ProtectedRoute>
              <VirtualTours />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tours/:id"
          element={
            <ProtectedRoute>
              <VirtualTourDetail />
            </ProtectedRoute>
          }
        />

        {/* -------- ADMIN -------- */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/plants"
          element={
            <AdminRoute>
              <ManagePlants />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/tours"
          element={
            <AdminRoute>
              <AdminTours />
            </AdminRoute>
          }
        />

        {/* -------- FALLBACK -------- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
