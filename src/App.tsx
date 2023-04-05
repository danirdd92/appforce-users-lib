import {
  ConfirmDeleteUserModal,
  EditUserModal,
  Header,
  Loader,
  UserCardList,
} from "./components";
import { ActionsPannel } from "./components/layout/ActionsPannel";
import useFetchUsers from "./hooks/useFetchUsers";
import { useAppSelector } from "./store";

function App() {
  const { isLoading } = useFetchUsers();
  const modalType = useAppSelector((state) => state.modalSlice.modalType);
  const isOpen = useAppSelector((state) => state.modalSlice.isOpen);

  if (isLoading) return <Loader />;

  return (
    <>
      <Header />

      <main className="container mx-auto ">
        <ActionsPannel />
        <UserCardList />
      </main>

      <EditUserModal open={isOpen && modalType === "edit"} />
      <ConfirmDeleteUserModal open={isOpen && modalType === "confirmation"} />
    </>
  );
}

export default App;
