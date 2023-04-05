import { User, userSchema } from "../../utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "../../store";
import { upsertUser, toggleSelectUser } from "../../store/usersSlice";
import { closeModal } from "../../store/modalSlice";
type Props = {
  user: User;
};
export const EditUserForm = ({ user }: Props) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<User>({
    values: user,
    resolver: zodResolver(userSchema),
    mode: "onChange",
  });

  const onSubmit = (data: User) => {
    dispatch(upsertUser(data));
    dispatch(toggleSelectUser(undefined));
    dispatch(closeModal());
  };

  return (
    <form className="py-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input className="input-bordered input w-full " {...register("name")} />
      </div>

      <div>
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          className="input-bordered input w-full "
          {...register("email")}
        />
      </div>

      <div>
        <label className="label">
          <span className="label-text">Address</span>
        </label>
        <input
          className="input-bordered input w-full "
          {...register("location")}
        />
      </div>

      {/* Errors */}
      {!isValid && (
        <div className="text-bolder text-md my-4 bg-red-200 p-2 text-red-700">
          {errors.name?.message && <p>* {errors.name.message}</p>}
          {errors.email?.message && <p>* {errors.email.message}</p>}
          {errors.location?.message && <p>* {errors.location.message}</p>}
        </div>
      )}

      <div className="mt-8">
        <input
          disabled={!isValid}
          className="btn-success btn rounded"
          type="submit"
        />
      </div>
    </form>
  );
};
