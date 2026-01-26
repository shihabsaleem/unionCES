import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/Layout/Navbar";
import Sidebar from "../components/Sidebar";
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { authFetch } from "../../../utils/api";

const MyBallot = () => {
    const [hasVoted, setHasVoted] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkStatus = async () => {
            try {
                const response = await authFetch("http://localhost:8000/api/status");
                if (response.ok) {
                    const data = await response.json();
                    setHasVoted(data.has_voted);
                }
            } catch (error) {
                console.error("Error checking status:", error);
            } finally {
                setLoading(false);
            }
        };
        checkStatus();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="p-4 md:p-8 flex items-center justify-center min-h-[80vh]">

                    {loading ? (
                        <div className="text-gray-400 animate-pulse">Checking records...</div>
                    ) : hasVoted ? (
                        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 max-w-lg w-full text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>

                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                                <CheckCircleOutlineIcon style={{ fontSize: 40 }} />
                            </div>

                            <h1 className="text-3xl font-semibold text-gray-900 mb-2">Vote Confirmed</h1>
                            <p className="text-gray-500 mb-8">
                                Your digital ballot has been securely cast and recorded for the <strong>UnionCES 2026</strong> election.
                            </p>

                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-8">
                                <div className="text-sm text-gray-400 uppercase font-semibold tracking-wider mb-1">Voter ID</div>
                                <div className="text-lg font-mono font-semibold text-gray-800">{localStorage.getItem("username")}</div>
                            </div>

                            <Link to="/voter/result" className="inline-block w-full py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-black transition-colors">
                                View Live Results
                            </Link>
                        </div>
                    ) : (
                        <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 max-w-lg w-full text-center">
                            <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-700">
                                <HowToVoteIcon style={{ fontSize: 40 }} />
                            </div>
                            <h1 className="text-2xl font-semibold text-gray-900 mb-2">My Ballot</h1>
                            <p className="text-gray-500 mb-8">
                                You have not cast your vote yet. Exercise your right to vote!
                            </p>
                            <Link to="/voter/cast" className="inline-block w-full py-3 bg-accent text-black font-semibold rounded-xl hover:bg-accent-hover transition-colors">
                                Go to Polling Station
                            </Link>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default MyBallot;
