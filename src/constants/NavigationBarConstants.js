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
        isAvailable: true
      },
      {
        name: "รายการเดินรถ DP",
        url: "/dp-schedule",
        isAvailable: true
      },
      {
        name: "หน่วยงาน",
        url: "/",
        isAvailable: false
      },
      {
        name: "รหัสค่าขนส่ง",
        url: "/",
        isAvailable: false
      },
      {
        name: "รายการเติมน้ำมัน",
        url: "/",
        isAvailable: false
      },
      {
        name: "รายการโยกรถ",
        url: "/",
        isAvailable: false
      },
      {
        name: "รายการซ่อมรถ",
        url: "/",
        isAvailable: false
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
        isAvailable: false
      },
      {
        name: "รายจ่าย",
        url: "/",
        isAvailable: false
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
        isAvailable: false
      },
      {
        name: "เสมียร",
        url: "/",
        isAvailable: false
      },
      {
        name: "รายวัน",
        url: "/",
        isAvailable: false
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
        isAvailable: false
      },
      {
        name: "ภงด1",
        url: "/",
        isAvailable: false
      },
      {
        name: "ภาษีซื้อ",
        url: "/",
        isAvailable: false
      },
      {
        name: "ภาษีขาย",
        url: "/",
        isAvailable: false
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
        isAvailable: false
      },
      {
        name: "รายละเอียดค่าขนส่ง",
        url: "/",
        isAvailable: false
      },
      {
        name: "สรุปยอดผลิตรายวัน",
        url: "/",
        isAvailable: false
      },
      {
        name: "สรุปรายคัน",
        url: "/",
        isAvailable: false
      },
      {
        name: "สรุปจำนวนเที่ยวคนขับรถโม่",
        url: "/",
        isAvailable: false
      },
      {
        name: "สรุปรายการเติมน้ำมัน",
        url: "/",
        isAvailable: false
      },
      {
        name: "สรุปเหมาน้ำมัน",
        url: "/",
        isAvailable: false
      },
      {
        name: "สรุปรายการซ่อม",
        url: "/",
        isAvailable: false
      },
      {
        name: "รายงานรายรับ- รายจ่ายบริษัท",
        url: "/",
        isAvailable: false
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
        isAvailable: false
      },
      {
        name: "รายจ่าย",
        url: "/",
        isAvailable: false
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
        isAvailable: false
      },
      {
        name: "ข้อมูลโรงงาน",
        url: "/",
        isAvailable: false
      },
      {
        name: "ข้อมูลบริษัท",
        url: "/",
        isAvailable: false
      },
      {
        name: "ข้อมูลสิทธิการเข้าดู",
        url: "/",
        isAvailable: false
      },
    ],
    icon: <SettingsRoundedIcon />,
  },
];
