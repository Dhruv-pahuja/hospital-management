import React from "react";

function Banner() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg flex items-center space-x-8">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold text-blue-900 mb-6">
            We Are Always Here To Ensure Best Medical Treatment
          </h1>
          <ul className="space-y-4 text-blue-900">
            <li className="flex items-center">
              <i className="fas fa-star-of-life mr-3"></i> Easy make appointment
            </li>
            <li className="flex items-center">
              <i className="fas fa-star-of-life mr-3"></i> Top specialist
              doctors
            </li>
            <li className="flex items-center">
              <i className="fas fa-star-of-life mr-3"></i> 24/7 service
            </li>
            <li className="flex items-center">
              <i className="fas fa-star-of-life mr-3"></i> Discount for all
              medical treatments
            </li>
            <li className="flex items-center">
              <i className="fas fa-star-of-life mr-3"></i> Enrolment is quick
              and easy
            </li>
          </ul>
        </div>
        <div>
          <img
            src="https://romaletodiani.github.io/Hospital-Website/assets/banner1-082d6792.png"
            alt="Illustration of a group of doctors"
            className="rounded-lg shadow-lg w-full max-w-sm"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
