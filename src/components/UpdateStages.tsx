import React, { useState } from "react";
import { patchStage } from "../utils/apiUtils";

export default function UpdateStages(props: {
  closeFormCB: () => void;
  title: string;
  description: string;
  id: number;
}) {
  const [form, setForm] = useState<BoardForm>({
    title: props.title,
    description: props.description,
  });
  const [buttonText, setButtonText] = useState("Update");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

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
      const board: BoardForm = {
        title: form.title,
        description: form.description,
      };
      setButtonText("Loading");
      patchStage(board, props.id).then(() => {
        window.location.reload();
        setButtonText("Done 🥰");
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" bg-[#272A30] text-gray-300">
      <button
        onClick={() => props.closeFormCB()}
        className="float-right pr-1 pt-1"
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
