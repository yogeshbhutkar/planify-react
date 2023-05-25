import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getUserDetails, listBoards } from "../utils/apiUtils";
import Modal from "../components/Modal";
import CreateBoard from "../components/CreateBoard";
import ClipLoader from "react-spinners/ClipLoader";

function Home() {
  useEffect(() => {
    getUserDetails().then((res) => setCurrentUser(res.username));
  }, []);

  useEffect(() => {
    try {
      listBoards()
        .then((ele) => setBoard(ele.results))
        .then(() => setBoardLoading(false));
    } catch (err) {
      console.log(err);
    }
  }, []);

  const updateBoard = (id: number) => {
    setBoard((prev) => prev.filter((item) => item.id !== id));
  };

  const closeForm = () => {
    setOpenModal(false);
  };

  const [board, setBoard] = useState<Result[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [boardLoading, setBoardLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState("");

  return (
    <>
      {boardLoading === true ? (
        <div className="h-screen flex">
          <div className="my-auto">
            <ClipLoader
              color="#ffffff"
              loading={boardLoading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      ) : (
        <div className="inline-block p-10 w-screen">
          <div className="pt-7 px-7 ">
            <p className="font-bold select-none text-3xl mb-11 block text-gray-200">
              Welcome, {currentUser}
            </p>
            <p className="font-bold text-2xl select-none inline-block text-gray-200">
              Boards
            </p>
            <button
              onClick={() => setOpenModal(true)}
              className="inline-block text-gray-300 pl-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 hover:text-blue-400"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div>
            {board &&
              board.map((item) => (
                <Card
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  updateBoardCB={updateBoard}
                />
              ))}
          </div>
          <Modal open={openModal} closeCB={() => setOpenModal(false)}>
            <CreateBoard closeFormCB={closeForm} />
          </Modal>
        </div>
      )}
    </>
  );
}

export default Home;
