import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Layout/Navbar";
import Sidebar from "../../../components/Layout/Sidebar";
import { authFetch } from "../../../utils/api";

const VoterList = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await authFetch("http://localhost:8000/api/table");
                if (response.ok) {
                    const data = await response.json();
                    setCandidates(data);
                }
            } catch (error) {
                console.error("Error fetching candidates:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCandidates();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="p-4 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Candidate Registry</h1>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
                        {loading ? (
                            <div className="p-8 text-center text-gray-500">Loading registry...</div>
                        ) : candidates.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">No candidates found.</div>
                        ) : (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                                        <th className="p-4 font-semibold">Admission ID</th>
                                        <th className="p-4 font-semibold">Name</th>
                                        <th className="p-4 font-semibold">Dept / Sem</th>
                                        <th className="p-4 font-semibold">Position</th>
                                        <th className="p-4 font-semibold">Votes</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {candidates.map((candidate) => (
                                        <tr key={candidate.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="p-4 text-sm text-gray-600 font-mono">#{candidate.id}</td>
                                            <td className="p-4 text-sm text-gray-800 font-medium">{candidate.name}</td>
                                            <td className="p-4 text-sm text-gray-600">{candidate.dept} - S{candidate.sem}</td>
                                            <td className="p-4 text-sm text-gray-600 capitalize">{candidate.seat}</td>
                                            <td className="p-4">
                                                <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
                                                    {candidate.vote}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoterList;
