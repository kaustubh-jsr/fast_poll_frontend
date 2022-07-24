import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="border-t-8 border-green-400 flex flex-col justify-center items-center gap-4 h-48">
      <Link to="/" className="font-bold text-4xl">
        ⚡ Fast Poll
      </Link>
      <h3 className="font-semibold text-lg">Create anonymous polls for free</h3>
    </header>
  );
};

export { Header };
