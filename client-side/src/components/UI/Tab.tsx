import { FunctionComponent } from "react";
import { Space, Button } from "antd";
import { TabProps } from "../../types/user.type";

export const Tab: FunctionComponent<TabProps> = (props) => {
    const { tabData, field, setField } = props;

    return (
        <Space
            style={{
                // boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                boxShadow: "0 1px 0 0 rgba(255, 255, 255, 0.5)"
            }}
            className="flex bg-richblack-700 p-1 gap-x-1 my-3 rounded-xl max-w-max"
        >
            {tabData.map((tab: any) => (
                <Button
                    type="primary"
                    key={tab.id}
                    onClick={() => setField(tab.type)}
                    style={{ backgroundColor: field === tab.type ? "#1c1c24" : "transparent", color: field === tab.type ? "#EB6536" : "#999DAA" }}
                    className={`${ field === tab.type ? "active-button" : "inactive-button" }`}
                >
                    {tab.tabName}
                </Button> 
            ))}
        </Space>
    );
};
