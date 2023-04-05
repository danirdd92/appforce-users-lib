import { useAppDispatch } from "../../store";
import { User } from "../../utils";
import { v4 as uuid } from "uuid";
import { faker } from "@faker-js/faker";
import { filterUsers, toggleSelectUser } from "../../store/usersSlice";
import { openModal } from "../../store/modalSlice";
import { ChangeEvent, useState } from "react";
export const ActionsPannel = () => {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState({
    key: "",
    query: "",
  });

  const onCreateNewUser = () => {
    const user: User = {
      id: uuid(),
      name: "",
      email: "",
      location: "",
      image: faker.image.people(640, 480, true),
    };
    dispatch(toggleSelectUser(user));
    dispatch(openModal("edit"));
  };

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilter((state) => {
      return { ...state, key: e.target.value };
    });
  };

  const onQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter((state) => {
      return { ...state, query: e.target.value };
    });
  };
  console.log({ filter });
  return (
    <div className="mx-auto mt-6  flex w-full flex-col-reverse justify-between gap-4 px-4 md:flex-row ">
      <div className="flex gap-4">
        <select
          value={filter.key}
          onChange={onSelectChange}
          className="select-secondary select w-fit max-w-xs "
        >
          <option value={""}>Filter By</option>
          <option value="id">Id</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="location">Location</option>
        </select>
        <input
          className="input-bordered input"
          type="text"
          id={"query"}
          value={filter.query}
          onChange={onQueryChange}
        />

        <button
          onClick={() =>
            //@ts-ignore
            dispatch(filterUsers({ filter: filter.key, query: filter.query }))
          }
          className="btn-info btn"
        >
          Search
        </button>
      </div>

      <div className="block">
        <button
          onClick={() => onCreateNewUser()}
          className="btn-success btn font-bold text-white"
        >
          Add New
        </button>
      </div>
    </div>
  );
};
