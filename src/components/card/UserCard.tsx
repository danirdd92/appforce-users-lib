import type { User } from "../../utils";
import { removeUser, toggleSelectUser } from "../../store/usersSlice";
import { useAppDispatch } from "../../store";
import { openModal } from "../../store/modalSlice";
type Props = {
  user: User;
};

export const UserCard = ({ user }: Props) => {
  const dispatch = useAppDispatch();

  const promptDelete = () => {
    dispatch(toggleSelectUser(user));
    dispatch(openModal("confirmation"));
  };

  const promptEdit = () => {
    dispatch(toggleSelectUser(user));
    dispatch(openModal("edit"));
  };

  return (
    <>
      <div className=" w-[320px]">
        <div className="h-[356px] rounded-lg bg-white py-3 shadow-2xl ">
          <div className="photo-wrapper p-2">
            <img
              className="mx-auto h-32 w-32 rounded-full"
              src={user.image}
              alt={`Image of ${user.name}`}
            />
          </div>
          <div className="p-2">
            <h3 className="text-center text-xl font-medium leading-8 text-gray-900">
              {user.name}
            </h3>

            <table className="my-3 text-xs">
              <tbody>
                <tr>
                  <td className=" px-2 py-2 font-semibold text-gray-500">
                    Address
                  </td>
                  <td className=" px-2 py-2">{user.location}</td>
                </tr>
                <tr>
                  <td className="px-2 py-2 font-semibold text-gray-500">
                    Email
                  </td>
                  <td className="px-2 py-2">{user.email}</td>
                </tr>
              </tbody>
            </table>

            <div className="mt-8 flex items-center justify-around text-center">
              <button
                className="text-xs font-medium italic text-red-500 hover:text-red-600 hover:underline"
                onClick={() => promptDelete()}
              >
                Delete
              </button>

              <button
                className="text-xs font-medium italic text-indigo-500 hover:text-indigo-600 hover:underline"
                onClick={() => promptEdit()}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
