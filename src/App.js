import logo from "./logo.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Header } from "./components";
import { Home } from "./pages";

function App() {
  const toastMe = () => {
    toast("Here is a toast.");
  };
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </main>
  );
}

export default App;
