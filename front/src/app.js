// importations des modules
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Signup from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx"
import Publish from "./pages/Publish";
import PublishForm from "./pages/PublishForm";

// exportation de la fonction App
export default function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/publish" element={<Publish />} />
                <Route path="/publish/post" element={<PublishForm />} />
            </Routes>
        </div>
    );
}