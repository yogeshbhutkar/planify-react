import { useState } from "react";
import { deleteStage } from "../utils/apiUtils";
import Modal from "./Modal";
import UpdateStages from "./UpdateStages";
import CreateTask from "./CreateTask";

export default function StageCard(props: {
  tasks: TaskResult[] | undefined;
  boardID: number;
  id: number;
  title: string;
  description: string;
  boardTitle: string;
  boardDescription: string;
  updateStagesCB: (id: number) => void;
}) {
  const [updateStage, setUpdateStage] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);

  const closeForm = () => {
    setUpdateStage(false);
  };

  const closeCreateTask = () => {
    setShowCreateTask(false);
  };

  return (
    <div className=" m-5 bg-[#1E1F25] border inline-block border-slate-500 text-gray-300 rounded-xl">
      <div className="pl-16">
        <div className="float-right">
          <button
            onClick={() => {
              deleteStage(props.id);
              props.updateStagesCB(props.id);
            }}
            className="  pt-1 pr-1  float-right"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 hover:text-red-400"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            className="hover:text-amber-400 ml-3 pt-1 pr-1 pl-16 float-right"
            onClick={() => setUpdateStage(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 "
            >
              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
            </svg>
          </button>
        </div>
        <div className="pr-16 py-5">
          <div className="w-fit">
            <div className="pr-16">
              <div className="inline-block">
                <p className="font-bold text-xl">{props.title}</p>
              </div>
              <div className="inline-block pl-2"></div>
            </div>
            <p className="pb-3 pt-1">{props.description}</p>
          </div>
          <button
            onClick={() => setShowCreateTask(true)}
            className="bg-gray-300 rounded-xl px-3 py-2 w-full hover:bg-blue-500 hover:text-white text-gray-700 mt-3 font-semibold "
          >
            Create Task
          </button>
        </div>
      </div>

      <Modal open={updateStage} closeCB={() => setUpdateStage(false)}>
        <UpdateStages
          title={props.title}
          description={props.description}
          id={props.id}
          closeFormCB={closeForm}
        />
      </Modal>
      <Modal open={showCreateTask} closeCB={() => setShowCreateTask(false)}>
        <CreateTask
          boardID={props.boardID}
          boardTitle={props.boardTitle}
          boardDescription={props.boardDescription}
          statusTitle={props.title}
          statusDescription={props.description}
          statusID={props.id}
          closeFormCB={closeCreateTask}
        />
      </Modal>
      {props.tasks && (
        <div className="mx-3">
          {props.tasks.map((item) => (
            <div
              key={item.id}
              className="text-gray-700 px-4 my-2  rounded-lg bg-gray-300"
            >
              {item.status_object.id === props.id ? (
                <div className="py-2">
                  <p>
                    <span className="font-bold text-gray-600">Title: </span>
                    {item.title}
                  </p>
                  <p>
                    <span className="font-bold text-gray-600">
                      Description:{" "}
                    </span>
                    {item.description}
                  </p>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
