import React, { useState, useEffect } from "react";
import "./styleChat.css";
import { supabase } from "../../supabaseClient";

function Chat(props) {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const user = supabase.auth.user();

  const handleClick = async (e) => {
    e.preventDefault();
    setValue("");

    if (value) {
      const { data } = await supabase
        .from("messages")
        .insert([
          { message: value, user_uuid: user?.id, user_name: user?.email },
        ]);
      setData((prevState) => [...prevState, ...data]);
    } else {
      return null;
    }
  };

  console.log(data);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async function () {
      try {
        const { data } = await supabase.from("messages").select();
        setData(data);
        setIsLoading(false);
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

  const loading = <div>Loading...</div>;

  if (isLoading) {
    return loading;
  } else {
    return (
      <div className="messChat__chat bg-white border col-sm-auto col-xxl-4 m-auto d-flex flex-column justify-content-between">
        <div className="overflow-auto">
          <ul className="list-group">
            {data?.map((item, index) => (
              <li
                className={
                  user?.email === item?.user_name
                    ? "list-group-item d-flex flex-column text-end"
                    : "list-group-item d-flex flex-column"
                }
                key={index}
              >
                <span className="fw-bold">{item?.user_name}</span>
                <p>{item?.message}</p>
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
}

export default Chat;
