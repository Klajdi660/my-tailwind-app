import { FunctionComponent } from "react";
import { Template } from "../../components";


const VerifyEmail: FunctionComponent = () => {
    return (
      <Template
        title="Verify Email"
        description="Enter Your OTP Code"
        formType="verifyEmail"
      />
    );
  };
  
  export default VerifyEmail;