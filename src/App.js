import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserProfilePage from "./pages/UserProfilePage";
import RecipeDetailPage from "./pages/RecipeDetailPage";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="bg-gray-100">
        {" "}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
