import { useContext, useState, useEffect } from "react";
import Chat from "./Chat.jsx";
import "./ChatWindow.css";
import { MyContext } from "./MyContext.jsx";
import { ScaleLoader } from "react-spinners";

function ChatWindow() {
  const {
    prompt,
    setPrompt,
    replay,
    setReplay,
    currThreadId,
    setCurrThreadId,
    prevChats,
    setPrevChats,
    setNewChat,
  } = useContext(MyContext);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getReplay = async () => {
    setLoading(true);
    setNewChat(false);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId,
      }),
    };
    try {
      const response = await fetch("http://localhost:8080/api/chat", options);
      const data = await response.json();
      setReplay(data.replay);
      console.log(data.replay);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  //Append new chat to prevChats
  useEffect(() => {
    if (prompt && replay) {
      setPrevChats((prevChats) => [
        ...prevChats,
        {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content: replay,
        },
      ]);
    }
    setPrompt("");
  }, [replay]);

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          SigmGpt<i className="fa-solid fa-angle-down"></i>{" "}
        </span>
        <div className="useIconDiv" onClick={handleProfileClick}>
          <span className="userIcon">
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>
      {isOpen && (
        <div className="dropDown">
          <div className="dropDownItem">
            <i class="fa-solid fa-gear"></i> Settings
          </div>
          <div className="dropDownItem">
            <i class="fa-solid fa-cloud-arrow-up"></i> Upgrade plan
          </div>
          <div className="dropDownItem">
            <i class="fa-solid fa-arrow-right-from-bracket"></i> Log out
          </div>
        </div>
      )}
      <Chat></Chat>
      <ScaleLoader color="#fff" loading={loading}></ScaleLoader>
      <div className="chatInput">
        <div className="inputBox">
          <input
            placeholder="ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => (e.key == "Enter" ? getReplay() : "")}
          ></input>
          <div id="submit" onClick={getReplay}>
            <i className="fa-regular fa-paper-plane"></i>
          </div>
        </div>
        <div className="info">
          <p>
            SigmaGPT can make mistakes. Check important info. See Cookie
            Preferences.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
