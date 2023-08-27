import Icons from "icons/sidebar";
import { ContactEmergencyOutlined } from "@mui/icons-material";
const index = [
  {
    title: "Dashboard",
    Icon: Icons.DashboardIcon,
    path: "/dashboard",
  },
  {
    title: "User Profile",
    Icon: Icons.UserProfileIcon,
    path: "/dashboard/user-profile",
  },
  {
    title: "update Profile",
    Icon: ContactEmergencyOutlined,
    path: "/dashboard/update-profile",
  },
  {
    title: "User Grid",
    Icon: Icons.UserGridIcon,
    path: "/dashboard/user-grid",
  },
  {
    title: "User List",
    Icon: Icons.UserManagementIcon,
    path: "/dashboard/user-list",
  },
  {
    title: "Add user",
    Icon: Icons.AddUserIcon,
    path: "/dashboard/add-user",
  },
  {
    title: "Login",
    Icon: Icons.LoginIcon,
    path: "/login",
  },
  {
    title: "Register",
    Icon: Icons.SessionsIcon,
    path: "/Register",
  },
];

export default index;
