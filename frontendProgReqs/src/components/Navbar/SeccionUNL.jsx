import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";

const AuthSection = () => {
  return (
    <div className="bg-transparent py-8 mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <img
              src="../../../img/unl.png"
              alt="Logo Universidad Nacional de Loja"
              className="h-16 w-36 md:h-24 md:w-64"
              style={{ padding: "15px 0 0 0" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSection;
