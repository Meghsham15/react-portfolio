import Images from "./Images";
import nextjsIcon from "./icons/nextjs.svg";
import jstsIcon from "./icons/jsts.svg";
import deploymentIcon from "./icons/deployment.svg";
import chatgptIcon from "./icons/chatgpt.svg";

const skills = [
    {
        id: "fadeRight1",
        img: deploymentIcon,
        name: "Cloud Deployment",
        percent: 90
    },
    {
        id: "fadeUp1",
        img: jstsIcon,
        name: "JS/TS",
        percent: 90
    },
    {
        id: "fadeLeft1",
        img: nextjsIcon,
        name: "Next.js",
        percent: 90
    },
    {
        id: "fadeRight2",
        img: Images.icp,
        name: "ICP Blockchain",
        percent: 40
    },
    {
        id: "fadeUp2",
        img: Images.nodejs,
        name: "Node JS",
        percent: 90
    },
    {
        id: "fadeLeft2",
        img: Images.mongodb,
        name: "Mongodb",
        percent: 90
    },
    {
        id: "fadeRight3",
        img: Images.reactjs,
        name: "ReactJs",
        percent: 90
    },
    {
        id: "fadeUp3",
        img: Images.restapi,
        name: "Rest API",
        percent: 90
    },
    {
        id: "fadeLeft3",
        img: chatgptIcon,
        name: "AI Integration",
        percent: 90
    },
];

export default skills;
