import { useState } from "react";
import { deleteTask } from "../utils/apiUtils";
import Modal from "./Modal";
import UpdateTask from "./UpdateTask";

export default function Task(props: {
  dueDate: string;
  itemID: number;
  stageTitle: string;
  boardID: number;
  removeParticularTaskCB: (id: number) => void;
  title: string;
  description: string;
  createdOn: string;
  statusID: number;
  stages: Result[];
}) {
  const [editTask, setEditTask] = useState(false);
  const dateObject = new Date();
  const currentDate = dateObject.toISOString().split("T")[0];
  const propsDate = new Date(props.dueDate).toISOString().split("T")[0];

  const getFloater = () => {
    if (currentDate === propsDate) {
      return (
        <p className="bg-purple-300 rounded-full mt-1 font-bold text-[12px] mr-1 text-purple-800 px-2 py-2">
          Due Today
        </p>
      );
    } else if (currentDate < propsDate) {
      return (
        <p className="bg-green-300 rounded-full mt-1 text-green-800 font-bold text-[12px] mr-1 px-2 py-2">
          Due Later
        </p>
      );
    } else if (currentDate > propsDate) {
      return (
        <p className="bg-red-300 rounded-full mt-1 font-bold text-[12px] mr-1 text-red-800 px-2 py-2">
          Overdue
        </p>
      );
    }
  };

  return (
    <div
      className={`text-gray-700 cursor-pointer my-2 rounded-lg  bg-gray-200 ease-out hover:translate-y-1 transition-all`}
    >
      <button
        onClick={() => {
          deleteTask(props.boardID, props.itemID).then(() =>
            props.removeParticularTaskCB(props.itemID)
          );
        }}
        className="hover:text-blue-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div className="float-right">{getFloater()}</div>
      <div onClick={() => setEditTask(true)}>
        <div className="pt-2">
          <div className="py-2 px-4">
            <p>
              <span className="font-bold text-gray-600">Title: </span>
              {props.title}
            </p>
            <p>
              <span className="font-bold text-gray-600">Description: </span>
              {props.description}
            </p>
          </div>
        </div>
        <Modal open={editTask} closeCB={() => setEditTask(false)}>
          <UpdateTask
            stageTitle={props.stageTitle}
            title={props.title}
            stages={props.stages}
            statusID={props.statusID}
            statusDescription={props.description}
            statusTitle={props.title}
            createdOn={props.createdOn}
            boardID={props.boardID}
            itemID={props.itemID}
          />
        </Modal>
      </div>
    </div>
  );
}
