import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUniversity,
  faPhone,
  faEnvelopeOpen,
  faMapMarkerAlt,
  faSitemap,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <>
      <div className="p-2" style={{ backgroundColor: "#0c2342" }}>
        <div className="p-3 md:p-5">
          <img src="../../../img/logo_v2_0.png" alt="" className="pb-4" />

          <div className="text-white text-xs font-sans font-bold pb-4 flex items-center gap-3">
            <FontAwesomeIcon className="text-white" icon={faUniversity} />
            <span>Ciudad Universitaria Guillermo Falconí - Loja - Ecuador</span>
          </div>

          <div className="text-white text-xs font-sans font-bold pb-4 flex items-center gap-3">
            <FontAwesomeIcon className="text-white" icon={faPhone} />
            <span>
              <strong>07 2593550</strong> (Opción 1 - Modalidad Presencial)
            </span>
          </div>

          <div className="text-white text-xs font-sans font-bold pb-4 flex items-center gap-3">
            <FontAwesomeIcon className="text-white" icon={faPhone} />
            <span>
              <strong>07 2593550</strong> (Opción 2 - Modalidad Distancia)
            </span>
          </div>

          <div className="text-white text-xs font-sans font-bold pb-4 flex items-center gap-3">
            <FontAwesomeIcon className="text-white" icon={faEnvelopeOpen} />
            <span>
              <strong>Contáctanos:</strong>{" "}
              <a
                href="mailto:comunicacion@unl.edu.ec"
                target="_blank"
                rel="noreferrer"
                className="hover:text-gray-300 hover:underline"
              >
                comunicacion@unl.edu.ec
              </a>
            </span>
          </div>

          <div className="text-white text-xs font-sans font-bold pb-4 flex items-center gap-3">
            <FontAwesomeIcon className="text-white" icon={faMapMarkerAlt} />
            <a
              href="https://www.openstreetmap.org/?mlat=-4.03364&mlon=-79.20311#map=17/-4.03364/-79.20311"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-300 hover:underline"
            >
              <strong>Ver ubicación en el mapa</strong>
            </a>
          </div>

          <div className="text-white text-xs font-sans font-bold pb-4 flex items-center gap-3">
            <FontAwesomeIcon className="text-white" icon={faSitemap} />
            <a
              href="https://unl.edu.ec/sitemap"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-300 hover:underline"
            >
              <strong>Mapa del sitio</strong>
            </a>
          </div>
        </div>
      </div>

      <div
        className="py-3 md:py-5 flex justify-center items-center text-center"
        style={{ backgroundColor: "#091d38" }}
      >
        <h1 className="text-white text-xs md:text-sm font-semibold">
          <span className="font-semibold cursor-pointer">
            © 2023. Todos los derechos reservados. Universidad Nacional de Loja
          </span>
        </h1>
      </div>
    </>
  );
};

export default Footer;
