"use client";

interface DeleteResumeModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onDelete: () => void;
}

export default function DeleteResumeModal({
  open,
  setOpen,
  onDelete,
}: DeleteResumeModalProps) {
  return (
    <dialog className={`modal ${open ? "modal-open" : ""}`}>
      <div className="modal-box">

        <h3 className="text-2xl font-bold text-error">
          Delete Resume
        </h3>

        <p className="py-4 text-base-content/80">
          Are you sure you want to delete this resume?
        </p>

        <p className="text-sm text-base-content/60">
          This action cannot be undone.
        </p>

        <div className="modal-action">

          <button
            className="btn btn-outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>

          <button
            className="btn btn-error"
            onClick={onDelete}
          >
            Delete Resume
          </button>

        </div>

      </div>

      {/* Click outside to close */}
      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setOpen(false)}>
          close
        </button>
      </form>
    </dialog>
  );
}