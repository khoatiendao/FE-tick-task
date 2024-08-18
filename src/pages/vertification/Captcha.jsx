import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { baseUrlUser } from "../../utils/service";
import ReCAPTCHA from "react-google-recaptcha";

const Captcha = () => {
  const [captchaToken, setCaptchaToken] = useState(null);
  const [vertificationError, setVertificationError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { tokenEmail } = useParams();
  const sitekeyCaptcha = process.env.REACT_APP_SITE_KEY_CAPTCHA;

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const handleVerify = async () => {

    if (!tokenEmail || !captchaToken) {
      setVertificationError("Captcha or token is missing");
      return;
    }

    try {
      const response = await fetch(
        `${baseUrlUser}/confirmation/${tokenEmail}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ captchaToken: captchaToken }),
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("Verification successful. Redirecting to login...");
        // navigate("/login");
      } else {
        setVertificationError("Vertification failed. Please try again");
      }
    } catch (error) {
      setVertificationError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h1>Email Verification</h1>
      <ReCAPTCHA
        sitekey="6LfFNykqAAAAAErIyMWr7nYGbfkLD94Fa0NAwfNM"
        onChange={handleCaptchaChange}
      />
      <button onClick={handleVerify}>Verify Account</button>
    </div>
  );
};

export default Captcha;
