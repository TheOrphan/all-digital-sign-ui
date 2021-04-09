import {
  ApartmentOutlined,
  ContactsOutlined,
  ControlOutlined,
  DashboardOutlined,
  FolderOpenOutlined,
  HistoryOutlined,
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
  WalletOutlined,
} from "@ant-design/icons";

const adminMenus = [
  {
    key: "/dashboard",
    icon: <DashboardOutlined />,
    title: "Dashboard",
  },
  {
    key: "/repository",
    icon: <FolderOpenOutlined />,
    title: "Repositories",
  },
  {
    key: "/quota",
    icon: <WalletOutlined />,
    title: "Quota",
  },
  // {
  //   key: "/contact",
  //   icon: <ContactsOutlined />,
  //   title: "Contacts",
  // },
  {
    key: "/company",
    icon: <HomeOutlined />,
    title: "Companies",
  },
  {
    key: "/group",
    icon: <ApartmentOutlined />,
    title: "Group",
  },
  {
    key: "/log",
    icon: <HistoryOutlined />,
    title: "Log",
  },
  {
    key: "/setting",
    icon: <ControlOutlined />,
    title: "Setting",
  },
  {
    key: "/user",
    icon: <UserOutlined />,
    title: "User",
  },
  {
    key: "/user-group",
    icon: <TeamOutlined />,
    title: "Users Groups",
  },
];

export { adminMenus };
