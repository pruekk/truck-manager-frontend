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
        name: "ใบราคาค่าขนส่ง",
        url: "/transport-price",
      },
      {
        name: "รายการเดินรถ DP",
        url: "/",
      },
      {
        name: "หน่วยงาน",
        url: "/",
      },
      {
        name: "รหัสค่าขนส่ง",
        url: "/",
      },
      {
        name: "รายการเติมน้ำมัน",
        url: "/",
      },
      {
        name: "รายการโยกรถ",
        url: "/",
      },
      {
        name: "รายการซ่อมรถ",
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
      {
        name: "รายวัน",
        url: "/",
      },
    ],
    icon: <BadgeRoundedIcon />,
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
        name: "ใบปะหน้าค่าขนส่ง",
        url: "/",
      },
      {
        name: "รายละเอียดค่าขนส่ง",
        url: "/",
      },
      {
        name: "สรุปยอดผลิตรายวัน",
        url: "/",
      },
      {
        name: "สรุปรายคัน",
        url: "/",
      },
      {
        name: "สรุปจำนวนเที่ยวคนขับรถโม่",
        url: "/",
      },
      {
        name: "สรุปรายการเติมน้ำมัน",
        url: "/",
      },
      {
        name: "สรุปเหมาน้ำมัน",
        url: "/",
      },
      {
        name: "สรุปรายการซ่อม",
        url: "/",
      },
      {
        name: "รายงานรายรับ- รายจ่ายบริษัท",
        url: "/",
      },
    ],
    icon: <ContentPasteSearchRoundedIcon />,
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
    main: "ตั้งค่า",
    sub: [
      {
        name: "ข้อมูลรถโม่",
        url: "/",
      },
      {
        name: "ข้อมูลโรงงาน",
        url: "/",
      },
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
