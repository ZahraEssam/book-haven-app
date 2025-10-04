import { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const isValidEmail = (e) => /\S+@\S+\.\S+/.test(e);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: "error", text: "Please fill all fields." });
      return;
    }
    if (!isValidEmail(email)) {
      setStatus({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    const stored = JSON.parse(localStorage.getItem("contacts") || "[]");
    const newContact = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };
    stored.push(newContact);
    localStorage.setItem("contacts", JSON.stringify(stored));

    setStatus({ type: "success", text: "Thanks — your message was sent!" });
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="container my-4" style={{ maxWidth: 800 }}>
      <h2>Contact Us</h2>
      <p>If you have any question, suggestion or feedback — send us a message and we'll get back to you.</p>

      {status && (
        <div className={`alert ${status.type === "success" ? "alert-success" : "alert-danger"}`} >
          {status.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Full name</label>
          <input className="form-control" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>

        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea className="form-control" rows={6} value={message} onChange={e => setMessage(e.target.value)} placeholder="Write your message..." />
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-primary" type="submit">Send message</button>
          <button className="btn btn-outline-secondary" type="button" onClick={() => { setName(""); setEmail(""); setMessage(""); setStatus(null); }}>Clear</button>
        </div>
      </form>
    </div>
  );
}

export default Contact;
