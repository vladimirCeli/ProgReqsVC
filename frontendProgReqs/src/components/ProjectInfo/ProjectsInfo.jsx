import RequirementModal from "./RequirementFormM";
import RequirementModalN from "./RequirementFormMN";

const ProjectsInfo = ({
  project,
  handleOpen,
  moment,
  open,
  handleClose,
  newRequirement,
  changeRequirements,
  submitRequirements,
  loading,
  editingId,
  editingIdNotFunctionals,
  openNotFunctional,
  handleOpenNotFunctionals,
  handleCloseNotFunctionals,
  newRequirementsNotFuntional,
  changeRequirementsNotFunctionals,
  submitRequirementsNotFunctionals,
}) => {
  return (
    <>
      <div className="mt-2 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Información del proyecto
        </h1>
        <div className="mt-5 bg-white rounded-lg shadow-xl p-6 border border-gray-300 transition duration-300 ease-in-out transform hover:scale-105 bg-opacity-75">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            {project.name}
          </h1>
          <p className="text-base font-semibold mb-4 break-words text-gray-600">
            {project.description}
          </p>
          <p className="text-sm font-semibold mt-2 text-gray-600">
            Proyecto creado el:{" "}
            {moment(project.created_at).format("DD/MM/YYYY")}
          </p>
          <div className="mt-5 flex justify-end space-x-4">
            <button
              onClick={handleOpen}
              className="w-full bg-indigo-900 text-white py-2 rounded-lg hover:bg-indigo-800 transition duration-300 ease-in-out"
            >
              Agregar Requisitos funcionales
            </button>
            <button
              onClick={handleOpenNotFunctionals}
              className="w-full bg-indigo-900 text-white py-2 rounded-lg hover:bg-indigo-800 transition duration-300 ease-in-out"
            >
              Agregar Requisitos no funcionales
            </button>
          </div>
        </div>
      </div>
      <RequirementModal
        open={open}
        handleClose={handleClose}
        newRequirement={newRequirement}
        changeRequirements={changeRequirements}
        submitRequirements={submitRequirements}
        loading={loading}
        editingId={editingId}
      />
      <RequirementModalN
        open={openNotFunctional}
        handleClose={handleCloseNotFunctionals}
        newRequirement={newRequirementsNotFuntional}
        changeRequirements={changeRequirementsNotFunctionals}
        submitRequirements={submitRequirementsNotFunctionals}
        loading={loading}
        editingId={editingIdNotFunctionals}
      />
    </>
  );
};

export default ProjectsInfo;
