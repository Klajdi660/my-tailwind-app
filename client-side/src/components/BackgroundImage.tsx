import { FunctionComponent } from "react";

interface BackgroundImageProps {
    img: string
};

type BgImage = {
    [key: string]: string; 
};

export const BackgroundImage: FunctionComponent<BackgroundImageProps> = (props) => {
    const { img } = props;

    const bg_images: BgImage = {
        "wall-1": "../assets/bgImg/wallpapers/wall-1.webp",
        "wall-2": "../assets/bgImg/wallpapers/wall-2.webp",
        "wall-3": "../assets/bgImg/wallpapers/wall-3.webp",
        "wall-4": "../assets/bgImg/wallpapers/wall-4.webp",
        "wall-5": "../assets/bgImg/wallpapers/wall-5.webp",
        "wall-6": "../assets/bgImg/wallpapers/wall-6.webp",
        "wall-7": "../assets/bgImg/wallpapers/wall-7.webp",
        "wall-8": "../assets/bgImg/wallpapers/wall-8.webp",
    };

    return (
        <div 
            style={{ 
                backgroundImage: `url(${bg_images[img]})`, 
                backgroundSize: "cover", 
                backgroundRepeat: "no-repeat", 
                backgroundPositionX: "center" 
            }} 
            className="bg-ubuntu-img absolute -z-10 top-0 right-0 overflow-hidden h-full w-full"
        />
    );
};
