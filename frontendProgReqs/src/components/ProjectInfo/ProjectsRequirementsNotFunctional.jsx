const RequirementsProjects = ({
    requirements,
    moment,
    navigate,
    handleDelete,
    handleEdit,
    errors,
  }) => {
    return (
      <div className="container mx-auto px-4 text-center">
        <h6 className="text-gray-800 font-semibold text-xl mt-4 text-center">
          Requisitos no funcionales
        </h6>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {requirements.length > 0 ? (
            requirements.map((requirement) => (
              <div className="mt-4" key={requirement.id}>
                <div className="bg-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105 text-center bg-opacity-75">
                  <div>
                    <p className="text-lg font-semibold">{requirement.name}</p>
                    <p className="text-sm mt-2">{requirement.description}</p>
                    <p className="text-sm mt-2">
                      Requisito creado el:{" "}
                      {moment(requirement.created_at).format("DD/MM/YYYY")}
                    </p>
                  </div>
                  <div className="grid grid-cols-3 justify-end mt-2 ">
                    <button
                      onClick={() =>
                        navigate(`/requirements/project/${requirement.id}`)
                      }
                      style={{ backgroundColor: "#2c3e50" }}
                      className="text-white py-2 px-4 rounded mr-2 flex items-center text-center justify-center"
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#465669")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#2c3e50")
                      }
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => handleEdit(requirement.id)}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded mr-2 flex items-center text-center justify-center"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(requirement.id)}
                      className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded flex items-center text-center justify-center"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : errors ? (
            <h6 className="mb-4 text-white font-semibold">{errors}</h6>
          ) : (
            <h6 className="mb-4 text-white font-semibold">No hay requisitos</h6>
          )}
        </div>
      </div>
    );
  };
  
  export default RequirementsProjects;
  