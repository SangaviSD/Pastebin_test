import { Routes, Route } from "react-router-dom";
import CreatePaste from "./pages/CreatePaste";
import ViewPaste from "./pages/ViewPaste";
import './App.css';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CreatePaste />} />
      <Route path="/paste/:id" element={<ViewPaste />} />
    </Routes>
  );
}
