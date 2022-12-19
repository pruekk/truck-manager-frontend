import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import ParkRoundedIcon from "@mui/icons-material/ParkRounded";
import PercentRoundedIcon from "@mui/icons-material/PercentRounded";
import ContentPasteSearchRoundedIcon from "@mui/icons-material/ContentPasteSearchRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

export const menus = [
  {
    main: "รถโม่",
    sub: [
      {
        name: "ค่าขนส่ง",
        url: "/transport-price",
      },
      {
        name: "รายการเดินรถ",
        url: "/",
      },
    ],
    icon: <LocalShippingRoundedIcon />,
  },
  {
    main: "บริษัท",
    sub: [
      {
        name: "รายได้",
        url: "/",
      },
      {
        name: "รายจ่าย",
        url: "/",
      },
    ],
    icon: <BusinessRoundedIcon />,
  },
  {
    main: "พนักงาน",
    sub: [
      {
        name: "คนขับรถโม่",
        url: "/",
      },
      {
        name: "เสมียร",
        url: "/",
      },
    ],
    icon: <BadgeRoundedIcon />,
  },
  {
    main: "สวนปาล์ม",
    sub: [
      {
        name: "รายได้",
        url: "/",
      },
      {
        name: "รายจ่าย",
        url: "/",
      },
    ],
    icon: <ParkRoundedIcon />,
  },
  {
    main: "ภาษี",
    sub: [
      {
        name: "ประกันสังคม",
        url: "/",
      },
      {
        name: "ภงด1",
        url: "/",
      },
    ],
    icon: <PercentRoundedIcon />,
  },
  {
    main: "รายงานผล",
    sub: [
      {
        name: "เหมาน้ำมัน",
        url: "/",
      },
      {
        name: "ค่าขนส่งรายเดือน",
        url: "/",
      },
    ],
    icon: <ContentPasteSearchRoundedIcon />,
  },
  {
    main: "ตั้งค่า",
    sub: [
      {
        name: "ข้อมูลบริษัท",
        url: "/",
      },
      {
        name: "ข้อมูลสิทธิการเข้าดู",
        url: "/",
      },
    ],
    icon: <SettingsRoundedIcon />,
  },
];
