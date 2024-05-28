import { FunctionComponent, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import OtpInput from "react18-input-otp";
import { Form, Progress } from "antd";
import { Button } from "../UI";
import { classNames } from "../../utils";
import { OTPCodeFormProps } from "../../types";
import dayjs from "dayjs";
import { useAuthService } from "../../services";

export const OTPCodeForm: FunctionComponent<OTPCodeFormProps> = (props) => {
  const { btnText, footerLink, footerTitle, linkTo } = props;

  const { username, codeExp } = useParams();
  const { verifyEmail } = useAuthService();
  const [code, setCode] = useState<string>("");
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [otpFilled, setOtpFilled] = useState(false);

  // const registerData = JSON.parse(localStorage.registerData).data;
  // const { username, codeExpire } = registerData;

  const handleOtpChange = async (code: string) => {
    setCode(code);
    setOtpFilled(code.length === 6);
  };

  const handleOnSubmit = async () => {
    try {
      await verifyEmail({
        code,
        username,
      });
      setCode("");
      // delete localStorage.registerData;
    } catch (error) {
      console.error(`Failed sending code! ${error}`);
    }
  };

  useEffect(() => {
    const calculateSecondsRemaining = () => {
      const timeNow = dayjs();
      const timeExp = dayjs(codeExp);
      const diffInSeconds = timeExp.diff(timeNow, "second");
      setSecondsRemaining(diffInSeconds);
    };

    calculateSecondsRemaining();

    const intervalId = setInterval(calculateSecondsRemaining, 1000);
    return () => clearInterval(intervalId);
  }, [codeExp]);

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
