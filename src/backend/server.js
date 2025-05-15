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


app.post("/verify-otp", async (req, res) => {
  const { phone, code } = req.body;
  try {
    const verificationCheck = await client.verify.v2.services(TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: phone, code });

    if (verificationCheck.status === "approved") {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Twilio Verify error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});
app.get("/", (req, res) => {
  res.send("SkillMate Auth Backend is up!");
});



app.post("/verify-otp", async (req, res) => {
    const { phone, code } = req.body;
    try {
      const verificationCheck = await client.verify.v2.services(verifySid)
        .verificationChecks.create({ to: phone, code });
  
      if (verificationCheck.status === "approved") {
        res.json({ success: true });
      } else {
        res.json({ success: false, message: "Invalid OTP" });
      }
    } catch (error) {
      console.error("Twilio Verify error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  });
  

app.listen(PORT || 5000, () => {
  console.log(`✅ Server running on http://localhost:${PORT || 5000}`);
});
