
import { Link } from "react-router-dom";

function Main() {
  return (
    <main className="container mx-auto mt-16 flex items-center justify-between ">
      <div className="max-w-lg flex flex-col items-center text-center ml-14">
        <h2 className="text-5xl font-extrabold leading-tight text-blue-900 mb-6">
          Your Health Is Our Top Priority
        </h2>
        <p className="text-gray-600 mb-8 text-lg leading-relaxed ml-3">
          Efficient healthcare services at your fingertips. Expert doctors,
          seamless appointments, and 24/7 support for you.
        </p>

        <div className="flex mx-auto space-x-4">
          <Link to={'/appointment'} className="w-[210px] px-6 py-4 rounded-full bg-blue-500 text-white font-semibold text-lg hover:bg-blue-600 transition duration-300 shadow-lg">
            Book an Appointment
          </Link>
        </div>
      </div>
      <div className="flex justify-center w-[50%]">
        <img
          src="https://romaletodiani.github.io/Hospital-Website/assets/hero-7f1bb39c.png"
          alt="Doctor Group"
          className="rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
        />
      </div>
    </main>
  );
}

export default Main;
