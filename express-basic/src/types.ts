export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string | null;
  email: string;
  phone: string | null;
  location: string | null;
  profileImage: string | null;
  emailVerified: boolean;
  notificationsEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Role = {
  id: number;
  name: string;
};

export type HttpResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
};
