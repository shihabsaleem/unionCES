import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Layout/Navbar";
import Sidebar from "../../voter/components/Sidebar"; // Voter Sidebar
import { authFetch } from "../../../utils/api";

const VoterDashboard = () => {
    const [counts, setCounts] = useState({ candidates: 0, positions: 4 });
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState({
        pollingActive: true,
        hasVoted: false
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch Counts
                const response = await authFetch("http://localhost:8000/api/table");
                if (response.ok) {
                    const data = await response.json();
                    setCounts(prev => ({ ...prev, candidates: data.length }));
                }

                // Fetch Start/Stop Status
                const pollRes = await authFetch("http://localhost:8000/api/polling_status");
                let isActive = true;
                if (pollRes.ok) {
                    const pollData = await pollRes.json();
                    isActive = pollData.polling_active;
                }

                // Fetch User Vote Status
                const userRes = await authFetch("http://localhost:8000/api/status");
                let voted = false;
                if (userRes.ok) {
                    const userData = await userRes.json();
                    voted = userData.has_voted;
                }

                setStatus({ pollingActive: isActive, hasVoted: voted });

            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    // Determine Status UI
    const getStatusUI = () => {
        if (status.hasVoted) {
            return {
                label: "VOTED",
                sub: "Vote Confirmed",
                color: "green",
                icon: (
                    <svg className="w-24 h-24 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                )
            };
        } else if (!status.pollingActive) {
            return {
                label: "CLOSED",
                sub: "Voting Suspended",
                color: "red",
                icon: (
                    <svg className="w-24 h-24 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
                )
            };
        } else {
            return {
                label: "ACTIVE",
                sub: "Eligible to Vote",
                color: "blue",
                icon: (
                    <svg className="w-24 h-24 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                )
            };
        }
    };

    const ui = getStatusUI();

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />

                <div className="p-4 md:p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold text-gray-800">Hello, {localStorage.getItem("username") || "Voter"}</h1>
                        <p className="text-gray-500">Welcome to UnionCES 2026</p>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* Candidates Widget */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-24 h-24 text-gray-900" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                            </div>
                            <div className="flex flex-col justify-between h-32 relative z-10">
                                <div>
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Candidates</span>
                                    <div className="flex items-baseline mt-2">
                                        <span className="text-4xl font-bold text-gray-900">
                                            {loading ? "..." : counts.candidates}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full animate-pulse ${status.pollingActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    <span className={`text-xs font-medium px-2 py-1 rounded-lg ${status.pollingActive ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                                        {status.pollingActive ? "Registration Open" : "Voting Closed"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Positions Widget */}
                        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all duration-300">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-24 h-24 text-gray-900" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" /></svg>
                            </div>
                            <div className="flex flex-col justify-between h-32 relative z-10">
                                <div>
                                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Positions</span>
                                    <div className="flex items-baseline mt-2">
                                        <span className="text-4xl font-bold text-gray-900">{counts.positions}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-400">Fixed Seats</span>
                                </div>
                            </div>
                        </div>

                        {/* Status Widget */}
                        <div className={`bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all duration-300`}>
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                {ui.icon}
                            </div>
                            <div className="flex flex-col justify-between h-32 relative z-10">
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">My Status</span>
                                <div>
                                    <span className={`text-2xl font-bold text-${ui.color}-600`}>
                                        {ui.label}
                                    </span>
                                    <p className="text-xs text-gray-400 mt-1">{ui.sub}</p>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                                    <div className={`bg-${ui.color}-600 h-1.5 rounded-full`} style={{ width: '100%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Banner */}
                    <div className="mt-8 bg-black rounded-3xl p-8 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            {!status.pollingActive ? (
                                <>
                                    <h2 className="text-2xl font-semibold mb-2 text-red-400">Election Suspended</h2>
                                    <p className="text-gray-400 mb-6 max-w-lg">
                                        The polls are currently closed. You cannot cast votes at this time.
                                    </p>
                                    <div className="inline-block bg-gray-800 text-gray-500 px-6 py-3 rounded-xl font-semibold cursor-not-allowed">
                                        Polling Closed
                                    </div>
                                </>
                            ) : status.hasVoted ? (
                                <>
                                    <h2 className="text-2xl font-semibold mb-2 text-green-400">Thank you for voting!</h2>
                                    <p className="text-gray-400 mb-6 max-w-lg">
                                        Your vote has been securely recorded. You can view your digital ballot in the "My Ballot" section.
                                    </p>
                                    <a href="/voter/voted" className="inline-block bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors">
                                        View My Ballot
                                    </a>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-semibold mb-2">Ready to make your voice heard?</h2>
                                    <p className="text-gray-400 mb-6 max-w-lg">
                                        Ensure you have reviewed the candidates before casting your secure vote.
                                    </p>
                                    <a href="/voter/cast" className="inline-block bg-accent text-black px-6 py-3 rounded-xl font-semibold hover:bg-accent-hover transition-colors">
                                        Go to Polling Station
                                    </a>
                                </>
                            )}
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoterDashboard;
