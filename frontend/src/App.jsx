import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

/* Pages */
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Plants from "./pages/Plants";
import PlantDetail from "./pages/PlantDetail";

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
    return <Navigate to="/login" replace />;
  }
  return children;
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

/* ===================== NAVBAR WRAPPER ===================== */

const NavbarWrapper = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ❌ NO navbar on public pages
  const hideNavbarRoutes = ["/", "/login", "/register"];
  if (hideNavbarRoutes.includes(location.pathname)) {
    return null;
  }

  // ❌ no navbar if not logged in
  if (!token) return null;

  // ✅ role-based navbar
  if (role === "admin") return <AdminNavbar />;
  return <UserNavbar />;
};

/* ===================== APP ===================== */

function App() {
  return (
    <Router>
      <NavbarWrapper />

      <Routes>
        {/* -------- PUBLIC ROUTES -------- */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* -------- USER ROUTES -------- */}
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

        {/* -------- ADMIN ROUTES -------- */}
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

        {/* -------- FALLBACK -------- */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
