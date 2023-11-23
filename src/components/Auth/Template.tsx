import { Layout, Typography, Space } from "antd";
import { FunctionComponent } from "react";
import { LoginForm } from "./LoginForm";

const { Content } = Layout;
const { Title } = Typography;

interface TemplateProps {
    title: string,
    firstDescp: string,
    secondDescp: string,
    image: any,
    formType: string,
};

export const Template: FunctionComponent<TemplateProps> = ({ 
    title,
    firstDescp,
    secondDescp,
    image,
    formType
}) => {
    return (
        <Content className="min-h-[calc(100vh-3.5rem)] mt-12">
            <Space direction="vertical" className="mx-auto w-12/12 max-w-[460px] md:mx-0 bg-[#1c1c24] rounded-lg p-7">
                <Title style={{ color: "#F1F2FF", fontSize: "1.875rem", textAlign: "center" }}>
                    {title}
                </Title>
                <p className="text-[1.125rem] leading-[1.625rem] text-center">
                <span className="text-richblack-100">{firstDescp}</span><br/>
                <span className="font-edu-sa font-bold italic text-blue-100">
                    {secondDescp}
                </span>
                </p>
                {formType === "signup" ? "" : <LoginForm />}
            </Space>
        </Content>
    );
};