import { useAppSelector } from "../../store";
import { UserCard } from "./UserCard";

export const UserCardList = () => {
  const users = useAppSelector((state) => state.usersSlice.filteredUsers);

  return (
    <div className="mx-auto flex flex-wrap gap-8 p-12">
      {users.map((user) => (
        <div key={user.id}>
          <UserCard user={user} />
        </div>
      ))}
    </div>
  );
};
