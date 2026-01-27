import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Layout/Navbar";
import Sidebar from "../../../components/Layout/Sidebar";
import { authFetch } from "../../../utils/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [pollingActive, setPollingActive] = useState(false);
    const [resultsPublished, setResultsPublished] = useState(false);
    // Removed unused recentVotes state
    const [stats, setStats] = useState({
        totalCandidates: 0,
        totalVotes: 0
    });
    const [topCandidates, setTopCandidates] = useState([]);
    const [turnout, setTurnout] = useState({
        totalVoters: 0,
        votesCast: 0,
        turnoutPercentage: 0
    });
    const [lastUpdated, setLastUpdated] = useState(new Date());

    const fetchStats = async () => {
        try {
            // Fetch Table Data for Counts
            const response = await authFetch("http://localhost:8000/api/table");
            if (response.ok) {
                const data = await response.json();
                // Calculate total votes
                const totalVotes = data.reduce((sum, candidate) => sum + candidate.vote, 0);
                setStats({
                    totalCandidates: data.length,
                    totalVotes: totalVotes
                });

                // Get top 5 candidates for the chart
                const sorted = [...data].sort((a, b) => b.vote - a.vote).slice(0, 5);
                setTopCandidates(sorted);
            }

            // Fetch Polling & Result Status
            const statusRes = await authFetch("http://localhost:8000/api/polling_status");
            if (statusRes.ok) {
                const statusData = await statusRes.json();
                setPollingActive(statusData.polling_active);
                setResultsPublished(statusData.results_published);
            }

            // Fetch Turnout Data
            const turnoutRes = await authFetch("http://localhost:8000/api/turnout");
            if (turnoutRes.ok) {
                const turnoutData = await turnoutRes.json();
                setTurnout({
                    totalVoters: turnoutData.total_voters,
                    votesCast: turnoutData.votes_cast,
                    turnoutPercentage: turnoutData.turnout_percentage
                });
            }

            setLastUpdated(new Date());
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch and auto-refresh every 30 seconds
    useEffect(() => {
        fetchStats();
        const interval = setInterval(fetchStats, 30000); // Auto-refresh every 30 seconds
        return () => clearInterval(interval);
    }, []);

    const togglePolling = async () => {
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

    const toggleResultPublication = async () => {
        const action = resultsPublished ? "hide_results" : "publish_results";
        try {
            const response = await authFetch("http://localhost:8000/api/control", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: action })
            });

            if (response.ok) {
                const data = await response.json();
                setResultsPublished(data.results_published);
                alert(`Results ${data.results_published ? "Published" : "Hidden"} Successfully!`);
            }
        } catch (error) {
            console.error("Error toggling results:", error);
            alert("Network error.");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />

                <div className="p-4 md:p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
                            <p className="text-gray-500 text-sm mt-1">Election monitoring dashboard</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs text-gray-400 font-medium">
                                Last updated: {lastUpdated.toLocaleTimeString()}
                            </span>
                            <div className={`px-4 py-2 rounded-xl flex items-center gap-2 ${pollingActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                <div className={`w-2 h-2 rounded-full ${pollingActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                                <span className="text-sm font-semibold">{pollingActive ? "Polling Active" : "Polling Stopped"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Widgets Config */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                        <div className={`p-6 rounded-3xl shadow-sm border relative overflow-hidden group hover:shadow-md transition-all duration-300 bg-white border-gray-200`}>
                            <div className="absolute right-[-10px] bottom-[-10px] opacity-5 transform rotate-[-10deg] group-hover:scale-110 transition-transform">
                                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                            </div>
                            <div className="relative z-10 flex flex-col justify-between h-full min-h-[140px]">
                                <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">System Control</span>

                                <div className="mt-2 space-y-3">
                                    {/* Polling Status */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${pollingActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                            <span className={`text-sm font-bold ${pollingActive ? 'text-green-600' : 'text-red-500'}`}>
                                                {pollingActive ? "Polling Active" : "Polling Stopped"}
                                            </span>
                                        </div>
                                        <button
                                            onClick={togglePolling}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${pollingActive
                                                ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-100'
                                                : 'bg-green-50 text-green-600 hover:bg-green-100 border border-green-100'
                                                }`}
                                        >
                                            {pollingActive ? "Stop" : "Start"}
                                        </button>
                                    </div>

                                    {/* Result Status */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${resultsPublished ? 'bg-blue-500' : 'bg-gray-400'}`}></span>
                                            <span className={`text-sm font-bold ${resultsPublished ? 'text-blue-600' : 'text-gray-500'}`}>
                                                {resultsPublished ? "Results Public" : "Results Hidden"}
                                            </span>
                                        </div>
                                        <button
                                            onClick={toggleResultPublication}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${resultsPublished
                                                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200'
                                                : 'bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-100'
                                                }`}
                                        >
                                            {resultsPublished ? "Hide" : "Publish"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Voter Turnout Widget */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                            <div className="absolute right-[-10px] bottom-[-10px] opacity-5 transform rotate-[-10deg] group-hover:scale-110 transition-transform">
                                <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                            </div>
                            <div className="relative z-10 flex flex-col justify-between h-32">
                                <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Voter Turnout</span>

                                <div className="flex items-center gap-3 mt-2">
                                    {/* Circular Progress */}
                                    <div className="relative w-16 h-16">
                                        <svg className="transform -rotate-90 w-16 h-16">
                                            <circle cx="32" cy="32" r="28" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                                            <circle
                                                cx="32"
                                                cy="32"
                                                r="28"
                                                stroke="#3b82f6"
                                                strokeWidth="6"
                                                fill="none"
                                                strokeDasharray={`${2 * Math.PI * 28}`}
                                                strokeDashoffset={`${2 * Math.PI * 28 * (1 - turnout.turnoutPercentage / 100)}`}
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="text-sm font-bold text-gray-800">
                                                {loading ? "..." : `${turnout.turnoutPercentage}%`}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="text-2xl font-bold text-gray-800">
                                            {loading ? "..." : turnout.votesCast}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            of {loading ? "..." : turnout.totalVoters} voters
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto pt-4">
                                    <span className="text-xs text-purple-700 bg-purple-100 px-2 py-1 rounded-lg font-medium">Participation Rate</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Election Overview - Top Candidates</h3>
                        {loading ? (
                            <div className="p-8 text-center text-gray-400 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
                                Loading data...
                            </div>
                        ) : topCandidates.length === 0 ? (
                            <div className="p-8 text-center text-gray-400 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
                                No election data available yet.
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={topCandidates} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="name"
                                        angle={-45}
                                        textAnchor="end"
                                        height={80}
                                        tick={{ fontSize: 11 }}
                                    />
                                    <YAxis
                                        label={{ value: 'Votes', angle: -90, position: 'insideLeft' }}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '8px',
                                            padding: '12px'
                                        }}
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                const data = payload[0].payload;
                                                const seatMap = {
                                                    "chair": "Chairman",
                                                    "vchair": "Vice Chairman",
                                                    "secretery": "Secretary",
                                                    "ladyrep": "Lady Representative"
                                                };
                                                return (
                                                    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
                                                        <p className="font-semibold text-gray-800">{data.name}</p>
                                                        <p className="text-sm text-gray-600">{seatMap[data.seat] || data.seat}</p>
                                                        <p className="text-sm text-gray-500">{data.dept} - S{data.sem}</p>
                                                        <p className="text-lg font-bold text-blue-600 mt-1">{data.vote} votes</p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Legend
                                        wrapperStyle={{ paddingTop: '10px' }}
                                        formatter={() => 'Vote Count'}
                                    />
                                    <Bar dataKey="vote" radius={[8, 8, 0, 0]}>
                                        {topCandidates.map((entry, index) => {
                                            const colorMap = {
                                                'chair': '#3b82f6',
                                                'vchair': '#10b981',
                                                'secretery': '#f59e0b',
                                                'ladyrep': '#ef4444'
                                            };
                                            return <Cell key={`cell-${index}`} fill={colorMap[entry.seat] || '#6b7280'} />;
                                        })}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
