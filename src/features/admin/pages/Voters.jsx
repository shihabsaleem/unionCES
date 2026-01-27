import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Layout/Navbar";
import Sidebar from "../../../components/Layout/Sidebar";
import { authFetch } from "../../../utils/api";

const Voters = () => {
    const [voters, setVoters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchVoters();
    }, []);

    const fetchVoters = async () => {
        try {
            const response = await authFetch("http://localhost:8000/api/voters");
            if (response.ok) {
                const data = await response.json();
                setVoters(data);
            }
        } catch (error) {
            console.error("Error fetching voters:", error);
        } finally {
            setLoading(false);
        }
    };

    // Filter voters based on search term
    const filteredVoters = voters.filter(voter =>
        voter.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        voter.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        voter.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const votedCount = voters.filter(v => v.has_voted).length;
    const notVotedCount = voters.length - votedCount;

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="p-4 md:p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800">Voter Registry</h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Total: {voters.length} | Voted: {votedCount} | Pending: {notVotedCount}
                            </p>
                        </div>
                        <button
                            onClick={fetchVoters}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Refresh
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Search by username or name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Voter Table */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-xs text-gray-500 bg-gray-50/50 border-b border-gray-100">
                                    <th className="font-semibold p-5 uppercase tracking-wider">Username</th>
                                    <th className="font-semibold p-5 uppercase tracking-wider">Full Name</th>
                                    <th className="font-semibold p-5 uppercase tracking-wider">Email</th>
                                    <th className="font-semibold p-5 uppercase tracking-wider text-center">Status</th>
                                    <th className="font-semibold p-5 uppercase tracking-wider">Voted On</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-gray-400">
                                            Loading voters...
                                        </td>
                                    </tr>
                                ) : filteredVoters.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-gray-400">
                                            No voters found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredVoters.map((voter) => (
                                        <tr key={voter.id} className="group hover:bg-gray-50/80 transition-colors">
                                            <td className="p-5">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                                                        {voter.username.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="font-medium text-gray-900">{voter.username}</div>
                                                </div>
                                            </td>
                                            <td className="p-5 text-sm text-gray-900">
                                                {voter.first_name} {voter.last_name}
                                            </td>
                                            <td className="p-5 text-sm text-gray-600">
                                                {voter.email || "N/A"}
                                            </td>
                                            <td className="p-5 text-center">
                                                {voter.has_voted ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        ✓ Voted
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                                        Not Voted
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-5 text-sm text-gray-600">
                                                {voter.voted_on ? new Date(voter.voted_on).toLocaleString() : "-"}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Voters;
