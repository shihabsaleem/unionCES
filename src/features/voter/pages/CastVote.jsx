import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Layout/Navbar";
import Sidebar from "../components/Sidebar"; // Voter Sidebar
import logo from "../../../Assets/logoh.svg";
import Select from "react-select";
import { authFetch } from "../../../utils/api";

const CastVote = () => {
    const [data, setData] = useState(null);
    const [votes, setVotes] = useState({ chair: "0", vchair: "1", ladyrep: "2", secr: "3" });

    useEffect(() => {
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
                alert("Voting failed.");
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

                <div className="p-8 flex justify-center">
                    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-sm border border-gray-100 flex overflow-hidden">
                        {/* Visual */}
                        <div className="hidden md:flex flex-col items-center justify-center w-1/3 bg-gray-50 p-8 text-center uppercase">
                            <img src={logo} className="w-24 mb-4 opacity-50" alt="logo" />
                            <h2 className="text-xl font-extrabold text-gray-400 tracking-widest">Official<br />Ballot</h2>
                        </div>

                        {/* Form */}
                        <div className="flex-1 p-8">
                            <h1 className="text-2xl font-bold text-gray-800 mb-6">Cast Your Vote</h1>

                            {data ? (
                                <form className="space-y-6">
                                    {/* Chair */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Chairman</label>
                                        <Select
                                            options={data.chair}
                                            styles={customSelectStyles}
                                            defaultValue={{ value: "0", label: "NOTA" }}
                                            onChange={(e) => handleSelect('chair', e.value)}
                                        />
                                    </div>

                                    {/* Vice Chair */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Vice Chairman</label>
                                        <Select
                                            options={data.vchair}
                                            styles={customSelectStyles}
                                            defaultValue={{ value: "1", label: "NOTA" }}
                                            onChange={(e) => handleSelect('vchair', e.value)}
                                        />
                                    </div>

                                    {/* Secretary */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Secretary</label>
                                        <Select
                                            options={data.secr}
                                            styles={customSelectStyles}
                                            defaultValue={{ value: "2", label: "NOTA" }}
                                            onChange={(e) => handleSelect('secr', e.value)}
                                        />
                                    </div>

                                    {/* Lady Rep */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Lady Representative</label>
                                        <Select
                                            options={data.ladyrep}
                                            styles={customSelectStyles}
                                            defaultValue={{ value: "3", label: "NOTA" }}
                                            onChange={(e) => handleSelect('ladyrep', e.value)}
                                        />
                                    </div>

                                    <button type="button" onClick={handleSubmit} className="w-full py-4 bg-accent text-black font-bold rounded-xl shadow-lg hover:bg-accent-hover transition-all mt-4">
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
