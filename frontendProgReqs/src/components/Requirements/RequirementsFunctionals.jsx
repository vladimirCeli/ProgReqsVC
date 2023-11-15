/* eslint-disable react/prop-types */

const RequirementsFunctionals = ({
  requirements
}) => {
    return (
        <div className="container mx-auto bg-white p-4 rounded-lg shadow-lg text-center items-center">
        <div className="max-w-sm mx-auto">
          <div className="w-full border-2 border-gray-800 mb-2">
            <table className="w-full">
              <tr className="border-b-2 border-gray-800">
                <td className="p-2 border-r-2 border-gray-800 font-bold">
                  Identificación del Requerimiento
                </td>
                <td className="p-2 break-words">
                  {requirements.ident_requirement_id}
                </td>
              </tr>
              <tr className="border-b-2 border-gray-800">
                <td className="p-2 border-r-2 border-gray-800 font-bold">
                  Nombre del requerimiento
                </td>
                <td className="p-2 break-words">{requirements.name}</td>
              </tr>
              <tr className="border-b-2 border-gray-800">
                <td className="p-2 border-r-2 border-gray-800 font-bold">
                  Características
                </td>
                <td className="p-2 break-words">
                  {requirements.characteristicsr}
                </td>
              </tr>
              <tr className="border-b-2 border-gray-800">
                <td className="p-2 border-r-2 border-gray-800 font-bold">
                  Descripción del requerimiento
                </td>
                <td className="p-2 break-words">
                  {requirements.description}
                </td>
              </tr>
              <tr className="border-b-2 border-gray-800">
                <td className="p-2 border-r-2 border-gray-800 font-bold">
                  Requerimiento no funcional
                </td>
                <td className="p-2 break-words">
                  {requirements.req_no_funtional}
                </td>
              </tr>
              <tr className="border-b-2 border-gray-800">
                <td className="p-2 border-r-2 border-gray-800 font-bold">
                  Prioridad del Requerimiento
                </td>
                <td className="p-2 break-words">
                  {requirements.priority_req}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    )
}

export default RequirementsFunctionals