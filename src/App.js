import "./App.css";
import { Outlet } from "react-router-dom";
import { Header } from "./components";

function App() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
    </main>
  );
}

export default App;
