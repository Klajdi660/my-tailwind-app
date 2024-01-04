import { FunctionComponent } from "react";
import { FormGateway } from "./UI/FormGateway";
export const ShowApp: FunctionComponent = () => {
    return (
        <div className="h-[500px] w-[500px] bg-richblack-700 rounded-xl">
            <FormGateway/>
        </div>
    );
};
