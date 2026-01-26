import React from 'react'
import Navbar from "../../../components/Layout/Navbar";
import Sidebar from "../components/Sidebar"; // Voter Sidebar

const VoterResults = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="p-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6 font-mono">Election Results</h1>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                        <h2 className="text-lg font-semibold text-gray-600 mb-2">Results are being tabulated</h2>
                        <p className="text-sm text-gray-400">Check back later for final counts</p>

                        {/*  Reuse the Admin Result Grid here if we want to show live results to voters too. 
                      For now, using a simple placeholder to match the 'clean' requirement. 
                 */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VoterResults
