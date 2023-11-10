import { Logo } from "../Logo";
import { Link } from "react-router-dom";
import Container from "../Container";
import NavbarL from "./NavbarL";
import Footer from "./Footer";
import "./animations.css";

const Home = () => {
  return (
    <>
      <NavbarL />
      <div className="relative">
        <Container className="flex flex-wrap">
          <div className="flex items-center w-full lg:w-1/2 relative">
            <div className="max-w-2xl mb-8 text-animation">
              <div className="absolute top-0 left-0 sm:top-5 sm:left-5 md:top-10 md:left-10 lg:top-20 lg:left-20 w-30 h-30 sm:w-72 sm:h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob text-animation"></div>
              <div className="absolute top-1/4 left-1/4 sm:top-1/4 sm:left-1/4 md:top-1/4 md:left-1/4 lg:top-1/4 lg:left-1/4 w-30 h-30 sm:w-72 sm:h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 text-animation"></div>
              <div className="absolute top-1/2 left-1/6 sm:top-1/6 sm:left-1/6 md:top-1/6 md:left-1/6 lg:top-1/6 lg:left-1/6 w-30 h-30 sm:w-72 sm:h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 text-animation"></div>
              <div className="absolute top-3/4 left-2/4 sm:top-3/4 sm:left-2/5 md:top-3/4 md:left-3/5 lg:top-3/4 lg:left-3/5 w-30 h-30 sm:w-72 sm:h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 text-animation"></div>
              <div className="absolute top-3/4 left-3/4 sm:top-3/4 sm:left-3/4 md:top-3/4 md:left-3/4 lg:top-3/4 lg:left-3/4 w-30 h-30 sm:w-72 sm:h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 text-animation"></div>
              <div className="absolute top-3/4 left-4/5 sm:top-3/4 sm:left-4/5 md:top-3/4 md:left-4/5 lg:top-3/4 lg:left-4/5 w-30 h-30 sm:w-72 sm:h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob text-animation"></div>
              <div className="absolute top-3/4 left-2/4 sm:top-3/4 sm:left-4/5 md:top-2/4 md:left-3/5 lg:top-4/4 lg:left-4/5 w-30 h-30 sm:w-72 sm:h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob text-animation"></div>
              <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
                Bienvenido a ProgReqS
              </h1>
              <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl">
                Potencie su desarrollo con productos seguros y basados en las
                mejores prácticas.
              </p>
              <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl">
                Cree aplicaciones sólidas y seguras con facilidad. Únase a
                ProgReqS hoy mismo.
              </p>
              <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
                <Link to="/login">
                  <button className="bg-indigo-950 text-white font-bold py-2 px-4 rounded drop-shadow-xl transition duration-500 ease-in-out hover:bg-indigo-800 hover:text-black">
                    Iniciar Sesión
                  </button>
                </Link>
                <Link to="/register">
                  <button className="flex items-center space-x-2 bg-transparent border-2 border-white text-white font-bold py-2 px-4 rounded drop-shadow-xl transition duration-500 ease-in-out hover:bg-gray-100 hover:text-black">
                    Registrarse
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full lg:w-1/2 relative">
            <div className="w-80 h-80 relative text-animation">
              <div className="absolute top-0 left-0 sm:top-5 sm:left-5 md:top-10 md:left-10 lg:top-20 lg:left-20 w-30 h-30 sm:w-72 sm:h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob text-animation"></div>
              <div className="absolute top-0 right-0 sm:top-5 sm:right-5 md:top-10 md:right-10 lg:top-20 lg:right-20 w-30 h-30 sm:w-72 sm:h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 text-animation"></div>
              <div className="absolute bottom-0 left-0 sm:bottom-5 sm:left-5 md:bottom-10 md:left-10 lg:bottom-20 lg:left-20 w-30 h-30 sm:w-72 sm:h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 text-animation"></div>
              <div className="absolute top-0 right-0 sm:top-9 sm:right-9 md:top-0 md:right-0 lg:top-56 lg:right-56 w-30 h-30 sm:w-72 sm:h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob text-animation"></div>
              <div className="">
                <Logo
                  width="460"
                  height="445"
                  className="w-full h-full s-animation scale-up relative z-10  logo-animation"
                  alt="Hero Illustration"
                  loading="eager"
                  placeholder="blur"
                />
              </div>
            </div>
          </div>
        </Container>
        <Container>
          <div className="flex flex-col justify-center text-animation">
            <div className="text-xl text-center text-gray-700">
              Los estudiantes de computación confían en nosotros
            </div>
            <div className="flex flex-wrap justify-center md:justify-around">
              <img src="../../assets/CIC.png" alt="" width={247} height={247} />
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Home;
