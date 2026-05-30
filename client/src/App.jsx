import {

  Routes,
  Route

} from "react-router-dom";

import {

  Toaster

} from "react-hot-toast";

// PAGES
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Bills from "./pages/Bills";
import BillHistory from "./pages/BillHistory";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";

// ROUTE PROTECTION
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {

  return (

    <>

      {/* TOAST NOTIFICATIONS */}

      <Toaster
        position="top-right"
        toastOptions={{

          duration: 3000,

          style: {

            borderRadius: "16px",

            padding: "16px",

            fontSize: "15px"

          }

        }}
      />

      {/* ROUTES */}

      <Routes>

        {/* LOGIN */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* REGISTER */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* ADMIN ROUTES */}

        <Route
          path="/dashboard"
          element={
            <AdminRoute>

              <Dashboard />

            </AdminRoute>
          }
        />

        <Route
          path="/products"
          element={
            <AdminRoute>

              <Products />

            </AdminRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <AdminRoute>

              <Customers />

            </AdminRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <AdminRoute>

              <Reports />

            </AdminRoute>
          }
        />

        {/* ADMIN + STAFF */}

        <Route
          path="/bills"
          element={
            <ProtectedRoute>

              <Bills />

            </ProtectedRoute>
          }
        />

        <Route
          path="/bill-history"
          element={
            <ProtectedRoute>

              <BillHistory />

            </ProtectedRoute>
          }
        />

      </Routes>

    </>

  );

}

export default App;