import React from "react";
import Navbar from "../../components/Layout/Navbar"; // Will move here
import Sidebar from "../../components/Layout/Sidebar"; // Will move here

const Dashboard = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />

                <div className="p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

                    {/* Widgets Config */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Widget Example */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
                            <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">Total Voters</span>
                            <span className="text-3xl font-extrabold text-gray-800">1,240</span>
                            <span className="text-xs text-green-500 font-semibold">+5% since last week</span>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
                            <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">Votes Cast</span>
                            <span className="text-3xl font-extrabold text-gray-800">890</span>
                            <span className="text-xs text-green-500 font-semibold">72% Turnout</span>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
                            <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">Candidates</span>
                            <span className="text-3xl font-extrabold text-gray-800">12</span>
                            <span className="text-xs text-gray-400 font-semibold">Active</span>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-32 hover:shadow-md transition-shadow">
                            <span className="text-gray-400 text-sm font-bold uppercase tracking-wider">Server Status</span>
                            <span className="text-lg font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full w-fit">Online</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Chart Placeholder */}
                        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-700 mb-4">Election Overview</h3>
                            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                                <span className="text-gray-400 font-medium">Chart Visualization Coming Soon</span>
                            </div>
                        </div>

                        {/* Recent Activity / Featured */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-700 mb-4">Live Updates</h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-3 pb-3 border-b border-gray-50 last:border-0">
                                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                                        <div className="text-sm text-gray-600">New vote cast in CS Dept.</div>
                                        <div className="ml-auto text-xs text-gray-400">2m ago</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
