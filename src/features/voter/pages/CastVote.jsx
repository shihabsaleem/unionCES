import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Layout/Navbar";
import Sidebar from "../components/Sidebar"; // Voter Sidebar
import logo from "../../../Assets/logoh.svg";
import Select from "react-select";
import { authFetch } from "../../../utils/api";

const CastVote = () => {
    const [data, setData] = useState(null);
    const [votes, setVotes] = useState({ chair: "0", vchair: "1", ladyrep: "2", secr: "3" });
    const [pollingActive, setPollingActive] = useState(true);
    const [checkingStatus, setCheckingStatus] = useState(true);

    useEffect(() => {
        const checkStatus = async () => {
            try {
                // Check if user already voted
                const response = await authFetch("http://localhost:8000/api/status");
                if (response.ok) {
                    const data = await response.json();
                    if (data.has_voted) {
                        window.location.href = "/voter/voted";
                        return;
                    }
                }

                // Check polling status
                const pollRes = await authFetch("http://localhost:8000/api/polling_status");
                if (pollRes.ok) {
                    const pollData = await pollRes.json();
                    setPollingActive(pollData.polling_active);
                }
            } catch (error) { console.error(error); }
            finally { setCheckingStatus(false); }
        };
        checkStatus();

        const getCandidates = async () => {
            try {
                const response = await authFetch("http://localhost:8000/api/votecandidates");
                if (response.ok) {
                    const result = await response.json();
                    setData(result);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        getCandidates();
    }, []);

    const handleSelect = (key, value) => {
        setVotes(prev => ({ ...prev, [key]: value }));
    }

    const handleSubmit = async () => {
        try {
            const response = await authFetch("http://localhost:8000/api/castvote", {
                method: "POST",
                body: JSON.stringify(votes),
            });

            if (response.ok) {
                window.location.href = "/voter/result";
            } else {
                const errData = await response.json();
                alert(errData.error || "Voting failed.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const customSelectStyles = {
        control: (base) => ({
            ...base,
            borderRadius: '0.75rem', // rounded-xl
            borderColor: '#f3f4f6', // border-gray-100
            backgroundColor: '#f9fafb', // bg-gray-50
            padding: '0.2rem',
            boxShadow: 'none',
            ':hover': { borderColor: '#FFCE07' }
        })
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />

                <div className="p-4 md:p-8 flex justify-center">
                    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-sm border border-gray-100 flex overflow-hidden">
                        {/* Visual */}
                        <div className="hidden md:flex flex-col items-center justify-center w-1/3 bg-gray-50 p-8 text-center uppercase">
                            <img src={logo} className="w-24 mb-4 opacity-50" alt="logo" />
                            <h2 className="text-xl font-semibold text-gray-400 tracking-widest">Official<br />Ballot</h2>
                        </div>

                        {/* Form */}
                        <div className="flex-1 p-8">
                            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Cast Your Vote</h1>

                            {checkingStatus ? (
                                <div className="flex justify-center p-12 text-gray-400">Loading Election Status...</div>
                            ) : !pollingActive ? (
                                <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-2xl border border-red-100 text-center">
                                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-500">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Voting Suspended</h3>
                                    <p className="text-gray-500 px-4">
                                        The election polling is currently closed. Please wait for the administrator to open the polls or check back later.
                                    </p>
                                </div>
                            ) : data ? (
                                <form className="space-y-6">
                                    {/* Chair */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Chairman</label>
                                        <Select
                                            options={data.chair}
                                            styles={customSelectStyles}
                                            defaultValue={{ value: "0", label: "NOTA" }}
                                            onChange={(e) => handleSelect('chair', e.value)}
                                        />
                                    </div>

                                    {/* Vice Chair */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Vice Chairman</label>
                                        <Select
                                            options={data.vchair}
                                            styles={customSelectStyles}
                                            defaultValue={{ value: "1", label: "NOTA" }}
                                            onChange={(e) => handleSelect('vchair', e.value)}
                                        />
                                    </div>

                                    {/* Secretary */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Secretary</label>
                                        <Select
                                            options={data.secr}
                                            styles={customSelectStyles}
                                            defaultValue={{ value: "2", label: "NOTA" }}
                                            onChange={(e) => handleSelect('secr', e.value)}
                                        />
                                    </div>

                                    {/* Lady Rep */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Lady Representative</label>
                                        <Select
                                            options={data.ladyrep}
                                            styles={customSelectStyles}
                                            defaultValue={{ value: "3", label: "NOTA" }}
                                            onChange={(e) => handleSelect('ladyrep', e.value)}
                                        />
                                    </div>

                                    <button type="button" onClick={handleSubmit} className="w-full py-4 bg-accent text-black font-semibold rounded-xl shadow-lg hover:bg-accent-hover transition-all mt-4">
                                        CONFIRM VOTE
                                    </button>
                                </form>
                            ) : (
                                <div className="flex justify-center p-12 text-gray-400">Loading Ballot...</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CastVote;
