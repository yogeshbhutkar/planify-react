import { navigate } from "raviger";
import { deleteBoard } from "../utils/apiUtils";
import Modal from "./Modal";
import UpdateBoard from "./UpdateBoard";
import { useState } from "react";

export default function Card(props: {
  title: string;
  description: string;
  id: number;
  updateBoardCB: (id: number) => void;
}) {
  const closeUpdateBoard = () => {
    setUpdateBoard(false);
  };

  const [updateBoard, setUpdateBoard] = useState(false);

  return (
    <div className="pl-16 m-5 bg-[#1E1F25] border inline-block border-slate-500 text-gray-300 rounded-xl">
      <div className="float-right">
        <button
          onClick={() => {
            deleteBoard(props.id);
            props.updateBoardCB(props.id);
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
          onClick={() => setUpdateBoard(true)}
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
        <div
          className="w-fit cursor-pointer"
          onClick={() => navigate(`/board/${props.id}`)}
        >
          <div className="pr-16">
            <div className="inline-block">
              <p className="font-bold  text-xl select-none ">{props.title}</p>
            </div>
            <div className="inline-block pl-2"></div>
          </div>
          <p className="pb-3 select-none pt-2">{props.description}</p>
        </div>
      </div>

      <Modal open={updateBoard} closeCB={() => setUpdateBoard(false)}>
        <UpdateBoard
          id={props.id}
          closeFormCB={closeUpdateBoard}
          title={props.title}
          description={props.description}
        />
      </Modal>
    </div>
  );
}
