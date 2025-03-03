import "react";
import Count from "./Count";
import Banner from "./Banner";
import Service from "./Service";
import Main from "./Main";
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

      
      <div className="flex justify-center mt-7 mb-7">
        <div className="w-full max-w-4xl flex justify-around space-x-6">
          {/* Button for Appointment */}
          <Link to="/appointment"> 
          
          </Link>

          {/* Button for Hospitals */}
          <Link to="/hospitals">
          
          </Link>

          {/* Button for Doctors */}
        
        </div>
      </div>

      <section className="mt-16">
        <Banner />
      </section>
      <section className="mt-16">
        <Service />
      </section>

    </div>
  );
}

export default Home;
