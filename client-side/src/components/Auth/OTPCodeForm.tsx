import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import OtpInput from "react18-input-otp";
import { Form, Progress } from "antd";
import { Button } from "../UI";
import { useForm } from "../../hooks";
import { OTPCodeFormProps } from "../../types";
import { classNames } from "../../utils";

export const OTPCodeForm: FC<OTPCodeFormProps> = (props) => {
  const { data, onSubmit, resendCodeHandler } = props;

  const { listForm } = useForm();

  const [otpFilled, setOtpFilled] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);

  const [{ btnTxt, linkTo, footerLink, footerTitle }] = listForm as any;

  const otpChangeHandler = async (code: string) => {
    setOtpFilled(code.length === 6);
  };

  useEffect(() => {
    const calculateSecondsRemaining = () => {
      const timeNow = dayjs();
      const timeExp = dayjs(data?.codeExpire);
      const diffInSeconds = timeExp.diff(timeNow, "second");
      setSecondsRemaining(diffInSeconds > 0 ? diffInSeconds : 0);
    };

    calculateSecondsRemaining();

    const intervalId = setInterval(calculateSecondsRemaining, 1000);

    return () => clearInterval(intervalId);
  }, [data?.codeExpire]);

  const progressPercent = (secondsRemaining / 60) * 100;
  const progressColor = secondsRemaining <= 15 ? "#cf1322" : "#0077B5";

  return (
    <Form className="flex flex-col gap-5" layout="vertical" onFinish={onSubmit}>
      <Form.Item name="code">
        <OtpInput
          onChange={otpChangeHandler}
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
        label={btnTxt}
        variant="contained"
        className={classNames(otpFilled && "hover:brightness-125")}
        disabled={!otpFilled}
      />
      {secondsRemaining > 0 && (
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
      <div className="flex justify-center text-sm text-onNeutralBg">
        Didn't recieve code? &nbsp;
        <div className="cursor-pointer" onClick={resendCodeHandler}>
          <p className="text-primary hover:underline underline-offset-2">
            Resend
          </p>
        </div>
      </div>
    </Form>
  );
};
