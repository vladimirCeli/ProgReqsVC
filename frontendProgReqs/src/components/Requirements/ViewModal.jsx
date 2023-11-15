/* eslint-disable react/prop-types */

import { XCircleIcon } from '@heroicons/react/24/outline';

const ViewModal = ({
  viewDescriptionOpen,
  handleCloseViewDescription,
  editedDescription,
}) => {
  return (
    <div className={`fixed inset-0 z-50 ${viewDescriptionOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black opacity-50"></div>

      <div className="flex items-center justify-center h-screen">
        <div className="bg-white w-full max-w-lg p-4 rounded-md shadow-lg relative">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleCloseViewDescription}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <XCircleIcon className="h-6 w-6" />
            </button>
            <h6 className="text-xl font-semibold">Ver Descripción</h6>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: editedDescription }}
            className="min-h-32 text-base border-none rounded-md p-2 overflow-y-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
