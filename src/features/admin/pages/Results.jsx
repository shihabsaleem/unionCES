import React from 'react'
import Navbar from "../../components/Layout/Navbar";
import Sidebar from "../../components/Layout/Sidebar";

const AdminResults = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 font-mono">Live Election Results</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {/* Result Card Example */}
                        {['Chairman', 'Vice Chairman', 'Secretary', 'Lady Rep'].map((seat) => (
                            <div key={seat} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-bold text-gray-700">{seat}</h2>
                                    <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-md">LIVE</span>
                                </div>

                                {/* Winner / Leader */}
                                <div className="flex items-center gap-4 mb-6 p-4 bg-accent/10 rounded-xl border border-accent/20">
                                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center font-bold text-black border-2 border-white shadow-sm">
                                        1st
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900">Alex Johnson</div>
                                        <div className="text-xs text-gray-500">Computer Science - S6</div>
                                    </div>
                                    <div className="ml-auto text-2xl font-black text-gray-800">42%</div>
                                </div>

                                {/* Runners up */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600 font-medium">2. Sarah Williams</span>
                                        <span className="font-bold text-gray-400">38%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                        <div className="bg-gray-400 h-2 rounded-full" style={{ width: '38%' }}></div>
                                    </div>
                                    <div className="flex items-center justify-between text-sm pt-2">
                                        <span className="text-gray-600 font-medium">3. Mike Brown</span>
                                        <span className="font-bold text-gray-400">20%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                        <div className="bg-gray-300 h-2 rounded-full" style={{ width: '20%' }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminResults
