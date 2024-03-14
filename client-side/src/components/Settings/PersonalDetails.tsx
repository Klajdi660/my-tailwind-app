import { FunctionComponent } from "react";
import { DatePicker } from "antd";
import { PatternBg } from "../UI";

interface PersonalDetailsProps {};

export const PersonalDetails: FunctionComponent<PersonalDetailsProps> = () => {
    const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];

    return (
        <div className="relative p-4 overflow-hidden rounded xs:p-6 bg-card">
            <PatternBg />
            <div className="mb-4 header">
                <h5 className="text-lg font-semibold">Personal Details</h5>
            </div>
            <form className="w-full">
                <div className="flex flex-wrap pb-[20px]">
                    <div className="w-full md:w-1/2 px-2">
                        <label className="block text-secondary text-xs font-semibold mb-2">
                            First Name
                        </label>
                        <input 
                            className="w-full h-10 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 py-6 focus-within:border-primary outline-0" 
                            type="text" 
                            placeholder="First Name" 
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-2">
                        <label className="block text-secondary text-xs font-semibold mb-2">
                            Last Name
                        </label>
                        <input 
                            className="w-full h-10 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 py-6 focus-within:border-primary outline-0" 
                            type="text" 
                            placeholder="Last Name" 
                        />
                    </div>
                </div>
                <div className="flex flex-wrap pb-[20px]">
                    <div className="w-full md:w-1/2 px-2">
                        <label className="block text-secondary text-xs font-semibold mb-2">
                            Birthday
                        </label>
                        <DatePicker 
                            format={dateFormatList[2]}
                            showToday={false}
                            placeholder="DD-MM-YYYY"
                            className="w-full h-10"
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-2">
                        <label className="block text-secondary text-xs font-semibold mb-2">
                            Last Name
                        </label>
                        <input 
                            className="w-full h-10 bg-transparent text-sm text-onNeutralBg border border-divider rounded px-2 focus-within:border-primary outline-0" 
                            type="text" 
                            placeholder="Last Name" 
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};
