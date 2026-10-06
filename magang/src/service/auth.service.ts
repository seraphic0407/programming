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
};

export const login = async (
  identifier: string,
  password: string,
): Promise<User> => {
  const response = await fetch(
    "http://localhost:3000/api/v1/auth/login/password",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    },
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message ?? "Username atau password salah");
  }

  return {
    id: result.data.id,
    username: result.data.username,

    firstName: result.data.firstName ?? result.data.firstname,

    lastName: result.data.lastName ?? result.data.lastname,

    email: result.data.email,

    phone: result.data.phone ?? null,

    location: result.data.location ?? null,

    profileImage: result.data.profileImage ?? result.data.profileimage ?? null,

    emailVerified:
      result.data.emailVerified ?? result.data.emailverified ?? false,

    notificationsEnabled:
      result.data.notificationsEnabled ??
      result.data.notificationsenabled ??
      true,
  };
};
