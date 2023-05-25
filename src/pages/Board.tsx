import { useEffect, useState } from "react";
import {
  getAllTasks,
  getBoardTitleAndDescription,
  getStages,
  patchTask,
} from "../utils/apiUtils";
import StageCard from "../components/StageCard";
import Modal from "../components/Modal";
import CreateStage from "../components/CreateStage";
import { ClipLoader } from "react-spinners";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

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
  const [showOverDue, setShowOverdue] = useState(true);
  const [showDueToday, setShowDueToday] = useState(true);
  const [showDueTomorrow, setShowDueTomorrow] = useState(true);
  const [showDueLater, setShowDueLater] = useState(true);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<TaskResult[]>();
  // const [stages, setStages] = useState<Stages>();
  const [results, setResults] = useState<Result[]>();
  const [stageModal, setStageModal] = useState(false);

  const removeParticularTask = (id: number) => {
    setTasks((prev) => prev?.filter((item) => item.id !== id));
  };

  const updateStages = (id: number) => {
    setResults((prev) => prev?.filter((item) => item.id !== id));
  };

  const onDragEnd = (result: DropResult) => {
    // console.log(result);

    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (source.droppableId !== destination.droppableId && tasks) {
      const taskFind = (tasks.filter(
        (item) => item.id === parseInt(draggableId)
      )[0].status_object.id = parseInt(destination.droppableId));

      const currentItem = tasks.filter(
        (item) => item.id === parseInt(draggableId)
      )[0];

      patchTask(currentItem.board, currentItem.id, { status: taskFind }).then(
        () => console.log("successfully pushed to the backend")
      );

      // console.log(taskFind);
    }

    if (source.droppableId === destination.droppableId && tasks) {
      const items = Array.from(tasks);
      const [reorderData] = items.splice(result.source.index, 1);
      items.splice(destination.index, 0, reorderData);
      setTasks(items);
    }
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
            <p className="text-gray-300 select-none font-bold text-3xl ml-7 my-7 inline-block">
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

          <div className="ml-7 mb-7">
            <div
              className={` mr-4 inline-block bg-[#35363d] pr-3 text-sm font-semibold px-2 py-1 ${
                showOverDue
                  ? "border-2 border-slate-500 text-gray-300"
                  : " text-gray-400"
              }  rounded-2xl w-fit hover:cursor-pointer select-none`}
              onClick={() => setShowOverdue((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-5 h-5 ${
                  showOverDue ? "text-red-400" : "text-red-500"
                }  inline`}
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="inline pl-1">Overdue</p>
            </div>
            <div
              className={` mr-4 inline-block bg-[#35363d] text-sm font-semibold px-2 pr-3 py-1 ${
                showDueToday
                  ? "border-2 border-slate-500 text-gray-300"
                  : "text-gray-400"
              } rounded-2xl w-fit hover:cursor-pointer select-none`}
              onClick={() => setShowDueToday((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-5 h-5 ${
                  showDueToday ? "text-purple-400 " : "text-purple-500 "
                } inline`}
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="inline pl-1">Due Today</p>
            </div>
            <div
              className={` mr-4 inline-block bg-[#35363d] text-sm font-semibold px-2 pr-3 py-1 ${
                showDueTomorrow
                  ? "border-2 border-slate-500 text-gray-300"
                  : "text-gray-400"
              } rounded-2xl w-fit hover:cursor-pointer select-none`}
              onClick={() => setShowDueTomorrow((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-5 h-5 ${
                  showDueTomorrow ? "text-amber-400" : "text-amber-500 "
                } inline`}
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="inline pl-1">Due Tomorrow</p>
            </div>
            <div
              className={` mr-4 inline-block bg-[#35363d] text-sm font-semibold px-2 pr-3 py-1 ${
                showDueLater
                  ? "border-2 border-slate-500 text-gray-300"
                  : "text-gray-400"
              }  rounded-2xl w-fit hover:cursor-pointer select-none`}
              onClick={() => setShowDueLater((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-5 h-5 ${
                  showDueLater ? "text-green-400" : "text-green-600"
                } inline`}
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                  clipRule="evenodd"
                />
              </svg>

              <p className="inline pl-1">Due Later</p>
            </div>
          </div>
          <div>
            <DragDropContext
              onDragEnd={(result) => {
                onDragEnd(result);
              }}
            >
              {results &&
                results.map((item) => (
                  <div className="inline-flex " key={item.id}>
                    <StageCard
                      showDueLater={showDueLater}
                      showDueToday={showDueToday}
                      showDueTomorrow={showDueTomorrow}
                      showOverDue={showOverDue}
                      removeParticularTaskCB={removeParticularTask}
                      tasks={tasks}
                      stages={results}
                      boardID={props.id}
                      id={item ? item.id : -1}
                      title={item ? item.title : ""}
                      description={item ? item.description : ""}
                      updateStagesCB={updateStages}
                      boardTitle={boardDetails ? boardDetails.title : ""}
                      boardDescription={
                        boardDetails ? boardDetails.description : ""
                      }
                    />
                  </div>
                ))}
            </DragDropContext>
          </div>
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
