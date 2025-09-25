export const SUCCESS = {
  USER: {
    SIGNUP_SUCCESS: "User signed up successfully",
    SIGNIN_SUCCESS: "User signed in successfully",
    LOGOUT_SUCCESS: "Logout out successfully",
  },
  EVENT: {
    CREATE_SUCCESS: "Event Created Successfully",
    UPDATED: "Event Updated Successfully",
    REGISTERED: "Event Registered Successfully",
    ATTENDANCE_MARKED : "Attendance Marked",
    FOOD_SERVED : (foodType : string) => `${foodType} Served `
  },
  COMMON: {
    OK: "Ok",
  },
} as const;
