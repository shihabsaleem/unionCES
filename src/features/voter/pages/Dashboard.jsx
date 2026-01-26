import React from "react";
import Navbar from "../../../components/Layout/Navbar";
import Sidebar from "../components/Sidebar"; // Voter Sidebar

const VoterDashboard = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />

                <div className="p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">Hello, Voter</h1>
                        <p className="text-gray-500">Welcome to UnionCES 2026</p>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
                            <span className="text-xs font-bold text-gray-400 uppercase">Candidates</span>
                            <span className="text-3xl font-extrabold text-gray-800">12</span>
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded w-fit">Active</span>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
                            <span className="text-xs font-bold text-gray-400 uppercase">Positions</span>
                            <span className="text-3xl font-extrabold text-gray-800">4</span>
                            <span className="text-xs text-gray-400">Open for voting</span>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32">
                            <span className="text-xs font-bold text-gray-400 uppercase">Election Status</span>
                            <span className="text-xl font-extrabold text-green-600">LIVE</span>
                            <span className="text-xs text-gray-400">Ends in 4 hours</span>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32 border-l-4 border-l-accent">
                            <span className="text-xs font-bold text-gray-400 uppercase">Your Vote</span>
                            <span className="text-xl font-extrabold text-gray-800">Not Cast</span>
                            <span className="text-xs text-red-500">Action Required</span>
                        </div>
                    </div>

                    {/* Banner */}
                    <div className="mt-8 bg-black rounded-3xl p-8 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold mb-2">Ready to make your voice heard?</h2>
                            <p className="text-gray-400 mb-6 max-w-lg">
                                Voting is now open for all departments. Ensure you have reviewed the candidates before casting your secure vote.
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
