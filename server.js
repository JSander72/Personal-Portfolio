// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
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

// Remove Nodemailer and Outlook setup (not needed for Formspree)

// --- Health check ---
app.get("/health", (_req, res) => res.send("ok"));

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
