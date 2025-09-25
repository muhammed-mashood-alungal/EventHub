export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "user" | "organizer";
  isActive: boolean;
  organization?: {
    name: string;
    address: string;
    website?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
