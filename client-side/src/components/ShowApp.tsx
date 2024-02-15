import { FunctionComponent } from "react";
import { FormGateway } from "./UI";

interface ShowAppProps {};

export const ShowApp: FunctionComponent<ShowAppProps> = () => {
    return (
        <div className="h-[500px] w-[500px] bg-richblack-700 rounded-xl">
            <FormGateway/>
        </div>
    );
};
