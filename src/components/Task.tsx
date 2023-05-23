import { useState } from "react";
import { deleteTask } from "../utils/apiUtils";
import Modal from "./Modal";
import UpdateTask from "./UpdateTask";

export default function Task(props: {
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

  return (
    <div
      onClick={() => setEditTask(true)}
      className={`text-gray-700 cursor-pointer my-2 rounded-lg  bg-gray-100 ease-out hover:translate-y-1 transition-all`}
    >
      <div>
        <button
          onClick={() => {
            deleteTask(props.boardID, props.itemID).then(() =>
              props.removeParticularTaskCB(props.itemID)
            );
          }}
          className="float-right hover:text-red-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clipRule="evenodd"
            />
          </svg>
        </button>
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
  );
}
