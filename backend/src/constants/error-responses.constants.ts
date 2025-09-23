export const ERROR = {
  COMMON: {},
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
  EVENT: {},
} as const;
