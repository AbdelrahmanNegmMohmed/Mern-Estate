import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import About from "./Pages/About";
import Profile from "./Pages/Profille";
import Header from "./Components/Header";
import PriveRoute from "./Components/PriveRoute";
import CreateListing from "./Pages/CreateListing";
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route element={<PriveRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
