import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import AppLogin from "./components/login/AppLogin";
import AppHome from "./components/home/AppHome";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppLogin />} />
          <Route path="/AppHome" element={<AppHome />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

interface PrivateRouteProps {
  element: React.ReactElement;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, path }) => {
  const authContext = React.useContext(AuthContext);

  return (
    <Route
      path={path}
      element={
        authContext && authContext.authToken ? (
          element
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
