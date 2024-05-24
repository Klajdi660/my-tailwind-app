import { FunctionComponent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OtpInput from "react18-input-otp";
import dayjs from "dayjs";
import { Form, Progress } from "antd";
import { useAuthService } from "../../services";
import { useNotification, useAuth } from "../../hooks";
import { Button } from "../UI";
import { classNames } from "../../utils";
import { OtpCodeFormProps } from "../../types";

export const OTPCodeForm: FunctionComponent<OtpCodeFormProps> = (props) => {
  const { btnText, footerLink, footerTitle, linkTo } = props;

  // const { signupData } = useAuth();
  const signupData = localStorage.registerData;
  const { verifyEmail } = useAuthService();
  const [notify] = useNotification();
  const [code, setCode] = useState<string>("");
  // const [secondsLeft, setSecondsLeft] = useState<number>(0);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  // const [progressColor, setProgressColor] = useState<string>("#0077B5");
  const [otpFilled, setOtpFilled] = useState(false);

  const handleOtpChange = async (code: string) => {
    setCode(code);
    setOtpFilled(code.length === 6);
  };
  console.log("signupData :>> ", signupData);

  const { email, codeExpire } = JSON.parse(signupData).data;

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

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setSecondsLeft((prevSeconds) => {
  //       if (prevSeconds > 0) {
  //         if (prevSeconds <= 15) {
  //           setProgressColor("#cf1322");
  //         }
  //         return prevSeconds - 1;
  //       } else {
  //         clearInterval(timer);
  //         return 0;
  //       }
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

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
            // percent={(secondsLeft / 60) * 100}
            // strokeColor={progressColor}
            // format={() => (
            //   <span style={{ color: progressColor }}>{`${secondsLeft}s`}</span>
            // )}
          />
          <div className="flex justify-center text-sm text-onNeutralBg">
            {footerTitle}
            <Link to={linkTo}>
              <p className="ml-1 text-primary hover:underline underline-offset-2">
                {footerLink}
              </p>
            </Link>
          </div>
        </>
      ) : (
        <div className="flex justify-center text-sm text-onNeutralBg">
          Didn't recieve code? &nbsp;
          <Link to="#">
            <p className="text-primary hover:underline underline-offset-2">
              Resend
            </p>
          </Link>
        </div>
      )}
    </Form>
  );
};
