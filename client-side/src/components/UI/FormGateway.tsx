import { FunctionComponent } from "react";
import { Button } from "antd";
import { facebookIcon, googleIcon, linkedinIcon } from "../../assets/img";

export const FormGateway: FunctionComponent = () => {
    return (
        <div className="form-gateways">
            <Button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center"}}>
                <img src={googleIcon} alt="logo 1" />
            </Button>
            <Button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center"}}>
                <img src={linkedinIcon} alt="logo 2" />
            </Button>
            <Button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center"}}>
                <img src={facebookIcon} alt="logo 3" />
            </Button>
            <p className="text-[1.125rem] text-center mt-[24px]">
                <span className="text-richblack-100">Or</span>
            </p>
        </div>
    );
};
