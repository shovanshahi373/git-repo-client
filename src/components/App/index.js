import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Profile } from "../";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:author/:repo" element={<Profile />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>404 page not found!</p>
            </main>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
