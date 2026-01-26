import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Layout/Navbar";
import Sidebar from "../../../components/Layout/Sidebar";
import { authFetch } from "../../../utils/api";

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalCandidates: 0,
        totalVotes: 0
    });
    const [pollingActive, setPollingActive] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch Table Data for Counts
                const response = await authFetch("http://localhost:8000/api/table");
                if (response.ok) {
                    const data = await response.json();
                    const totalVotes = data.reduce((acc, curr) => acc + curr.vote, 0);
                    setStats({
                        totalCandidates: data.length,
                        totalVotes: totalVotes
                    });
                }

                // Fetch Polling Status
                const statusRes = await authFetch("http://localhost:8000/api/polling_status");
                if (statusRes.ok) {
                    const statusData = await statusRes.json();
                    setPollingActive(statusData.polling_active);
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const handleTogglePolling = async () => {
        const action = pollingActive ? "stop" : "start";
        const confirmMsg = pollingActive
            ? "Are you sure you want to STOP the election? Voters will not be able to cast votes."
            : "Are you sure you want to START the election? New votes will be accepted.";

        if (!window.confirm(confirmMsg)) return;

        try {
            const response = await authFetch("http://localhost:8000/api/control", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: action })
            });

            if (response.ok) {
                const data = await response.json();
                setPollingActive(data.polling_active);
            } else {
                alert("Failed to update status");
            }
        } catch (error) {
            console.error("Error toggling polling:", error);
            alert("Network error.");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />

                <div className="p-4 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
                        {/* Optional: Add timestamp or refresh button here */}
                    </div>

                    {/* Widgets Config */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Total Candidates */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                            <div className="absolute right-[-10px] bottom-[-10px] opacity-5 transform rotate-[-10deg] group-hover:scale-110 transition-transform">
                                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
                            </div>
                            <div className="relative z-10 flex flex-col justify-between h-32">
                                <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Total Candidates</span>
                                <span className="text-4xl font-bold text-gray-800 mt-2">
                                    {loading ? "..." : stats.totalCandidates}
                                </span>
                                <div className="mt-auto pt-4">
                                    <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded-lg font-medium">Active Nominations</span>
                                </div>
                            </div>
                        </div>

                        {/* Votes Cast */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                            <div className="absolute right-[-10px] bottom-[-10px] opacity-5 transform rotate-[-10deg] group-hover:scale-110 transition-transform">
                                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" /></svg>
                            </div>
                            <div className="relative z-10 flex flex-col justify-between h-32">
                                <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Total Votes Cast</span>
                                <span className="text-4xl font-bold text-gray-800 mt-2">
                                    {loading ? "..." : stats.totalVotes}
                                </span>
                                <div className="mt-auto pt-4">
                                    <span className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-lg font-medium">Live Count</span>
                                </div>
                            </div>
                        </div>

                        {/* System Control Widget */}
                        <div className={`p-6 rounded-3xl shadow-sm border relative overflow-hidden group hover:shadow-md transition-all duration-300 ${pollingActive ? 'bg-white border-green-100' : 'bg-gray-50 border-gray-200'}`}>
                            <div className="absolute right-[-10px] bottom-[-10px] opacity-5 transform rotate-[-10deg] group-hover:scale-110 transition-transform">
                                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                            </div>
                            <div className="relative z-10 flex flex-col justify-between h-32">
                                <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">System Control</span>

                                <div className="mt-2 flex items-center gap-2">
                                    <span className="relative flex h-3 w-3">
                                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pollingActive ? 'bg-green-400' : 'bg-red-400'}`}></span>
                                        <span className={`relative inline-flex rounded-full h-3 w-3 ${pollingActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    </span>
                                    <span className={`text-xl font-bold ${pollingActive ? 'text-green-600' : 'text-red-500'}`}>
                                        {pollingActive ? "Polling Active" : "Polling Stopped"}
                                    </span>
                                </div>

                                <div className="mt-auto pt-4 flex gap-2">
                                    <button
                                        onClick={handleTogglePolling}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95 ${pollingActive
                                                ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-100'
                                                : 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-100'
                                            }`}
                                    >
                                        {pollingActive ? "Stop Election" : "Start Election"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Election Overview</h3>
                        <div className="p-8 text-center text-gray-400 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
                            {loading ? "Loading data..." :
                                stats.totalCandidates > 0
                                    ? <span className="text-gray-600">Overview Available. Select "Manage Candidates" or "Results" for details.</span>
                                    : "No election data available yet."
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
