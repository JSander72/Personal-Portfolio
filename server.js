import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import mailchimp from "@mailchimp/mailchimp_marketing";

const apiKey = process.env.MAILCHIMP_API_KEY;
const mailchimpServer = process.env.MAILCHIMP_SERVER_PREFIX || "us14"; // e.g. 'us14'
const mailchimpListId = process.env.MAILCHIMP_LIST_ID;

mailchimp.setConfig({
  apiKey,
  server: mailchimpServer,
});


dotenv.config();


const app = express();
app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"], credentials: false }));

// --- In-memory store (swap for Redis/DB in prod)
const codes = new Map(); // key: email, value: { code, expiresAt, attempts }

// Nodemailer for Outlook
const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.OUTLOOK_EMAIL,
    pass: process.env.OUTLOOK_APP_PASSWORD, 
  },
});

// Helpers
const now = () => Date.now();
const EXP_MINUTES = 10;
const MAX_ATTEMPTS = 5;



const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

const isEmail = (e) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

// 1) Request code
app.post("/contact/request-code", async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!isEmail(email)) return res.status(400).json({ ok: false, msg: "Invalid email." });

    const code = generateCode();
    const expiresAt = now() + EXP_MINUTES * 60 * 1000;
    codes.set(email.toLowerCase(), { code, expiresAt, attempts: 0 });

    await transporter.sendMail({
      from: process.env.OUTLOOK_EMAIL,
      to: email,
      subject: "Your verification code",
      text: `Your verification code is: ${code}\nThis code expires in ${EXP_MINUTES} minutes.`,
    });

    return res.json({ ok: true, msg: "Code sent." });
  } catch (err) {
    return res.status(500).json({ ok: false, msg: "Could not send code." });
  }
});

// 2) Verify code and forward message to your inbox
app.post("/contact/verify", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, message, code } = req.body || {};
    if (!firstName || !lastName || !message || !isEmail(email) || !code) {
      return res.status(400).json({ ok: false, msg: "Missing fields." });
    }

    const key = email.toLowerCase();
    const record = codes.get(key);
    if (!record) return res.status(400).json({ ok: false, msg: "No code requested for this email." });

    if (record.attempts >= MAX_ATTEMPTS) {
      codes.delete(key);
      return res.status(429).json({ ok: false, msg: "Too many attempts. Request a new code." });
    }

    if (now() > record.expiresAt) {
      codes.delete(key);
      return res.status(400).json({ ok: false, msg: "Code expired. Request a new code." });
    }

    if (record.code !== code.trim()) {
      record.attempts += 1;
      codes.set(key, record);
      return res.status(400).json({ ok: false, msg: "Incorrect code." });
    }

    // Code valid — forward the message to your Outlook inbox
    await transporter.sendMail({
      from: process.env.OUTLOOK_EMAIL,
      to: process.env.OUTLOOK_EMAIL, // your inbox
      replyTo: email,                // so you can reply directly
      subject: `New contact from ${firstName} ${lastName}`,
      text: `From: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone || "N/A"}\n\nMessage:\n${message}`,
    });

    // one-time use
    codes.delete(key);

    return res.json({ ok: true, msg: "Message sent. Thanks!" });
  } catch (err) {
    return res.status(500).json({ ok: false, msg: "Failed to send message." });
  }
});

app.listen(5000, () => console.log("API listening on :5000"));
// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    // Add email to Mailchimp audience list
    if (!mailchimpListId) throw new Error("Mailchimp List ID not set");
    const response = await mailchimp.lists.addListMember(mailchimpListId, {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: name || "Subscriber",
        MESSAGE: message || ""
      }
    });
    res.status(200).json({ success: true, mailchimp: response });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
