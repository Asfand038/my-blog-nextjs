import { useEffect, useRef, useState } from "react";

import Notification from "../ui/notification";
import classes from "./contact-form.module.css";

const sendContactData = async (contactData) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contactData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
};

const ContactForm = () => {
  const [notification, setNotification] = useState();

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const messageInputRef = useRef();

  useEffect(() => {
    if (notification && notification.status !== "pending") {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredMessage = messageInputRef.current.value;

    setNotification({
      title: "Sending message...",
      message: "Your message is on its way!",
      status: "pending",
    });

    try {
      await sendContactData({
        name: enteredName,
        email: enteredEmail,
        message: enteredMessage,
      });

      setNotification({
        title: "Success!",
        message: "Message sent successfully.",
        status: "success",
      });

      nameInputRef.current.value = "";
      emailInputRef.current.value = "";
      messageInputRef.current.value = "";
    } catch (error) {
      setNotification({
        title: "Error!",
        message: error.message || "Something went wrong!",
        status: "error",
      });
    }
  };

  return (
    <section className={classes.contact} onSubmit={formSubmitHandler}>
      <h1>How can I help you?</h1>
      <form className={classes.form}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input id="email" type="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input id="name" type="text" required ref={nameInputRef} />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea id="message" rows="5" ref={messageInputRef} required />
        </div>
        <div className={classes.actions}>
          <button type="submit">Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </section>
  );
};

export default ContactForm;
