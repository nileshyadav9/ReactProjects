/* import { useNavigate } from "react-router-dom"; */
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
/* import { useEffect } from "react"; */

function ProtectedRoute({ children }) {
  /*   const navigate = useNavigate(); */
  const { isAuthenticated } = useAuth();

  /*  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  ); */

  return isAuthenticated ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
