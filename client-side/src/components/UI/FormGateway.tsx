import { FunctionComponent } from "react";
import { Button } from "antd";
import { facebookIcon, googleIcon, linkedinIcon } from "../../assets/img";

interface FormGatewayProps {};

export const FormGateway: FunctionComponent<FormGatewayProps> = () => {
    return (
        <div className="form-gateways">
            <Button
                className="form-gateways-btn" 
                // style={{ display: "inline-flex", alignItems: "center", justifyContent: "center"}}
                href={`http://localhost:8080/api/auth/google`}
            >
                <img src={googleIcon} alt="logo 1" />
            </Button>
            <Button className="form-gateways-btn" href={``}>
                <img src={linkedinIcon} alt="logo 2" />
            </Button>
            <Button className="form-gateways-btn" href={``}>
                <img src={facebookIcon} alt="logo 3" />
            </Button>
            <p className="text-[1.125rem] text-center mt-[24px]">
                <span className="text-richblack-100">Or</span>
            </p>
        </div>
    );
};
