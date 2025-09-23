export interface IUser {
  _id: string;
  email: string;
  password: string;
  name: string;
  role: "user" | "organizer";
  phone: string;
  isActive: boolean;
  organization?: {
    name: string;
    address: string;
    website?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserSignupPayload
  extends Omit<IUser, "_id" | "role" | "createdAt" | "updatedAt"> {
  role?: "user" | "organizer";
}
export interface IUserSigninPayload {
  email: string;
  password: string;
}

export interface IUserResponse extends Omit<IUser, "password" | "_id"> {
  id: string;
    isOrganizer : boolean; 

}
