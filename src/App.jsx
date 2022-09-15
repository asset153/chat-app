import React from "react";
import Chat from "./Chat/Chat";
import Header from "./Header/Header";
import "./style.css";

function App() {
  return (
    <main className="messChat bg-light">
      <Header />
      <div className="container">
        <div className="row">
          <Chat />
        </div>
      </div>
    </main>
  );
}

export default App;
