import {Routes, Route} from "react-router-dom"
import Home from "./pages/home/Home.jsx"
import Signup from "./pages/signup/Signup.jsx"
import Login from "./pages/login/Login.jsx"

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;