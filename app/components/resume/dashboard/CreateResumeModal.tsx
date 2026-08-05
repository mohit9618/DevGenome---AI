"use client";

import { useState } from "react";

interface CreateResumeModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;

  onCreate: (
    title: string,
    template: string
  ) => void;
}

export default function CreateResumeModal({
  open,
  setOpen,
  onCreate,
}: CreateResumeModalProps) {
  const [title, setTitle] = useState("");

  const [template, setTemplate] =
    useState("Modern");

  function handleCreate() {
    if (!title.trim()) {
      alert("Resume title is required.");
      return;
    }

    onCreate(title, template);

    setTitle("");
    setTemplate("Modern");
  }

  return (
    <dialog className={`modal ${open ? "modal-open" : ""}`}>

      <div className="modal-box">

        <h3 className="font-bold text-2xl">
          Create Resume
        </h3>

        <p className="opacity-70 mt-2">
          Create a new professional resume.
        </p>

        <div className="space-y-5 mt-8">

          <div>

            <label className="label">
              Resume Title
            </label>

            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Software Engineer Resume"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

          </div>

          <div>

            <label className="label">
              Template
            </label>

            <select
              className="select select-bordered w-full"
              value={template}
              onChange={(e) =>
                setTemplate(e.target.value)
              }
            >
              <option>Modern</option>
              <option>Classic</option>
              <option>Minimal</option>
              <option>Professional</option>
            </select>

          </div>

        </div>

        <div className="modal-action">

          <button
            className="btn btn-outline"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
            onClick={handleCreate}
          >
            Create Resume
          </button>

        </div>

      </div>

      <form
        method="dialog"
        className="modal-backdrop"
      >
        <button
          onClick={() => setOpen(false)}
        >
          close
        </button>
      </form>

    </dialog>
  );
}