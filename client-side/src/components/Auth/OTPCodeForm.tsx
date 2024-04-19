import { FunctionComponent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OtpInput from "react18-input-otp";
import { Form, Progress } from "antd";
import { Button } from "../UI";
import { classNames } from "../../utils";

interface OTPCodeFormParams {
  btnText: string;
  footerTitle: string;
  footerLink: string;
  linkTo: string;
}

export const OTPCodeForm: FunctionComponent<OTPCodeFormParams> = (props) => {
  const { btnText, footerLink, footerTitle, linkTo } = props;

  const [code, setCode] = useState<string>("");
  const [secondsLeft, setSecondsLeft] = useState<number>(60);
  const [progressColor, setProgressColor] = useState<string>("#0077B5");
  const [otpFilled, setOtpFilled] = useState(false);

  const handleOtpChange = async (code: string) => {
    setCode(code);
    setOtpFilled(code.length === 6);
  };

  const handleOnSubmit = async () => {};

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prevSeconds) => {
        if (prevSeconds > 0) {
          if (prevSeconds <= 15) {
            setProgressColor("#cf1322");
          }
          return prevSeconds - 1;
        } else {
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
      {secondsLeft > 0 ? (
        <>
          <Progress
            style={{
              display: "flex",
              justifyContent: "center",
              marginRight: "-3px",
            }}
            percent={(secondsLeft / 60) * 100}
            strokeColor={progressColor}
            format={() => (
              <span style={{ color: progressColor }}>{`${secondsLeft}s`}</span>
            )}
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
