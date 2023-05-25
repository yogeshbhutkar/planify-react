import React, { useState } from "react";
import { patchTask } from "../utils/apiUtils";

export default function UpdateTask(props: {
  title: string;
  stageTitle: string;
  statusID: number;
  statusTitle: string;
  statusDescription: string;
  createdOn: string;
  boardID: number;
  itemID: number;
  dueDate: string;
  stages: Result[];
}) {
  const [form, setForm] = useState<TaskUpdate>({
    title: props.statusTitle,
    description: props.statusDescription,
    created_on: props.createdOn,
  });
  const [buttonText, setButtonText] = useState("Update");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  // const [statusId, setStatusId] = useState(props.statusID);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError("");
    setDescriptionError("");

    if (form.title.length === 0) {
      setTitleError("Title cannot be empty.");
    }
    if (form.description.length === 0) {
      setDescriptionError("Description cannot be empty.");
    }

    try {
      const payload = {
        title: form.title,
        description: form.description + "#" + props.dueDate,
        status: props.statusID,
      };
      setButtonText("Loading");

      patchTask(props.boardID, props.itemID, payload).then(() => {
        window.location.reload();
        setButtonText("Done 🥰");
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" bg-[#272A30] text-gray-300">
      <div className="p-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="font-bold text-md" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              className="border-1 focus:outline-none text-white border-slate-600 w-full  bg-[#3b4046]  rounded-lg p-2 my-2 flex-1"
              id="title"
              name="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div className="pt-3">
            <label className="font-bold text-md" htmlFor="description">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="border-1 focus:outline-none text-white border-slate-600 w-full  bg-[#3b4046]  rounded-lg p-2 my-2 flex-1"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
          <div className="pt-3">
            <label className="font-bold text-md" htmlFor="createdOn">
              Created On
            </label>
            <input
              readOnly
              type="text"
              id="createdOn"
              name="createdOn"
              className="border-1 focus:outline-none text-white select-none border-slate-600 w-full  bg-[#3b4046]  rounded-lg p-2 my-2 flex-1"
              value={form.created_on.split("T")[0]}
            />
          </div>
          <div className="pt-3">
            <label className="font-bold text-md" htmlFor="dueDate">
              Due Date
            </label>
            <input
              readOnly
              type="text"
              id="dueDate"
              name="dueDate"
              className="border-1 select-none focus:outline-none text-white border-slate-600 w-full  bg-[#3b4046]  rounded-lg p-2 my-2 flex-1"
              value={props.dueDate}
            />
          </div>
          {/* <div className="pt-3">
          <label className="font-bold text-md block" htmlFor="dropdown">
              Stage
            </label>
          <select
              onChange={(e) => setStatusId(parseInt(e.target.value))}
              className="mt-2 text-gray-300 font-semibold text-md focus:outline-none rounded-lg px-5 py-2 bg-[#3b4046]"
            >
              <option>Select Stage</option>
              {props.stages.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div> */}

          {titleError && (
            <div className="text-white bg-red-400 text-center py-3 rounded-xl mt-5">
              {titleError}
            </div>
          )}
          {descriptionError && (
            <div className="text-white bg-red-400 text-center py-3 rounded-xl mt-2">
              {descriptionError}
            </div>
          )}
          <div className="flex flex-col">
            <button
              type="submit"
              className="bg-blue-600 text-center text-white hover:bg-blue-700 shadow-blue-700/40 mt-10 shadow-lg  px-5 py-2 rounded-xl font-semibold"
            >
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
