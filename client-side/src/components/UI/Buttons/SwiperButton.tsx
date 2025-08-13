import { FC, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../data";
import { Title, Icon } from "../../../components";
import { classNames } from "../../../utils";

interface SwiperButtonProps {
  titleName: string;
  prevRef: any;
  nextRef: any;
  isEnd: boolean;
  isBeginning: boolean;
  isCardHovered: boolean;
}

export const SwiperButton: FC<SwiperButtonProps> = (props) => {
  const { titleName, prevRef, nextRef, isEnd, isBeginning, isCardHovered } =
    props;
  const { BROWSE } = paths;

  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex_justify_between">
      <button
        type="button"
        className={classNames("flex_justify_center", isHovered && "gap-2")}
        onClick={() => navigate(BROWSE)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          whileHover={{ color: "#1f9bee" }}
          transition={{ duration: 0.3 }}
        >
          <Title name={titleName} type="small" divider={false} />
        </motion.div>
        <div className="flex_justify_center">
          {isHovered && (
            <motion.div
              animate={isHovered ? { x: 5 } : { x: 0 }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <Title
                name="Explore All"
                type="extra-small"
                divider={false}
                className="text-primary"
              />
            </motion.div>
          )}
          {(isHovered || isCardHovered) && (
            <motion.div
              animate={isHovered ? { x: 5 } : { x: 0 }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <Icon
                name="MdKeyboardArrowRight"
                size={28}
                className="text-primary"
              />
            </motion.div>
          )}
        </div>
      </button>
      <div className="flex gap-2">
        <motion.button
          ref={prevRef}
          disabled={isBeginning}
          type="button"
          whileHover={!isBeginning ? { scale: 1.1 } : {}}
          whileTap={!isBeginning ? { scale: 0.9 } : {}}
          className={classNames(
            "w-8 h-8 flex_justify_center rounded-full group transition-colors duration-500",
            isBeginning ? "bg-card" : "bg-card hover:bg-primary-opacity"
          )}
        >
          <Icon
            name="MdKeyboardArrowLeft"
            className={classNames(
              isBeginning ? "text-secondary" : "group-hover:text-primary"
            )}
          />
        </motion.button>
        <motion.button
          ref={nextRef}
          disabled={isEnd}
          type="button"
          whileHover={!isEnd ? { scale: 1.1 } : {}}
          whileTap={!isEnd ? { scale: 0.9 } : {}}
          className={classNames(
            "w-8 h-8 flex_justify_center rounded-full group transition-colors duration-500",
            isEnd ? "bg-card" : "bg-card hover:bg-primary-opacity"
          )}
        >
          <Icon
            name="MdKeyboardArrowRight"
            className={classNames(
              isEnd ? "text-secondary" : "group-hover:text-primary"
            )}
          />
        </motion.button>
      </div>
    </div>
  );
};
