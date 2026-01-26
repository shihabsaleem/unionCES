import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Layout/Navbar";
import Sidebar from "../../voter/components/Sidebar"; // Voter Sidebar
import { authFetch } from "../../../utils/api";

const VoterDashboard = () => {
    const [counts, setCounts] = useState({ candidates: 0, positions: 4 }); // Assuming 4 fixed positions
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await authFetch("http://localhost:8000/api/table");
                if (response.ok) {
                    const data = await response.json();
                    setCounts(prev => ({ ...prev, candidates: data.length }));
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />

                <div className="p-4 md:p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">Hello, Voter</h1>
                        <p className="text-gray-500">Welcome to UnionCES 2026</p>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
                            <span className="text-xs font-bold text-gray-400 uppercase">Candidates</span>
                            <span className="text-3xl font-extrabold text-gray-800">
                                {loading ? "..." : counts.candidates}
                            </span>
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded w-fit">Registered</span>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
                            <span className="text-xs font-bold text-gray-400 uppercase">Positions</span>
                            <span className="text-3xl font-extrabold text-gray-800">{counts.positions}</span>
                            <span className="text-xs text-gray-400">Open for voting</span>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
                            <span className="text-xs font-bold text-gray-400 uppercase">Status</span>
                            <span className="text-xl font-extrabold text-green-600">LIVE</span>
                            <span className="text-xs text-gray-400">Voting in progress</span>
                        </div>
                    </div>

                    {/* Banner */}
                    <div className="mt-8 bg-black rounded-3xl p-8 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold mb-2">Ready to make your voice heard?</h2>
                            <p className="text-gray-400 mb-6 max-w-lg">
                                Ensure you have reviewed the candidates before casting your secure vote.
                            </p>
                            <a href="/voter/cast" className="inline-block bg-accent text-black px-6 py-3 rounded-xl font-bold hover:bg-accent-hover transition-colors">
                                Go to Polling Station
                            </a>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoterDashboard;
