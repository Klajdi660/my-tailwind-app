import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { Image } from "./UI";
import { alFlag, shFlag } from "../assets";

interface LanguageProps {
  onSelectLanguage: (language: string) => void;
}

export const Language: FunctionComponent<LanguageProps> = (props) => {
  const { onSelectLanguage } = props;
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "al",
      name: "Albanian",
      icon: alFlag,
      onClick: () => {
        navigate("");
        onSelectLanguage("al");
      },
    },
    {
      id: "sh",
      name: "English",
      icon: shFlag,
      onClick: () => {
        navigate("");
        onSelectLanguage("sh");
      },
    },
  ];

  return (
    <div className="p-2 space-y-3 min-w-[300px]">
      <ul className="list-none divide divide-divider">
        {menuItems.map((item) => (
          <li
            className="rounded cursor-pointer text-onNeutralBg hover:text-primary hover:font-semibold group hover:bg-primary-opacity"
            key={item.id}
          >
            <button className="w-full p-4 text-left" onClick={item.onClick}>
              <div className="flex gap-3 items-center">
                <Image imgUrl={item.icon} name="flag_icon" styles="w-5 h-5" />
                <p className="text-sm whitespace-nowrap">{item.name}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
