import { Link } from "react-router-dom";
import "./App.css";
import AllRoutes from "./AllRoutes/AllRoutes";

function App() {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/logout">Logout</Link>
      <AllRoutes />
    </>
  );
}

export default App;
