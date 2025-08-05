import { useAuth } from "../Context/fakeAuthContext";

function ProtectedRoute({ children }) {
  const { athenticated } = useAuth();
  return <div>{children}</div>;
}

export default ProtectedRoute;
