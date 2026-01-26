import React, { useEffect, useState } from "react";
import Navbar from "../../components/Layout/Navbar";
import Sidebar from "../../components/Layout/Sidebar";

const VoterList = () => {
    // Placeholder data - typically this would come from an API
    const [voters] = useState([
        { id: 1, name: "John Doe", dept: "CS", year: "3rd" },
        { id: 2, name: "Jane Smith", dept: "EE", year: "2nd" },
        { id: 3, name: "Mike Johnson", dept: "ME", year: "4th" },
    ]);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Voter Registry</h1>
                        <button className="bg-accent text-black font-semibold px-4 py-2 rounded-xl text-sm hover:bg-accent-hover transition-colors">
                            Export List
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                                    <th className="p-4 font-semibold">ID</th>
                                    <th className="p-4 font-semibold">Name</th>
                                    <th className="p-4 font-semibold">Department</th>
                                    <th className="p-4 font-semibold">Year</th>
                                    <th className="p-4 font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {voters.map((voter) => (
                                    <tr key={voter.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4 text-sm text-gray-600 font-mono">#{voter.id}</td>
                                        <td className="p-4 text-sm text-gray-800 font-medium">{voter.name}</td>
                                        <td className="p-4 text-sm text-gray-600">{voter.dept}</td>
                                        <td className="p-4 text-sm text-gray-600">{voter.year}</td>
                                        <td className="p-4">
                                            <span className="text-xs font-bold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                                                Eligible
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoterList;
