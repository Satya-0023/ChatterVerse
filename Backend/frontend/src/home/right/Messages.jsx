import React, { useEffect, useRef } from "react";
import Message from "./Message.jsx";
import userGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";

function Messages() {
  const { loading, messages } = userGetMessage();

  console.log(messages);

  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto"
      style={{ minHeight: "calc(92vh - 8vh )" }}
    >
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages
          .filter((message) => message && typeof message === "object")
          .map((message) => (
            <div
              key={message._id ?? message.id ?? Math.random()}
              ref={lastMessageRef}
            >
              <Message message={message} />
            </div>
          ))
      )}

      {!loading && messages.length === 0 && (
        <div>
          <p className="text-center mt-[20%]">
            Say! Hi to start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default Messages;
