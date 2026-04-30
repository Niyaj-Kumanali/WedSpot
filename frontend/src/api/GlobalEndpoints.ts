const endpoints = {

    //HEALTH
    Health: "/health",

    // AUTH
    SignIn: "/auth/login",
    SignUp: "/auth/register",
    SignOut: "/auth/logout",
    ForgotPassword: "/auth/forgot-password",
    ResetPassword: "/auth/reset-password",
    VerifyToken: "/auth/verify-token",
    VerifyOtp: "/auth/verify-otp",

    // USER
    User: "/user",
    Users: "/user/users",

    // PRODUCTS
    Products: "/products",

    // CHAT
    ChatHistory: "/chat/history",
    AiDesign: "/ai/design",


    // BOOKING
    GetAllBookings: "/bookings",
    GetClientBookings: "/bookings/client",
    GetVendorBookings: "/bookings/vendor",
    CreateBooking: "/bookings",

    // VENDOR
    GetVendorService: "/services",
    GetVendorServicesByVendorId: "/services/vendor",
    GetVendorServiceByClientId: "/services/client",
    GetAllVendorServices: "/services",
    DeleteVendorService: "/services",
    UpdateVendorService: "/services",
    CreateVendorService: "/services",

}

export default endpoints