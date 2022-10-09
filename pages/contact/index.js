import Navigation from "../../lib/components/Navigation";
import { useRef, useState } from "react";

export default function About() {
  const nameInput = useRef();
  const messageInput = useRef();
  const returnInfoInput = useRef();

  const [sendingMessage, setSendingMessage] = useState(false);

  async function submitMessageForm(e) {
    e.preventDefault();

    setSendingMessage(true);

    const message = {
      name: nameInput.current.value,
      message: messageInput.current.value,
      returnInfo: returnInfoInput.current.value,
    };

    let apiResponse = await fetch("/api/messageme", {
      method: "POST",
      body: JSON.stringify(message),
    });

    if (apiResponse.status === 200) {
      // if successful, then clear the message:
      nameInput.current.value = "";
      messageInput.current.value = "";
      returnInfoInput.current.value = "";
    }

    setSendingMessage(false);
  }

  return (
    <div>
      {sendingMessage && (
        <div className="absolute w-full h-full top-0 bg-black opacity-80">
          <div className="absolute w-full top-1/2 text-center text-white">
            Sending Message...
          </div>
        </div>
      )}
      <div className="with-navbar content-container">
        <h1></h1>

        <div>
          <div>
            Want to chat? Send me a message via the form below. It goes directly
            to my phone:
          </div>
          <form onSubmit={(e) => submitMessageForm(e)}>
            <label className="md:flex">
              <span className="block md:inline-block md:w-[200px] md:my-auto mr-10 my-6">
                Your Name:
              </span>
              <input
                className="block md:inline-block my-6 md:flex-grow w-full border-2"
                type="text"
                ref={nameInput}
                contentEditable={sendingMessage}
                required
              />
            </label>

            <label className="md:flex">
              <span className="block md:inline-block md:w-[200px] md:my-auto mr-10 my-6">
                Email or Phone #:
              </span>
              <input
                className="block md:inline-block my-6 md:flex-grow w-full border-2"
                type="text"
                ref={returnInfoInput}
                contentEditable={sendingMessage}
                required
              />
            </label>

            <label>
              <div className="my-6">Message to Me:</div>
              <textarea
                ref={messageInput}
                className="block w-full h-[200px] border-2 p-3"
                contentEditable={sendingMessage}
                required
              ></textarea>
            </label>

            <input
              className="my-6 cursor-pointer"
              type="submit"
              label="Send Message"
            />
          </form>
        </div>
      </div>
      <Navigation />
    </div>
  );
}
