import { FunctionComponent } from "react";
import { Icon } from "../components";
import { logo } from "../assets/img";

export const Footer: FunctionComponent = () => {
    return (
        <footer className='text-white'>
            <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
            <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                <Icon 
                    imgUrl={logo} 
                    styles="w-[52px] h-[52px] bg-richblack-700" 
                />
                <p className="text-center text-sm leading-loose md:text-left">
                built_by {" "}
                <a
                    href="/test"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4"
                >
                    Rozales
                </a>
                
                . The source code is available on{" "}
                <a
                    href="github"
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4"
                >
                    GitHub
                </a>
                .
                </p>
            </div>
            </div>
        </footer>
    );
};
