import React from "react";
import Count from "./Count";
import Banner from "./Banner";
import Service from "./Service";
import GoogleTranslate from "./GoogleTranslate";
import EmergencyButton from "./EmergencyButton";
import SearchHospitals from "./SearchHospitals";
import ButtonGroup from "./ButtonGroup";
import DoctorsPage from "./DoctorsPage";
import Header from "./Header";
import Main from "./Main";
import { FaCalendarCheck, FaHospital, FaUserMd } from "react-icons/fa";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-white text-gray-700 font-inter">
      <Main />

      <section className="flex justify-evenly mx-4 mt-12">
        <Count number="500+" label="Expert Doctors" />
        <Count number="300+" label="Hospital Beds" />
        <Count number="100+" label="Operating Theaters" />
        <Count number="200+" label="Ambulance Services" />
        <Count number="50+" label="Specialized Clinics" />
        <Count number="10,000+" label="Happy Patients" />
      </section>

      <div className="w-full flex justify-center mt-14 ">
        <div className="w-[50%]">
          <SearchHospitals onSearch="Pune" />
        </div>
      </div>
      <div className="flex justify-center mt-7 mb-7">
        <div className="w-full max-w-4xl flex justify-around space-x-6">
          {/* Button for Appointment */}
          <Link to="/appointment"> 
          <EmergencyButton
            tx="Book an Appointment"
            icon={<FaCalendarCheck className="text-xl" />}
          />
          </Link>

          {/* Button for Hospitals */}
          <Link to="/hospitals">
          <EmergencyButton
            tx="Hospitals"
            icon={<FaHospital className="text-xl" />}
          />
          </Link>

          {/* Button for Doctors */}
          <EmergencyButton
            tx="Doctors"
            icon={<FaUserMd className="text-xl" />}
            link="/doctors" // Ensure this is the correct path
          />
        </div>
      </div>

      <section className="mt-16">
        <Banner />
      </section>
      <section className="mt-16">
        <Service />
      </section>

      {/* <section className="mt-16">
            <GoogleTranslate />
          </section> */}
    </div>
  );
}

export default Home;
