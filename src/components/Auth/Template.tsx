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
        <Content /*className="flex justify-center items-center"*/ className="mx-auto w-11/12 justify-center items-center p-4 flex flex-col">
            {/* <Content className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12"> */}
                <Space direction="vertical" className="flex mx-auto w-11/12 max-w-[460px] md:mx-0 bg-[#1c1c24] rounded-lg p-7">
                    <Title style={{ color: "#F1F2FF", fontSize: "1.875rem" }} className="text-center">
                        {title}
                    </Title>
                    <p className="text-[1.125rem] leading-[1.625rem] text-center">
                        <span className="text-richblack-100">{description}</span>
                    </p>
                    {formType === "signup" ? <SignUpForm /> : <LoginForm />}
                </Space>
            {/* </Content> */}
        </Content>
    );
};