import "./SideBar.css";
import { useEffect, useContext } from "react";
import { MyContext } from "./MyContext.jsx";
import { v1 as uuidv1 } from "uuid";
function SideBar() {
  const {
    allThreads,
    setAllThreads,
    currThreadId,
    setNewChat,
    setPrompt,
    setReplay,
    setCurrThreadId,
    setPrevChats,
  } = useContext(MyContext);

  // To get all the threads for the sidebar when we load the app and when we change the thread
  const getAllThreads = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/thread");
      const data = await response.json();
      const filtereddata = data.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      setAllThreads(filtereddata);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currThreadId]);

  //  To create a new chat when we click on the logo button
  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReplay(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
  };

  // To get the chat history of a thread when we click on the thread in the sidebar
  const changeThread = async (newThreadId) => {
    setCurrThreadId(newThreadId);
    try {
      const response = await fetch(
        `http://localhost:8080/api/thread/${newThreadId}`,
      );
      const data = await response.json();
      setPrevChats(data.messages);
      setNewChat(false);
      setReplay(null);
    } catch (err) {
      console.log(err);
    }
  };

  // To delete a thread when we click on the trash icon of a thread in the sidebar
  const deleteThread = async (threadId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/thread/${threadId}`,
        {
          method: "DELETE",
        },
      );
     
      // Remove the deleted thread from the list
      setAllThreads((prevThreads) => prevThreads.filter((thread) => thread.threadId !== threadId));
      // If the deleted thread is the current thread, reset the chat window
      if (threadId === currThreadId) {
        setCurrThreadId(null);
        setPrevChats([]);
        setNewChat(true);
        setReplay(null);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section className="sidebar">
      <button onClick={createNewChat}>
        <img src="src/assets/blacklogo.png" alt="gpt logo" className="logo" />
        <span>
          <i className="fa-solid fa-pen-to-square"></i>
        </span>
      </button>
      <ul className="history">
        {allThreads?.map((thread, idx) => (
          <li key={idx}
           onClick={() => changeThread(thread.threadId)}
            className={thread.threadId === currThreadId ? "highlighted": " "}>
            {thread.title}
            <i
              class="fa-solid fa-trash"
              onClick={(e) => {
                e.stopPropagation();
                deleteThread(thread.threadId);
              }}
            ></i>
          </li>
        ))}
      </ul>
      <div className="sign">
        <p>
          By Darshan <i className="fa-solid fa-heart"></i>{" "}
        </p>
      </div>
    </section>
  );
}

export default SideBar;
