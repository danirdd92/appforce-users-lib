import z from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3, "Name must have be at least 3 char long"),
  email: z.string().email("Not a valid email address"),
  image: z.string(),
  location: z.string().nonempty("Address is required"),
});

export type User = z.infer<typeof userSchema>;

export function convertResponseToUsersArray(usersResponse: any[]): User[] {
  const users = usersResponse.map((user) => {
    return {
      id: user.login.uuid,
      name: `${user.name.title} ${user.name.first} ${user.name.last}`,
      email: user.email,
      image: user.picture.medium,
      location: `${user.location.street.name} ${user.location.street.number}, ${user.location.city}, ${user.location.country}`,
    };
  });

  return users;
}
