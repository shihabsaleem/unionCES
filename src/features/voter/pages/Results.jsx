import React, { useEffect, useState } from 'react'
import Navbar from "../../../components/Layout/Navbar";
import Sidebar from "../components/Sidebar"; // Voter Sidebar
import { authFetch } from "../../../utils/api";

const VoterResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await authFetch("http://localhost:8000/api/result");
                if (response.ok) {
                    const data = await response.json();
                    setResults(data);
                }
            } catch (error) {
                console.error("Error fetching results:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, []);

    // Helper map for clean seat names
    const seatMap = {
        "chair": "Chairman",
        "vchair": "Vice Chairman",
        "secretery": "Secretary",
        "ladyrep": "Lady Representative"
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="p-4 md:p-8">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6 font-mono">Election Results</h1>

                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Loading results...</div>
                    ) : results.length === 0 ? (
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                            <h2 className="text-lg font-semibold text-gray-600 mb-2">Results are being tabulated</h2>
                            <p className="text-sm text-gray-400">No votes recorded yet. Check back later.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                            {results.map((candidate, index) => (
                                <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-lg font-semibold text-gray-700 capitalize">
                                            {seatMap[candidate.seat] || candidate.seat}
                                        </h2>
                                        <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-md">LEADER</span>
                                    </div>

                                    {/* Winner / Leader */}
                                    <div className="flex items-center gap-4 mb-6 p-4 bg-accent/10 rounded-xl border border-accent/20">
                                        <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center font-semibold text-black border-2 border-white shadow-sm">
                                            1st
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900">{candidate.name}</div>
                                            <div className="text-xs text-gray-500">{candidate.dept} - S{candidate.semester}</div>
                                        </div>
                                        <div className="ml-auto text-2xl font-semibold text-gray-800">{candidate.vote} <span className="text-xs font-medium text-gray-400">votes</span></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VoterResults
