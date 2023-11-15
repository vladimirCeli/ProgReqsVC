/* eslint-disable react/prop-types */

import { XCircleIcon } from "@heroicons/react/24/outline";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ModalD = ({
  open,
  handleClose,
  handleSaveDescription,
  editedDescription,
  setEditedDescription,
  modules,
  formats,
}) => {
  return (
    <div className={`fixed inset-0 z-50 ${open ? "block" : "hidden"}`}>
      <div className="fixed inset-0 bg-black opacity-50"></div>

      <div className="flex items-center justify-center h-screen">
        <div className="bg-white w-full max-w-lg p-4 rounded-md shadow-lg relative z-10">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <XCircleIcon className="h-6 w-6" />
            </button>
            <h6 className="text-xl font-semibold">Descripción</h6>
            <button
              autoFocus
              onClick={handleSaveDescription}
              className="text-blue-500 hover:text-blue-700 focus:outline-none"
            >
              Guardar
            </button>
          </div>
          <div className="p-2">
            <ReactQuill
              value={editedDescription}
              onChange={setEditedDescription}
              modules={modules}
              formats={formats}
              style={{
                minHeight: "150px",
                fontSize: "16px",
                border: "none",
                borderRadius: "4px",
              }}
              placeholder="Escribe una descripción..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalD;
