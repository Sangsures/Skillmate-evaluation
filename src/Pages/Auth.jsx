import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirm, setShowRegConfirm] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const sendOtp = async () => {
    const fullPhone = phone.startsWith("+") ? phone : "+91" + phone;

    try {
      const res = await fetch("http://localhost:5000/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhone }),
      });

      const data = await res.json();

      if (data.success) {
        alert("OTP sent successfully!");
        setOtpSent(true);
      } else {
        alert("Error sending OTP: " + data.message);
      }
    } catch (err) {
      alert("Failed to send OTP.");
      console.error("Send OTP error:", err);
    }
  };

  const verifyOtp = async () => {
    const fullPhone = phone.startsWith("+") ? phone : "+91" + phone;

    try {
      const res = await fetch("http://localhost:5000/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhone, code: otp }),
      });

      const data = await res.json();

      if (data.success) {
        alert("OTP Verified!"); 

        const newUser = {
          username,
          password,
          email,
          firstName,
          lastName,
          phone: fullPhone,
        };
        localStorage.setItem("user", JSON.stringify(newUser));

        setIsLogin(true);
        setOtp("");
        setOtpSent(false);
        setFirstName("");
        setLastName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhone("");
      } else {
        alert("Invalid OTP");
      }
    } catch (err) {
      alert("Error verifying OTP.");
      console.error("Verify OTP error:", err);
    }
  };

  const handleSubmit = () => {
    if (isLogin) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      console.log("Login Attempt:", storedUser);

      if (
        storedUser &&
        loginUsername === storedUser.username &&
        loginPassword === storedUser.password
      ) {
        localStorage.setItem("isLoggedIn", "true");
        navigate("/dashboard");
      } else {
        alert("Invalid username or password!");
      }
    } else {
      if (
        !firstName ||
        !lastName ||
        !username ||
        !email ||
        !phone ||
        !password ||
        !confirmPassword
      ) {
        alert("Please fill all fields.");
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      if (!otpSent) {
        sendOtp(phone);
      }
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-black text-base focus:outline-none focus:border-orange-950 focus:ring-2 focus:ring-stone-600 transition placeholder-gray-500 hover:border-orange-600";
  const buttonClass =
    "w-full bg-orange-950 text-white py-3 rounded-lg font-semibold text-xl hover:bg-stone-600 transition";

  return (
    <div className="w-full h-screen flex items-stretch bg-gray-50">
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-white p-8">
        <h2 className="text-4xl font-bold mb-4 whitespace-pre-line">
          {isLogin ? "Welcome Back!" : "Welcome to SkillMate!"}
        </h2>
        <img
          src="https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg?semt=ais_hybrid&w=740"
          alt="Learning"
          className="w-4/5 max-w-lg h-auto object-contain mt-6"
        />
      </div>

      <div className="w-full md:w-2/5 flex flex-col justify-center mx-auto my-auto p-8 md:p-12 bg-white shadow-2xl rounded-2xl">
        <div className="w-full max-w-md mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!isLogin && otpSent) {
                verifyOtp();
              } else {
                handleSubmit();
              }
            }}
            className="space-y-8 w-full flex flex-col justify-center"
          >
            {isLogin ? (
              <>
                <input
                  type="text"
                  className={inputClass}
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
                  placeholder="Username"
                  autoComplete="username"
                />
                <div className="relative">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    autoComplete="current-password"
                    className={inputClass}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    placeholder="Password"
                  />
                  <span
                    className="absolute right-3 top-3 cursor-pointer text-gray-500"
                    onClick={() => setShowLoginPassword((s) => !s)}
                  >
                    {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <button type="submit" className={buttonClass}>
                  Log In
                </button>
              </>
            ) : (
              <>
                <div className="flex gap-2">
                  <input
                    placeholder="First Name"
                    className={inputClass + " w-1/2"}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <input
                    placeholder="Last Name"
                    className={inputClass + " w-1/2"}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <input
                  placeholder="Username"
                  className={inputClass}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className={inputClass}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="w-full">
                  <PhoneInput
                    placeholder="Phone Number"
                    defaultCountry="IN"
                    value={phone}
                    onChange={setPhone}
                    required
                    className="PhoneInput w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-black text-base transition focus-within:ring-2 focus-within:ring-stone-600 focus-within:border-orange-950 hover:border-orange-600"
                  />
                </div>
                <input
                  placeholder="Create Password"
                  type={showRegPassword ? "text" : "password"}
                  className={inputClass}
                  value={password}
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  placeholder="Confirm Password"
                  type={showRegConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  className={inputClass}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {otpSent && (
                  <input
                    placeholder="Enter OTP"
                    className={inputClass}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                )}
                <button type="submit" className={buttonClass}>
                  {otpSent ? "Verify OTP" : "Sign Up"}
                </button>
              </>
            )}
            <div className="text-center text-base mt-2">
              {isLogin ? (
                <>
                  Create New Account?{" "}
                  <span
                    className="text-blue-700 cursor-pointer hover:underline"
                    onClick={() => setIsLogin(false)}
                  >
                    Sign Up
                  </span>
                </>
              ) : (
                <>
                  Already Have An Account?{" "}
                  <span
                    className="text-blue-700 cursor-pointer hover:underline"
                    onClick={() => setIsLogin(true)}
                  >
                    Log In
                  </span>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
