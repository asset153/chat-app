import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./style.css";
import Chat from "./Chat/Chat";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import Header from "./Header/Header";
import PageNotFound from "./PageNotFound/PageNotFound";

const SIGNED_IN = "SIGNED_IN";
const SIGNED_OUT = "SIGNED_OUT";

function App() {
  const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      console.log(event);
      setIsLogin(event);
    });
  }, []);

  return (
    <main className="messChat bg-light">
      <div className="container-fluid">
        <div className="row">
          <BrowserRouter>
            <Header
              isLogin={isLogin}
              SIGNED_IN={SIGNED_IN}
              SIGNED_OUT={SIGNED_OUT}
            />
            <Routes>
              {isLogin === SIGNED_IN ? (
                <Route
                  path="/"
                  element={
                    <Chat
                      isLogin={isLogin}
                      SIGNED_IN={SIGNED_IN}
                      SIGNED_OUT={SIGNED_OUT}
                    />
                  }
                />
              ) : (
                <Route path="/SignIn" element={<SignIn />} />
              )}
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </main>
  );
}

export default App;
