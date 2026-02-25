import { type ReactNode } from "react";
<<<<<<< HEAD
import { icons } from "./iconMap";
=======
import {
    Wallet,
    ClipboardList,
    Users,
    BarChart3,
    Store,
    Search,
    FileText,
    CalendarCheck,
    Heart,
    ReceiptIndianRupee,
    UserCheck,
} from "lucide-react";
>>>>>>> f39772a (centralizing the auth logic and moving the api call to api folder)

export interface MenuItem {
    text: string;
    icon: ReactNode;
    path: string;
}

export const MENU_CONFIG: Record<string, MenuItem[]> = {
    admin: [
<<<<<<< HEAD
        { text: "All Users", icon: icons.Users, path: "/admin/users" },
        { text: "All Requests", icon: icons.Requests, path: "/admin/requests" },
        { text: "All Bookings", icon: icons.Bookings, path: "/admin/bookings" },
        { text: "Platform Revenue", icon: icons.Revenue, path: "/admin/revenue" },
        { text: "Analytics", icon: icons.Analytics, path: "/admin/analytics" },
    ],

    manager: [
        { text: "Vendors", icon: icons.Vendors, path: "/manager/vendors" },
        { text: "Requests", icon: icons.Requests, path: "/manager/requests" },
        { text: "Bookings", icon: icons.Bookings, path: "/manager/bookings" },
        { text: "Staff", icon: icons.Staff, path: "/manager/staff" },
        { text: "Reports", icon: icons.Reports, path: "/manager/reports" }
    ],

    staff: [
        { text: "Assigned Bookings", icon: icons.Bookings, path: "/staff/bookings" },
        { text: "Tasks", icon: icons.Tasks, path: "/staff/tasks" },
        { text: "Reports", icon: icons.Reports, path: "/staff/reports" }
    ],

    vendor: [
        { text: "Incoming Requests", icon: icons.File, path: "/vendor/requests" },
        { text: "My Bookings", icon: icons.Bookings, path: "/vendor/bookings" },
        { text: "Earnings", icon: icons.Earning, path: "/vendor/earnings" }
    ],

    client: [
        { text: "Browse Vendors", icon: icons.Search, path: "/client/vendors" },
        { text: "My Requests", icon: icons.File, path: "/client/requests" },
        { text: "My Bookings", icon: icons.Bookings, path: "/client/bookings" },
        { text: "Saved Vendors", icon: icons.Favorite, path: "/client/saved" }
=======
        { text: "Managers", icon: <UserCheck size={20} />, path: "/admin/managers" },
        { text: "All Users", icon: <Users size={20} />, path: "/admin/users" },
        { text: "All Requests", icon: <ClipboardList size={20} />, path: "/admin/requests" },
        { text: "All Bookings", icon: <CalendarCheck size={20} />, path: "/admin/bookings" },
        { text: "Platform Revenue", icon: <ReceiptIndianRupee size={20} />, path: "/admin/revenue" },
        { text: "Analytics", icon: <BarChart3 size={20} />, path: "/admin/analytics" },
    ],

    manager: [
        { text: "Vendors", icon: <Store size={20} />, path: "/manager/vendors" },
        { text: "Requests", icon: <ClipboardList size={20} />, path: "/manager/requests" },
        { text: "Bookings", icon: <CalendarCheck size={20} />, path: "/manager/bookings" },
        { text: "Staff", icon: <Users size={20} />, path: "/manager/staff" },
        { text: "Reports", icon: <BarChart3 size={20} />, path: "/manager/reports" }
    ],

    staff: [
        { text: "Assigned Bookings", icon: <CalendarCheck size={20} />, path: "/staff/bookings" },
        { text: "Tasks", icon: <ClipboardList size={20} />, path: "/staff/tasks" },
        { text: "Reports", icon: <FileText size={20} />, path: "/staff/reports" }
    ],

    vendor: [
        { text: "Incoming Requests", icon: <FileText size={20} />, path: "/vendor/requests" },
        { text: "My Bookings", icon: <CalendarCheck size={20} />, path: "/vendor/bookings" },
        { text: "Earnings", icon: <Wallet size={20} />, path: "/vendor/earnings" }
    ],

    client: [
        { text: "Browse Vendors", icon: <Search size={20} />, path: "/client/vendors" },
        { text: "My Requests", icon: <FileText size={20} />, path: "/client/requests" },
        { text: "My Bookings", icon: <CalendarCheck size={20} />, path: "/client/bookings" },
        { text: "Saved Vendors", icon: <Heart size={20} />, path: "/client/saved" }
>>>>>>> f39772a (centralizing the auth logic and moving the api call to api folder)
    ]
};
