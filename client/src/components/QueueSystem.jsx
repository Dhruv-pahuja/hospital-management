import { useEffect, useState } from "react";

const socket = new WebSocket("ws://localhost:4000");

const QueueComponent = () => {
  const [queues, setQueues] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/opdQueue")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched initial queue:", data);
        setQueues(data);
      });

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received WebSocket update:", data);
      if (data.type === "queue") {
        setQueues(data.opdQueues);
      }
    };

    return () => socket.close();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-center text-3xl font-bold text-blue-600 mb-6">OPD Queues</h2>

      {queues.length === 0 ? (
        <p className="text-center text-gray-500">No patients in the queue.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {queues.map((queue) => {
            // Sort appointments: Pending first, then Completed
            const sortedAppointments = [...queue.appointments].sort((a, b) => 
              a.status === "pending" && b.status !== "pending" ? -1 :
              a.status !== "pending" && b.status === "pending" ? 1 : 0
            );

            return (
              <div key={queue._id} className="bg-white shadow-lg rounded-lg p-4 border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-800">{queue.department} Department</h3>
                <ul className="mt-2">
                  {sortedAppointments.map((appt, index) => (
                    <li key={index} className="border-b py-2 text-gray-700">
                      <span className="font-medium">{appt.patientName}</span>  
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${appt.status === "pending" ? "bg-yellow-200 text-yellow-800" : "bg-green-200 text-green-800"}`}>
                        {appt.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QueueComponent;
