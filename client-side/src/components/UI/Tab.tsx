import { FunctionComponent } from "react";
import { Space, Button } from "antd";
import { TabProps, TabMap } from "../../types/general.type";

export const Tab: FunctionComponent<TabProps> = (props) => {
    const { tabData, field, setField } = props;

    return (
        <Space
            style={{
                boxShadow: "0 1px 0 0 rgba(255, 255, 255, 0.5)"
            }}
            className="flex p-1 gap-x-1 my-3 rounded-xl max-w-max"
            // bg-richblack-700
        >
            {tabData.map((tab: TabMap) => (
                <Button
                    type="primary"
                    key={tab.id}
                    onClick={() => setField(tab.type)}
                    style={{ backgroundColor: field === tab.type ? "#2C333F" : "transparent", color: field === tab.type ? "#EB6536" : "#999DAA" }}
                    className={`${ field === tab.type ? "active-button" : "inactive-button" }`}
                >
                    {tab.tabName}
                </Button>    
            ))}
        </Space>
    );
};
