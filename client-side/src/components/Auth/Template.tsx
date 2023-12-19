import { Layout, Typography, Space } from "antd";
import { FunctionComponent } from "react";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";

const { Content } = Layout;
const { Title } = Typography;

interface TemplateProps {
    title: string,
    description: string,
    formType: string,
};

export const Template: FunctionComponent<TemplateProps> = ({ 
    title,
    description,
    formType
}) => {
    return (
        <Content className="mx-auto w-11/12 justify-center items-center flex flex-col">
            <Space direction="vertical" className="flex mx-auto w-[100%] max-w-[460px] md:mx-0 bg-[#1c1c24] rounded-lg p-5">
                <Title style={{ color: "#F1F2FF", fontSize: "1.875rem" }} className="text-center">
                    {title}
                </Title>
                <p className="text-[1.125rem] leading-[1.625rem] text-center">
                    <span className="text-richblack-100">{description}</span>
                </p>
                {formType === "signup" ? <SignUpForm /> : <LoginForm />}
            </Space>
        </Content>
    );
};
