import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {/* Trang chính sẽ viết sau */}
    </Routes>
  );
}

export default App;
