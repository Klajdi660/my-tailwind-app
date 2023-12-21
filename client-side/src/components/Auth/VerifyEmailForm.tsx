import { FunctionComponent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OtpInput from "react18-input-otp";
import { Form, Button, Progress } from "antd";

const VerifyEmailForm: FunctionComponent = () => {
    const [code, setCode] = useState<string>("");
    const [secondsLeft, setSecondsLeft] = useState<number>(60);
    const [progressColor, setProgressColor] = useState<string>('#EB6536');


    const handleOtpChange = async (code: string) => {
        setCode(code);
    };

    const handleOnSubmit = async () => {};

    useEffect(() => {
        const timer = setInterval(() => {
            setSecondsLeft((prevSeconds) => {
                if (prevSeconds > 0) {
                    if (prevSeconds <= 15) {
                        setProgressColor('#cf1322');
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
            className="mt-4 items-center flex flex-col" 
            onFinish={handleOnSubmit}
	    >
            <Form.Item>
                <OtpInput
                    value={code}
                    onChange={handleOtpChange}
                    numInputs={6}
                    separator={<span style={{ width: "10px" }}></span>}
                    // isInputNum={true} only number
                    shouldAutoFocus={true}
                    inputStyle={{
                        border: "transparent",
                        borderRadius: "8px",
                        boxShadow: "0 1px 0 0 rgba(255, 255, 255, 0.5)",
                        background: "#2C333F",
                        width: "54px",
                        height: "54px",
                        fontSize: "12px",
                        color: "#fff",
                        fontWeight: "400",
                    }}
                    focusStyle={{
                        border: "1px solid #EB6536",
                        outline: "none"
                    }}
                />
            </Form.Item>
            <Button
                className="form-btn bg-orange-10"
                type="primary"
                htmlType="submit"
            >
                Verify Email
            </Button>
            {secondsLeft > 0 ? (
                <Progress
                    percent={(secondsLeft / 60) * 100}
                    steps={6}
                    className="mt-4"
                    size={20}
                    strokeColor={progressColor}
                    format={() => (
                        <span style={{ color: progressColor }}>{`${secondsLeft}s`}</span>
                    )}
                />
            ) : (
                <div className="flex justify-center text-richblack-5 mt-4">
                    OTP code expired &nbsp;
                    <Link to="/signup">
                        <p className="hover:text-orange-5">
                            Resend it!
                        </p>
                    </Link>
                </div>
            )}
		</Form>
    );
};

export default VerifyEmailForm;
