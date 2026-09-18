# Mail Testing Portal

A simple training/testing portal that sends email through an authorized domain SMTP account.

## Requirements
- Node.js 18+
- A domain mailbox and its SMTP credentials
- Hosting that supports Node.js

## Run locally
1. Install Node.js.
2. Open this project folder in Terminal.
3. Run: `npm install`
4. Copy `.env.example` to `.env`.
5. Put your authorized SMTP host, port, username, password, and From email in `.env`.
6. Run: `npm start`
7. Open `http://localhost:3000`

## Hosting
Upload the project to a Node.js-capable host, install dependencies with `npm install`, set the environment variables from `.env.example` in the host's environment settings, and start with `npm start`.

Do not upload `.env` or expose SMTP passwords in frontend JavaScript.

The From address is intentionally controlled by the server configuration rather than the form, so the portal sends only from an authorized mailbox.