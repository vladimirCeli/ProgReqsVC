const BoxResponses = ({ response, handleDelete, id1, id2, navigate }) => {
  return (
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Lista de Respuestas
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {response.length > 0 ? (
          response.map((project) => (
            <div className="mt-4" key={project.id}>
              <div className="bg-white rounded-lg shadow-md p-4 transition duration-300 ease-in-out transform hover:scale-105 text-center bg-opacity-75">
                <div>
                  <p className="text-lg font-semibold">{project.name}</p>
                </div>
                <div className="grid grid-cols-3 justify-end mt-2 ">
                  <button
                    onClick={() =>
                      navigate(`/graphicsresults/${id1}/${id2}/${project._id}`)
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
                    onClick={() =>
                      navigate(`/response/${id1}/${id2}/${project._id}/edit`)
                    }
                    className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded mr-2 flex items-center text-center justify-center"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded flex items-center text-center justify-center"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg font-semibold mt-4 text-gray-800">
            No hay Respuestas
          </p>
        )}
      </div>
    </div>
  );
};

export default BoxResponses;
