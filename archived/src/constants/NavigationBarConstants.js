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
import DepartureBoardRoundedIcon from '@mui/icons-material/DepartureBoardRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';

import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';

import AirlineSeatReclineNormalRoundedIcon from '@mui/icons-material/AirlineSeatReclineNormalRounded';
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import EngineeringRoundedIcon from '@mui/icons-material/EngineeringRounded';

import FactoryRoundedIcon from '@mui/icons-material/FactoryRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import ForestRoundedIcon from '@mui/icons-material/ForestRounded';

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
        url: "/fuel",
        isAvailable: true,
        icon: <LocalGasStationRoundedIcon />
      },
      {
        name: "รายการโยกรถ",
        url: "/extra-fuel",
        isAvailable: true,
        icon: <MoveDownRoundedIcon />
      },
      {
        name: "รายการซ่อมรถ",
        url: "/engine-replacement",
        isAvailable: true,
        icon: <BuildRoundedIcon />
      },
      {
        name: "รายการอะไหล่",
        url: "/engine-detail",
        isAvailable: true,
        icon: <ConstructionRoundedIcon />
      },
      {
        name: "รายการร้านค้า",
        url: "/engine-store",
        isAvailable: true,
        icon: <StorefrontRoundedIcon />
      },
    ],
    icon: <LocalShippingRoundedIcon />,
  },
  {
    main: "บริษัท",
    sub: [
      {
        name: "รายได้",
        url: "/company-income",
        isAvailable: true,
        icon: <BusinessRoundedIcon />
      },
      {
        name: "รายจ่าย",
        url: "/company-expense",
        isAvailable: true,
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
        url: "/farm-income",
        isAvailable: true,
        icon: <ParkRoundedIcon />
      },
      {
        name: "รายจ่าย",
        url: "/farm-expense",
        isAvailable: true,
        icon: <PaidRoundedIcon />
      },
      {
        name: "รายการสวนปาล์ม",
        url: "/farm",
        isAvailable: true,
        icon: <ForestRoundedIcon />
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
        name: "ข้อมูลการวิ่งเที่ยว",
        url: "/trip",
        isAvailable: true,
        icon: <DepartureBoardRoundedIcon />
      },
      {
        name: "ข้อมูลโรงงาน",
        url: "/factory",
        isAvailable: true,
        icon: <FactoryRoundedIcon />
      },
      {
        name: "ข้อมูลบริษัท",
        url: "/company",
        isAvailable: true,
        icon: <BusinessRoundedIcon />
      },
      {
        name: "ข้อมูลสิทธิการเข้าดู",
        url: "/permission",
        isAvailable: true,
        icon: <AdminPanelSettingsRoundedIcon />
      },
    ],
    icon: <SettingsRoundedIcon />,
  },
];
