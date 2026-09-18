const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const app = express();
const port = Number(process.env.PORT || 3000);
const maxFileMb = Number(process.env.MAX_FILE_MB || 10);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxFileMb * 1024 * 1024 }
});

app.use(express.static(path.join(__dirname, "public")));

app.post("/api/send", upload.single("attachment"), async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).json({ ok: false, error: "To, Subject and Message are required." });
    }

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return res.status(500).json({ ok: false, error: "SMTP is not configured. Copy .env.example to .env and add your authorized SMTP details." });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    const mail = {
      from: process.env.FROM_EMAIL || process.env.SMTP_USER,
      to,
      subject,
      text: message
    };

    if (req.file) {
      mail.attachments = [{
        filename: req.file.originalname,
        content: req.file.buffer,
        contentType: req.file.mimetype
      }];
    }

    const info = await transporter.sendMail(mail);

    res.json({
      ok: true,
      message: "Test email submitted successfully.",
      messageId: info.messageId
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message || "Unable to send email." });
  }
});

app.listen(port, () => console.log(`Mail Testing Portal running on port ${port}`));