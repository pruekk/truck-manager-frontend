import ParkRoundedIcon from "@mui/icons-material/ParkRounded";
import PercentRoundedIcon from "@mui/icons-material/PercentRounded";
import ContentPasteSearchRoundedIcon from "@mui/icons-material/ContentPasteSearchRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

import LocalAtmRoundedIcon from '@mui/icons-material/LocalAtmRounded';
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import PinDropRoundedIcon from '@mui/icons-material/PinDropRounded';
import CarCrashRoundedIcon from '@mui/icons-material/CarCrashRounded';
import LocalGasStationRoundedIcon from '@mui/icons-material/LocalGasStationRounded';
import MoveDownRoundedIcon from '@mui/icons-material/MoveDownRounded';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import OilBarrelIcon from '@mui/icons-material/OilBarrel';

import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';

import AirlineSeatReclineNormalRoundedIcon from '@mui/icons-material/AirlineSeatReclineNormalRounded';
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';

import FactoryRoundedIcon from '@mui/icons-material/FactoryRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';

export const menus = [
  {
    main: "รถโม่",
    sub: [
      {
        name: "ใบราคาค่าขนส่ง",
        url: "/transport-price",
        isAvailable: true,
        icon: <LocalAtmRoundedIcon />
      },
      {
        name: "รายการเดินรถ DP",
        url: "/dp-schedule",
        isAvailable: true,
        icon: <LocalShippingRoundedIcon />
      },
      {
        name: "หน่วยงาน",
        url: "/agency",
        isAvailable: true,
        icon: <PinDropRoundedIcon />
      },
      {
        name: "รายการเปลี่ยนรถ",
        url: "/car-replacement",
        isAvailable: true,
        icon: <CarCrashRoundedIcon />
      },
      {
        name: "รายการเติมน้ำมัน",
        url: "/",
        isAvailable: false,
        icon: <LocalGasStationRoundedIcon />
      },
      {
        name: "รายการโยกรถ",
        url: "/",
        isAvailable: false,
        icon: <MoveDownRoundedIcon />
      },
      {
        name: "รายการซ่อมรถ",
        url: "/",
        isAvailable: false,
        icon: <BuildRoundedIcon />
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
        isAvailable: false,
        icon: <BusinessRoundedIcon />
      },
      {
        name: "รายจ่าย",
        url: "/",
        isAvailable: false,
        icon: <PaidRoundedIcon />
      },
    ],
    icon: <BusinessRoundedIcon />,
  },
  {
    main: "พนักงาน",
    sub: [
      {
        name: "คนขับรถโม่",
        url: "/driver",
        isAvailable: true,
        icon: <AirlineSeatReclineNormalRoundedIcon />
      },
      {
        name: "เสมียร",
        url: "/",
        isAvailable: false,
        icon: <BadgeRoundedIcon />
      },
      {
        name: "รายวัน",
        url: "/",
        isAvailable: false,
        icon: <EngineeringRoundedIcon />
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
        isAvailable: false,
        icon: <PercentRoundedIcon />
      },
      {
        name: "ภงด1",
        url: "/",
        isAvailable: false,
        icon: <PercentRoundedIcon />
      },
      {
        name: "ภาษีซื้อ",
        url: "/",
        isAvailable: false,
        icon: <PercentRoundedIcon />
      },
      {
        name: "ภาษีขาย",
        url: "/",
        isAvailable: false,
        icon: <PercentRoundedIcon />
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
        isAvailable: false,
        icon: <ContentPasteSearchRoundedIcon />
      },
      {
        name: "รายละเอียดค่าขนส่ง",
        url: "/",
        isAvailable: false,
        icon: <ContentPasteSearchRoundedIcon />
      },
      {
        name: "สรุปยอดผลิตรายวัน",
        url: "/",
        isAvailable: false,
        icon: <ContentPasteSearchRoundedIcon />
      },
      {
        name: "สรุปรายคัน",
        url: "/",
        isAvailable: false,
        icon: <ContentPasteSearchRoundedIcon />
      },
      {
        name: "สรุปจำนวนเที่ยวคนขับรถโม่",
        url: "/",
        isAvailable: false,
        icon: <ContentPasteSearchRoundedIcon />
      },
      {
        name: "สรุปรายการเติมน้ำมัน",
        url: "/",
        isAvailable: false,
        icon: <ContentPasteSearchRoundedIcon />
      },
      {
        name: "สรุปเหมาน้ำมัน",
        url: "/",
        isAvailable: false,
        icon: <ContentPasteSearchRoundedIcon />
      },
      {
        name: "สรุปรายการซ่อม",
        url: "/",
        isAvailable: false,
        icon: <ContentPasteSearchRoundedIcon />
      },
      {
        name: "รายงานรายรับ- รายจ่ายบริษัท",
        url: "/",
        isAvailable: false,
        icon: <ContentPasteSearchRoundedIcon />
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
        isAvailable: false,
        icon: <ParkRoundedIcon />
      },
      {
        name: "รายจ่าย",
        url: "/",
        isAvailable: false,
        icon: <PaidRoundedIcon />
      },
    ],
    icon: <ParkRoundedIcon />,
  },
  {
    main: "ตั้งค่า",
    sub: [
      {
        name: "ข้อมูลรถโม่",
        url: "/car-information",
        isAvailable: true,
        icon: <LocalShippingRoundedIcon />
      },
      {
        name: "ข้อมูลการให้น้ำมัน",
        url: "/oil-transaction",
        isAvailable: true,
        icon: <OilBarrelIcon />
      },
      {
        name: "ข้อมูลโรงงาน",
        url: "/",
        isAvailable: false,
        icon: <FactoryRoundedIcon />
      },
      {
        name: "ข้อมูลบริษัท",
        url: "/",
        isAvailable: false,
        icon: <BusinessRoundedIcon />
      },
      {
        name: "ข้อมูลสิทธิการเข้าดู",
        url: "/",
        isAvailable: false,
        icon: <AdminPanelSettingsRoundedIcon />
      },
    ],
    icon: <SettingsRoundedIcon />,
  },
];
