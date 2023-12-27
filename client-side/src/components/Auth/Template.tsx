import { Layout, Typography, Space } from "antd";
import { FunctionComponent } from "react";
import { authFormData } from "../../data";
import { TemplateProps } from "../../types/user.type";
import { FormGateway } from "../UI/FormGateway";

const { Content } = Layout;
const { Title } = Typography;

export const Template: FunctionComponent<TemplateProps> = (props) => {
    const { title, description, formType } = props;

    return (
        <Content className="mx-auto w-12/12 justify-center items-center flex flex-col">
            <Space
                className="card-form flex mx-auto w-[100%] max-w-[520px] md:mx-0 bg-[#1c1c24] rounded-lg p-5"
                direction="vertical"
            >
                <Title style={{ color: "#F1F2FF", fontSize: "1.875rem" }} className="text-center">
                   {title}
                </Title>
                <p className="text-[1.125rem] leading-[1.625rem] text-center mb-[14px]">
                   <span className="text-richblack-100">{description}</span>
                </p>
                {(formType === "signup" || formType === "login") && <FormGateway/>}
                {authFormData[formType] || null}
            </Space>
        </Content>
    );
};
