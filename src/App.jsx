import { useState, useEffect } from "react";
import "./style.css";
import { supabase } from "../supabaseClient";

function App() {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);

  const handleClick = async (e) => {
    e.preventDefault();
    setValue("");

    if (value) {
      const { data } = await supabase
        .from("messages")
        .insert([{ message: value }]);
      setData((prevState) => [...prevState, ...data]);
    } else {
      return null;
    }
  };

  const handleClickClearChat = async () => setData([]);

  useEffect(() => {
    const fetchData = async function () {
      try {
        const { data } = await supabase.from("messages").select();
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    const mySubscription = supabase
      .from("*")
      .on("*", (payload) => {
        console.log("Change received!", payload);
        payload ? fetchData() : null;
      })
      .subscribe();
  }, []);

  return (
    <main>
      <div className="chatWrapper">
        <div className="chatWrapper__screen">
          <ul className="chatWrapper__list">
            {data?.map((item, index) => (
              <li className="chatWrapper__listItem" key={index}>
                {item.message}
              </li>
            ))}
          </ul>
        </div>
        <form className="chatWrapper__form" onSubmit={handleClick}>
          <button onClick={handleClickClearChat}>Clear Chat</button>
          <input
            type="text"
            className="chatWrapper__input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button className="chatWrapper__btn--submit" onClick={handleClick}>
            Send mess
          </button>
        </form>
      </div>
    </main>
  );
}

export default App;
