import { useState } from "react";
import { Newsletter } from "./Newsletter";

export const MailchimpForm = () => {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (formData) => {
    setStatus("sending");
    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setMessage("Message sent successfully!");
      } else {
        setStatus("error");
        setMessage("Failed to send message. Please try again later.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <Newsletter
        status={status}
        message={message}
        onValidated={handleSubmit}
      />
    </div>
  );
};
