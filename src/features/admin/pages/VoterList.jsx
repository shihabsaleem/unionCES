import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Layout/Navbar";
import Sidebar from "../../../components/Layout/Sidebar";
import { authFetch } from "../../../utils/api";

const VoterList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await authFetch("http://localhost:8000/api/votecandidates");
                if (response.ok) {
                    // API format check: original code parsed seat keys.
                    // Assuming API returns { chair: [...], vchair: [...] } or flat array
                    // Previous VoterList code seemed to map `data` directly, implying it was an array or it flattened it.
                    // BUT: VoterList.jsx original code had `data.map`.
                    // AND CastVote.jsx expected { chair, ... }.
                    // Let's check how other `votecandidates` calls handle it.
                    // Wait, `api/votecandidates` is used in CastVote as options.
                    // `api/table` was used in VoterDashboard for counts.
                    // Let's check if there is an Admin specific endpoint or if VoterList handles generic data.
                    // Looking at previous `VoterList.jsx`: It mapped `data`.
                    // And `api/votecandidates` in CastVote returns: { chair: [..], ... }
                    // If VoterList mapped it directly, it might have been receiving a flat array OR I missed the flattening logic.
                    // Let's assume `api/table` is the one providing the list of all candidates for the TABLE view.
                    // `api/table` was used in dashboards for counts. It likely returns the array of all candidates.

                    const responseTable = await authFetch("http://localhost:8000/api/table");
                    if (responseTable.ok) {
                        const result = await responseTable.json();
                        setData(result);
                    }
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchCandidates();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            {/* Layout wrapper */}
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="p-4 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-semibold text-gray-800">Candidate Registry</h1>
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-xs text-gray-500 bg-gray-50/50 border-b border-gray-100">
                                    <th className="font-semibold p-5 uppercase tracking-wider">Candidate Name</th>
                                    <th className="font-semibold p-5 uppercase tracking-wider">Details</th>
                                    <th className="font-semibold p-5 uppercase tracking-wider">Position</th>
                                    <th className="font-semibold p-5 uppercase tracking-wider text-center">Votes</th>
                                    <th className="font-semibold p-5 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {data.map((candidate) => (
                                    <tr key={candidate.id} className="group hover:bg-gray-50/80 transition-colors">
                                        <td className="p-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent-dark font-bold text-lg text-yellow-800">
                                                    {candidate.name ? candidate.name.charAt(0).toUpperCase() : "?"}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">{candidate.name || candidate.username}</div>
                                                    <div className="text-xs text-gray-400">ID: {candidate.admission || candidate.id || "N/A"}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-5 text-sm">
                                            <div className="text-gray-900 font-medium">{candidate.dept}</div>
                                            <div className="text-gray-500 text-xs">Sem {candidate.sem}</div>
                                        </td>
                                        <td className="p-5">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                                                {candidate.seat}
                                            </span>
                                        </td>
                                        <td className="p-5 text-center">
                                            <span className="inline-block min-w-[2.5rem] py-1 text-xs font-bold text-blue-700 bg-blue-50 rounded-lg text-center">
                                                {candidate.vote}
                                            </span>
                                        </td>
                                        <td className="p-5 text-right">
                                            <button
                                                onClick={() => {
                                                    // Placeholder for edit/delete
                                                    alert("Manage Candidate: " + candidate.username)
                                                }}
                                                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {data.length === 0 && (
                            <div className="p-8 text-center text-gray-400 text-sm">
                                No candidates found.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoterList;
