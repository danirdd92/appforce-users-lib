import { useEffect, useState } from "react";
import { User, convertResponseToUsersArray } from "../utils";
import axios from "axios";
import { useAppDispatch } from "../store";
import { populateUsers } from "../store/usersSlice";

const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://randomuser.me/api/?results=10", {
          signal: controller.signal,
        });
        const data = convertResponseToUsersArray(res.data.results);
        setUsers(data);
        dispatch(populateUsers(data));
      } catch (error) {
        console.error(error);
      }
    };

    setIsLoading((state) => true);
    fetchUsers();
    setIsLoading((state) => false);

    return () => {
      controller.abort();
    };
  }, []);

  return { users, isLoading };
};

export default useFetchUsers;
