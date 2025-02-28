/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const QueueSystem = ({ doctorId }) => {
    const [queue, setQueue] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) return;

        const ws = new WebSocket("ws://localhost:4000", token);

        ws.onmessage = (message) => {
            const data = JSON.parse(message.data);
            if (data.type === "queue") {
                setQueue(data.queue);
            }
        };

        return () => ws.close();
    }, [token]);

    return (
        <div className="min-h-screen p-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 relative">
            <h2 className="text-2xl font-bold mb-4 text-center">Live OPD Queue</h2>

            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
                <h3 className="text-xl font-semibold mb-4">Current Queue</h3>
                <ul className="divide-y divide-gray-300 dark:divide-gray-700">
                    {queue.length > 0 ? (
                        queue.map((user, index) => (
                            <li key={user.id} className="py-3 text-lg">
                                <span className="font-medium">{index + 1}. {user.name}</span>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">No patients in queue.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

QueueSystem.propTypes = {
    doctorId: PropTypes.string.isRequired,
};

export default QueueSystem;
