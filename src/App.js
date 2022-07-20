import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
function App() {
  const toastMe = () => {
    toast("Here is a toast.");
  };
  return (
    <BrowserRouter>
      <main className="flex flex-col min-h-screen">
        <header className="border-t-8 border-green-400 flex flex-col justify-center items-center gap-4 h-48">
          <h1 className="font-bold text-4xl">💡 Fast Poll</h1>
          <h3 className="font-semibold text-lg">
            Create anonymous polls for free
          </h3>
        </header>
      </main>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
