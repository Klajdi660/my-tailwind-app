import { FunctionComponent, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import OtpInput from "react18-input-otp";
import { Form, Progress } from "antd";
import { Button } from "../UI";
import { classNames } from "../../utils";
import { OTPCodeFormProps } from "../../types";
import { useAuthService } from "../../services";
import { useSelector } from "react-redux";

export const OTPCodeForm: FunctionComponent<OTPCodeFormProps> = (props) => {
  const { btnText, footerLink, footerTitle, linkTo } = props;
  const { registerData } = useSelector((state: any) => state.auth);
  const { verifyEmail, resendOtpCode } = useAuthService();
  const [code, setCode] = useState<string>("");
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [otpFilled, setOtpFilled] = useState(false);

  const location = useLocation();
  const { dataReg } = location.state || {};
  const { email, codeExpire } = dataReg;
  console.log("registerData :>> ", registerData);
  const handleOtpChange = async (code: string) => {
    setCode(code);
    setOtpFilled(code.length === 6);
  };

  const handleOnSubmit = async () => {
    try {
      await verifyEmail({
        code,
        email,
      });
      setCode("");
    } catch (error) {
      console.error(`Failed sending code! ${error}`);
    }
  };

  const handleResendCode = async () => {
    try {
      await resendOtpCode(dataReg);
    } catch (error) {
      console.error(`Failed to resend code! ${error}`);
    }
  };

  useEffect(() => {
    const calculateSecondsRemaining = () => {
      const timeNow = dayjs();
      const timeExp = dayjs(codeExpire);
      const diffInSeconds = timeExp.diff(timeNow, "second");
      setSecondsRemaining(diffInSeconds);
    };

    calculateSecondsRemaining();

    const intervalId = setInterval(calculateSecondsRemaining, 1000);
    return () => clearInterval(intervalId);
  }, [codeExpire]);

  const progressPercent = (secondsRemaining / 60) * 100;
  const progressColor = secondsRemaining <= 15 ? "#cf1322" : "#0077B5";

  return (
    <Form
      className="flex flex-col gap-5"
      layout="vertical"
      onFinish={handleOnSubmit}
    >
      <Form.Item>
        <OtpInput
          value={code}
          onChange={handleOtpChange}
          numInputs={6}
          separator={false}
          // isInputNum={true} only number
          shouldAutoFocus={true}
          containerStyle={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5px",
          }}
          inputStyle={{
            width: "48px",
            height: "48px",
            margin: "0 5px",
            fontSize: "18px",
            textAlign: "center",
            borderRadius: "5px",
            outline: "none",
          }}
          focusStyle={{
            border: "1px solid #0077B5",
            outline: "none",
          }}
        />
      </Form.Item>
      <Button
        type="submit"
        label={btnText}
        variant="contained"
        className={classNames(otpFilled && "hover:brightness-125")}
        disabled={!otpFilled}
      />
      {secondsRemaining > 0 ? (
        <>
          <Progress
            style={{
              display: "flex",
              justifyContent: "center",
              marginRight: "-3px",
            }}
            percent={progressPercent}
            strokeColor={progressColor}
            format={() => (
              <span
                style={{ color: progressColor }}
              >{`${secondsRemaining}s`}</span>
            )}
          />
          {/* <div className="flex justify-center text-sm text-onNeutralBg">
            {footerTitle}
            <Link to={linkTo}>
              <p className="ml-1 text-primary hover:underline underline-offset-2">
                {footerLink}
              </p>
            </Link>
          </div> */}
        </>
      ) : (
        <>
          <div className="flex justify-center text-sm text-onNeutralBg">
            Didn't recieve code? &nbsp;
            <div className="cursor-pointer" onClick={handleResendCode}>
              <p className="text-primary hover:underline underline-offset-2">
                Resend
              </p>
            </div>
          </div>
        </>
      )}
      <div className="flex justify-center text-sm text-onNeutralBg">
        {footerTitle}
        <Link to={linkTo}>
          <p className="ml-1 text-primary hover:underline underline-offset-2">
            {footerLink}
          </p>
        </Link>
      </div>
    </Form>
  );
};
