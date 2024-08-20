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
        navigate("/login");
      } else {
        setVertificationError("Vertification failed. Please try again");
      }
    } catch (error) {
      console.log(error);
      setVertificationError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh] flex-col">
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_SITE_KEY_CAPTCHA}
          onChange={handleCaptchaChange}
        />
        <button className="mt-8 px-4 py-2 bg-midnight text-white p-2 rounded-2xl" onClick={handleVerify}>Verify Account</button>
    </div>
  );
};

export default Captcha;
