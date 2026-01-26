import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Layout/Navbar";
import Sidebar from "../../../components/Layout/Sidebar";
import { authFetch } from "../../../utils/api";

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalCandidates: 0,
        totalVotes: 0,
        leadingCandidate: "N/A"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await authFetch("http://localhost:8000/api/table");
                if (response.ok) {
                    const data = await response.json();

                    const totalCandidates = data.length;
                    const totalVotes = data.reduce((acc, curr) => acc + (curr.vote || 0), 0);

                    // Simple logic to find a leader just for stats
                    const leader = data.sort((a, b) => (b.vote || 0) - (a.vote || 0))[0];

                    setStats({
                        totalCandidates,
                        totalVotes,
                        leadingCandidate: leader ? leader.name : "N/A"
                    });
                }
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />

                <div className="p-4 md:p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

                    {/* Widgets Config */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
                            <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">Total Candidates</span>
                            <span className="text-3xl font-extrabold text-gray-800">
                                {loading ? "..." : stats.totalCandidates}
                            </span>
                            <span className="text-xs text-green-500 font-semibold">Active Nominations</span>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
                            <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">Total Votes Cast</span>
                            <span className="text-3xl font-extrabold text-gray-800">
                                {loading ? "..." : stats.totalVotes}
                            </span>
                            <span className="text-xs text-green-500 font-semibold">Live Count</span>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
                            <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">System Status</span>
                            <span className="text-lg font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit">Online</span>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-700 mb-4">Election Overview</h3>
                        <div className="p-8 text-center text-gray-400 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
                            {loading ? "Loading data..." :
                                stats.totalCandidates > 0
                                    ? "Election is active. View Results tab for details."
                                    : "No candidates registered yet."
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
