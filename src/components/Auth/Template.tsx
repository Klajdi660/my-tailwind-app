import { Layout, Typography, Space } from "antd";
import { FunctionComponent } from "react";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";
import { frameImg } from "../../assets/img";

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
        <Content className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <Content className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
                <Space direction="vertical" className="mx-auto w-11/12 max-w-[460px] md:mx-0 bg-[#1c1c24] rounded-lg p-7">
                    <Title style={{ color: "#F1F2FF", fontSize: "1.875rem" }} className="text-center">
                        {title}
                    </Title>
                    <p className="text-[1.125rem] leading-[1.625rem] text-center">
                        <span className="text-richblack-100">{firstDescp}</span><br/>
                        <span className="font-edu-sa font-bold italic text-blue-100">
                            {secondDescp}
                        </span>
                    </p>
                    {formType === "signup" ? <SignUpForm /> : <LoginForm />}
                </Space>
                <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
                    <img
                        src={frameImg}
                        alt="Pattern"
                        width={558}
                        height={504}
                        loading="lazy"
                    />
                    <img 
                        src={image}
                        alt="Students"
                        width={558}
                        height={504}
                        loading="lazy"
                        className="absolute -top-4 right-4 z-10 h-[404px]"
                    />
                </div>
            </Content>
        </Content>
    );
};