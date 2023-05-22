import { useEffect, useState } from "react";
import {
  getAllTasks,
  getBoardTitleAndDescription,
  getStages,
} from "../utils/apiUtils";
import StageCard from "../components/StageCard";
import Modal from "../components/Modal";
import CreateStage from "../components/CreateStage";
import { ClipLoader } from "react-spinners";

export default function Board(props: { id: number }) {
  useEffect(() => {
    try {
      getAllTasks(props.id).then((res) => {
        setTasks(res.results);
        setLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    try {
      getStages().then((res) => {
        // setStages(res);
        setResults(res.results);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const closeForm = () => {
    setStageModal(false);
  };

  useEffect(() => {
    try {
      getBoardTitleAndDescription(props.id).then((res) => setBoardDetails(res));
    } catch (err) {
      console.log(err);
    }
  }, []);

  const [boardDetails, setBoardDetails] = useState<Result>();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskResult[]>();
  // const [stages, setStages] = useState<Stages>();
  const [results, setResults] = useState<Result[]>();
  const [stageModal, setStageModal] = useState(false);

  const updateStages = (id: number) => {
    setResults((prev) => prev?.filter((item) => item.id !== id));
  };

  return (
    <>
      {loading ? (
        <div className="h-screen flex">
          <div className="my-auto">
            <ClipLoader
              color="#ffffff"
              loading={loading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      ) : (
        <div className="inline-block p-10 w-screen">
          <div>
            <p className="text-gray-300 font-bold text-3xl ml-7 my-7 inline-block">
              Stages
            </p>
            <button
              onClick={() => setStageModal(true)}
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
          {results &&
            results.map((item) => (
              <div key={item.id} className="inline-flex">
                <StageCard
                  tasks={tasks}
                  boardID={props.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  updateStagesCB={updateStages}
                  boardTitle={boardDetails ? boardDetails.title : ""}
                  boardDescription={
                    boardDetails ? boardDetails.description : ""
                  }
                />
              </div>
            ))}
          <div>
            <Modal open={stageModal} closeCB={() => setStageModal(false)}>
              <CreateStage closeFormCB={closeForm} />
            </Modal>
          </div>
        </div>
      )}
    </>
  );
}
