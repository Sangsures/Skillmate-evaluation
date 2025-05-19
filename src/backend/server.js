const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const twilio = require("twilio");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID, PORT } = process.env;

if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_SERVICE_SID) {
  console.error("❌ Missing Twilio environment variables.");
  process.exit(1);
}

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);


const users = [];


app.post("/send-otp", async (req, res) => {
  const { phone } = req.body;
  try {
    const verification = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verifications.create({ to: phone, channel: "sms" });

    res.json({ success: verification.status === "pending" });
  } catch (error) {
    console.error("Twilio Send OTP error:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP." });
  }
});


app.post("/verify-otp", async (req, res) => {
  const { phone, code } = req.body;
  try {
    const verificationCheck = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: phone, code });

    if (verificationCheck.status === "approved") {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, message: "Invalid OTP." });
    }
  } catch (error) {
    console.error("Twilio Verify error:", error);
    res.status(500).json({ success: false, message: "Failed to verify OTP." });
  }
});

app.post("/register", (req, res) => {
  const { username, password, email, phone, firstName, lastName } = req.body;

  if (users.find((user) => user.username === username || user.phone === phone)) {
    return res.status(400).json({ success: false, message: "User already exists." });
  }

  const newUser = { username, password, email, phone, firstName, lastName };
  users.push(newUser);

  res.json({ success: true, message: "User registered successfully." });
});


app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    return res.status(400).json({ success: false, message: "Invalid username or password." });
  }

  res.json({ success: true, user });
});


app.get("/", (req, res) => {
  res.send("✅ SkillMate Auth Backend is up!");
});
const serverPort = PORT || 5000;
app.listen(serverPort, () => {
  console.log(`✅ Server running on http://localhost:${serverPort}`);
});
