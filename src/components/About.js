// AboutSection.jsx
import React from "react";
// import Image1 from "./images/container-truck.jpg"; // small image
// import Image2 from "./images/container-crane.jpg"; // large image

const AboutSection = () => {
  return (
    <section className="w-full bg-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-8">
        {/* Left content */}
        <div className="flex-1">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            TransMax Sisam <br />
            Around <span className="text-yellow-500">the World</span>
          </h2>
          <div className="w-16 h-1 bg-blue-900 mb-6"></div>
          <p className="text-gray-600 mb-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley
            of type.
          </p>
          <p className="text-gray-600 mb-6">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley
            of type.
          </p>
          <button className="bg-blue-900 text-white py-2 px-6 rounded hover:bg-blue-800 transition">
            More About US &rarr;
          </button>
        </div>

        {/* Right images */}
        <div className="flex-1 relative w-full flex justify-center lg:justify-end">
          {/* Large Image */}
          <div className="w-full lg:w-4/5 relative">
            {/* <img
              src={"https://images.pexels.com/photos/32734920/pexels-photo-32734920.jpeg"}
              alt="Container Crane"
              className="w-full h-auto rounded-lg shadow-lg"
            /> */}
            hello
            {/* Overlay stats box */}
            <div className="absolute bottom-4 right-0 bg-blue-900 text-white p-4 rounded shadow-lg">
              <h3 className="text-2xl font-bold">1500+</h3>
              <p>Clients Worldwide</p>
            </div>
            {/* Small image */}
            <div className="absolute -bottom-12 left-0 w-1/2 sm:w-1/3">
              {/* <img
                src={"https://images.pexels.com/photos/11123393/pexels-photo-11123393.jpeg"}
                alt="Container Truck"
                className="w-full h-auto rounded-lg shadow-lg border-4 border-white"
              /> */}
              hello 
            </div>
            {/* Decorative top-left accent */}
            <div className="absolute -top-4 -left-4 w-12 h-4 bg-yellow-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
