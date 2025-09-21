// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import morgan from "morgan";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Body parsers ---
// Mailchimp Audience webhooks POST data as application/x-www-form-urlencoded with nested keys.
// extended: true lets us parse "data[email]" into req.body.data.email
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// --- CORS only if you also serve browser endpoints; not required for webhook ---
app.use(cors({ origin: true, credentials: false }));

// Helpful request logging
app.use(morgan("dev"));
app.set("trust proxy", 1);

// --- Nodemailer (Outlook / Office 365) ---
const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.OUTLOOK_EMAIL,
    pass: process.env.OUTLOOK_APP_PASSWORD,
  },
});

// Optional: verify transporter at startup
transporter.verify().then(() => {
  console.log("SMTP ready for Outlook email:", process.env.OUTLOOK_EMAIL);
}).catch(err => {
  console.error("SMTP verification failed:", err?.message || err);
});

// --- Health check ---
app.get("/health", (_req, res) => res.send("ok"));

// ==================================================
// =============== Mailchimp Webhook =================
// ==================================================
/**
 * Configure this URL in Mailchimp:
 * Audience → Settings → Webhooks → Create New Webhook
 * URL to POST: https://YOUR-PUBLIC-DOMAIN/mailchimp/webhook?token=YOUR_TOKEN
 * Events to send: at least “Subscribes” (you can also choose Unsubscribes, Profile Updates, etc.)
 * Sources: All (or choose what you prefer)
 */
app.post("/mailchimp/webhook", async (req, res) => {
  try {
    // Simple shared-secret check to stop random posts
    const token = req.query.token;
    if (process.env.WEBHOOK_TOKEN && token !== process.env.WEBHOOK_TOKEN) {
      return res.status(403).send("forbidden");
    }

    // Mailchimp Audience webhooks typically look like:
    // type: "subscribe" | "unsubscribe" | "profile" | "cleaned" | "upemail" | "campaign"
    // data: { email, list_id, web_id, merges: { EMAIL, FNAME, LNAME, ... }, reason, ... }
    const payload = req.body || {};
    const type = payload.type || "";
    const data = payload.data || {};
    const email =
      data.email ||
      (data.merges && (data.merges.EMAIL || data.merges.email)) ||
      "";

    // Build a clean email for your inbox
    const lines = [];
    lines.push(`Event: ${type}`);
    if (data.list_id) lines.push(`List ID: ${data.list_id}`);
    if (email) lines.push(`Email: ${email}`);

    // Name (if present)
    const fname = data.merges?.FNAME || "";
    const lname = data.merges?.LNAME || "";
    if (fname || lname) lines.push(`Name: ${fname} ${lname}`.trim());

    // Common extras
    if (data.reason) lines.push(`Reason: ${data.reason}`);
    if (data.ip_opt) lines.push(`IP Opt-in: ${data.ip_opt}`);
    if (payload.fired_at) lines.push(`Fired at: ${payload.fired_at}`);
    lines.push(""); // spacer
    lines.push("Raw payload:");
    lines.push(JSON.stringify(payload, null, 2));

    const subject = `Mailchimp: ${type || "event"} — ${email || "no-email"}`;
    const text = lines.join("\n");

    // Send to your Outlook inbox
    await transporter.sendMail({
      from: process.env.OUTLOOK_EMAIL,
      to: process.env.OUTLOOK_EMAIL,
      subject,
      text,
    });

    // Mailchimp expects 200 OK on success (don’t retry endlessly)
    return res.status(200).send("ok");
  } catch (err) {
    console.error("Webhook handler error:", err?.message || err);
    // Still return 200 so Mailchimp doesn’t keep retrying forever
    return res.status(200).send("ok");
  }
});

// (Optional) Keep your existing contact endpoints here (if you use them):
// app.post("/contact", ...)
// app.post("/contact/request-code", ...)
// app.post("/contact/verify", ...)

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
