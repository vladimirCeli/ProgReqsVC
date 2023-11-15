/* eslint-disable react/prop-types */

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"; // Import icons for arrows

const Carousel = ({ categories, loadSybCategories, setOpenModal }) => {
  const handleClick = (id) => {
    loadSybCategories(id);
    setTimeout(setOpenModal(true), 1000);
  };
  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-md z-10 transition duration-300 hover:bg-gray-700"
        onClick={onClick}
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
    );
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-md z-10 transition duration-300 hover:bg-gray-700"
        onClick={onClick}
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0",
    draggable: true,
    swipeToSlide: true,
    touchMove: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-6 relative max-h-96 overflow-hidden">
      <Slider {...settings} className="overflow-hidden">
        {categories.map((c) => (
          <div
            key={c.id}
            onClick={() => handleClick(c.id)}
            className="flex-shrink-0 w-full sm:w-44 h-40 text-center items-center justify-center bg-white rounded-md p-4 mx-4 my-4 shadow-lg flex flex-col transition duration-300 transform hover:scale-105"
          >
            <h3 className="text-lg text-black text-center">
              <a>{c.name}</a>
            </h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
