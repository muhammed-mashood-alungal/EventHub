export const ERROR = {
  USER: {
    USERNAME_TOO_SHORT: "Username must be at least 3 characters",
    INVALID_EMAIL: "Invalid email address",
    PASSWORD_TOO_SHORT: "Password must be at least 6 characters",
    PHONE_TOO_SHORT: "Phone number must be at least 10 characters",
    PHONE_TOO_LONG: "Phone number must be at most 15 characters",
    NOT_FOUND: "User not found",
    ALREADY_EXISTS: "Email already exists",
    INVALID_CREDENTIALS: "Invalid email or password",
    INACTIVE_ACCOUNT: "Account is inactive",
    INVALID_PASSWORD: "Invalid password",
  },
  ORGANIZATION: {
    NAME_REQUIRED: "Organization name is required",
    ADDRESS_REQUIRED: "Organization address is required",
    INVALID_URL_FORMAT: "Invalid URL format",
  },
  TOKEN: {
    ERROR_GENERATING_TOKEN: "Error generating token",
    INVALID_TOKEN: "Invalid token",
    TOKEN_EXPIRED: "Token has expired",
    NO_TOKEN_PROVIDED: "Token Not Provided",
    TOKEN_REVOKED: "TOken Revoked",
  },
  EVENT: {
    EVENT_NOT_FOUND: "Event Not Found",
    SEAT_FILLED: "Event Seat Filled",
    EVENT_EXISTS: "Event With Same title Exists Already for you.",
    GUEST_NAME_REQ: "Guest name is required",
    GUEST_EMAIL_REQ: "A valid guest email is required",
    ROLE_REQ: "Guest role is required",

    TITLE_REQ: "Event title is required",
    TITLE_MAX_200: "Event title must not exceed 200 characters",

    DESCRIPTION_REQ: "Event description is required",
    DESCRIPTION_MAX_1000: "Event description must not exceed 1000 characters",

    VENUE_REQ: "Event venue is required",
    VENUE_MAX_200: "Event venue must not exceed 200 characters",

    START_TIME_REQ: "Start time is required",
    END_TIME_REQ: "End time is required",
    END_TIME_AFTER_START_TIME: "End time must be after start time",

    MIN_3_SEAT: "Event capacity must be at least 3 seats",
    CAPACITY_TOO_LARGE: "Event capacity cannot exceed 100000 seats",
  },
  TICKET: {
    ALREADY_REGISTERED: "Ticket Already Registered",
    NOT_FOUND: "Ticket not found",
    ATTENDENCE_ALREADY_MARKED: "Attendance already marked",
    FOOD_SERVED_ALREADY: (foodType: string) =>
      `${foodType} Food served already for this Attendee`,
    INVALID_QR: "Invalid QR Code, Try Another One",
    INVALID_TICKET: "Invalid Ticket",
  },
} as const;
