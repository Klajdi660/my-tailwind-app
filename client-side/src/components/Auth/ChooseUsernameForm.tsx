import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Typography, Input } from "antd";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { genUsername } from "../../assets/img";
import { Icon } from "../UI/Icon";

const { Title } = Typography;

const ChooseUsernameForm: FunctionComponent = () => {
    const navigate = useNavigate();

    const handleOnSubmit = async (value: string) => {
        console.log('value :>> ', value);
        navigate("/update-password");
    };

    return (
        <>
            <div className="form-gateways">
                <Button className="form-gateways-btn">
                    <img src={genUsername} alt="logo 1" />
                </Button>
                <p className="text-[1.125rem] text-center mt-[24px]">
                    <span className="text-richblack-100">Or</span>
                </p>
            </div>
            <Form
                onFinish={handleOnSubmit}
                // className="mt-4"
                layout="vertical"
                initialValues={{
                    remember: false
                }}
            >
                <Form.Item 
                    name="username"
                    label={
                        <Title style={{ color: "#F1F2FF", fontSize: "0.875rem" }}>
                            Username
                        </Title>
                    }
                    rules={[
                        {
                            required: true,
                            message: "Please input your Email address!"
                        }
                    ]}
                >
                    <Input
                        placeholder="Enter email address"
                        className="form-style w-full"
                        autoComplete="username"
                    />
                </Form.Item>
                <Button
                    type="primary"
                    htmlType="submit"
                    className="form-btn bg-orange-10"
                >
                    Choose Username
                </Button>
                <Link to="/login" className="ml-auto max-w-max text-base text-start text-richblack-5">
                    <p className="mt-4 flex flex-row items-center hover:text-orange-5">
                        <HiChevronDoubleLeft className="mr-2" size={20}/>
                        Back to Login
                    </p>
                </Link>
            </Form>
        </>
    );
};

export default ChooseUsernameForm;
