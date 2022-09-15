import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

function Chat() {
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

    return () => supabase.removeSubscription(mySubscription);
  }, []);

  return (
    <div className="messChat__chat bg-white border col-sm-auto col-md-6 m-auto  d-flex flex-column justify-content-between">
      <div className="overflow-auto">
        <ul className="list-group">
          {data?.map((item, index) => (
            <li className="list-group-item" key={index}>
              {item.message}
            </li>
          ))}
        </ul>
      </div>

      <form
        className="d-flex justify-content-between input-group"
        onSubmit={handleClick}
      >
        <input
          type="text"
          className="form-control"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button
          onClick={handleClick}
          className="btn btn-outline-primary"
          type="button"
        >
          Send message
        </button>
      </form>
    </div>
  );
}

export default Chat;
