import { Link } from "react-router-dom";
import { ClipboardDocumentCheckIcon, QuestionMarkCircleIcon, QueueListIcon, TagIcon } from "@heroicons/react/24/outline";

const sections = [
  {
    id: 1,
    title: "Preguntas",
    route: "/questions",
    color: "#ff9800",
    icon: <QuestionMarkCircleIcon
    alt=""
    className="h-20 m-6 text-gray-400 hover:text-gray-700"
  />,
  },
  {
    id: 2,
    title: "Practicas",
    route: "/subsections",
    color: "#2196f3",
    icon: <QueueListIcon 
    alt=""
    className="h-20 m-6 text-gray-400 hover:text-gray-700"
  />,
  },
  {
    id: 3,
    title: "Categorías",
    route: "/categories",
    color: "#f44336",
    icon: <TagIcon 
    alt=""
    className="h-20 m-6 text-gray-400 hover:text-gray-700"
  />,
  },
  {
    id: 4,
    title: "Cuestionarios",
    route: "/questionnaire/new",
    color: "#9c27b0",
    icon: <ClipboardDocumentCheckIcon
    
    alt=""
    className="h-20 m-6 text-gray-400 hover:text-gray-700"
  />,
  },
];

export const QuestionnairesSection = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {sections.map((section, index) => (
        <div key={section.id} className="flex flex-col bg-white rounded-lg shadow-md w-full m-6 overflow-hidden sm:w-52">
          {section.icon}

          <h2 className="text-gray-400 text-center px-2 pb-5">{section.title}</h2>

          <Link
            to={section.route}
            className=" text-gray-50 p-3 text-center transition-all duration-500"
            style={{ backgroundColor: "#2c3e50" }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#465669")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#2c3e50")}
          >
            Saber más
          </Link>
        </div>
      ))}     
    </div>
  );
};
