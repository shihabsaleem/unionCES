import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Layout/Navbar";
import Sidebar from "../../../components/Layout/Sidebar";
import logo from "../../../Assets/logoh.svg"; // Adjusted path
import { authFetch } from "../../../utils/api";


const AddCandidate = () => {
    const [formData, setFormData] = useState({
        id: "", name: "", dept: "", sem: "", seat: ""
    });
    const [candidates, setCandidates] = useState([]);
    const [pollingActive, setPollingActive] = useState(false);

    useEffect(() => {
        fetchCandidates();
        fetchPollingStatus();
    }, []);

    const fetchPollingStatus = async () => {
        try {
            const response = await authFetch("http://localhost:8000/api/polling_status");
            if (response.ok) {
                const data = await response.json();
                setPollingActive(data.polling_active);
            }
        } catch (error) {
            console.error("Error fetching status:", error);
        }
    };

    const fetchCandidates = async () => {
        try {
            const response = await authFetch("http://localhost:8000/api/table");
            if (response.ok) {
                const data = await response.json();
                setCandidates(data);
            }
        } catch (error) {
            console.error("Error fetching candidates:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authFetch("http://localhost:8000/api/addcandidate", {
                method: "POST",
                body: JSON.stringify({
                    admission: formData.id,
                    name: formData.name,
                    dept: formData.dept,
                    semester: formData.sem,
                    seat: formData.seat
                }),
            });

            if (response.ok) {
                alert("Candidate Added Successfully!");
                setFormData({ id: "", name: "", dept: "", sem: "", seat: "" }); // Reset form
                fetchCandidates(); // Refresh the candidate list
            } else {
                alert("Failed to add candidate. Please check inputs.");
            }
        } catch (error) {
            console.error("Error adding candidate:", error);
            alert("An error occurred. See console.");
        }
    };

    const inputClass = "w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all duration-200 mt-1 disabled:opacity-50 disabled:cursor-not-allowed";
    const labelClass = "text-sm font-semibold text-gray-600 ml-1";

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="p-4 md:p-8 flex flex-col items-center">

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-2xl w-full flex gap-8 relative overflow-hidden">
                        {pollingActive && (
                            <div className="absolute inset-0 bg-gray-50/80 backdrop-blur-[2px] z-50 flex flex-col items-center justify-center text-center p-6 animate-fade-in">
                                <div className="bg-white p-6 rounded-2xl shadow-lg border border-red-100 max-w-sm">
                                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-500 mx-auto mb-3">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800">Nominations Closed</h3>
                                    <p className="text-gray-500 text-sm mt-1">Polling is currently active. Stop the election to add new candidates.</p>
                                </div>
                            </div>
                        )}

                        {/* Visual Side */}
                        <div className="hidden md:flex flex-col items-center justify-center w-1/3 bg-gray-50 rounded-2xl p-6">
                            <img src={logo} alt="logo" className="w-full object-contain opacity-80" />
                            <h3 className="mt-4 font-bold text-xl text-gray-400 uppercase tracking-widest text-center">Nomination Form</h3>
                        </div>

                        {/* Form Side */}
                        <div className="flex-1">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Candidate</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className={labelClass}>ID / Admission No</label>
                                    <input name="id" type="text" onChange={handleChange} className={inputClass} placeholder="e.g. 2023CS01" required disabled={pollingActive} />
                                </div>
                                <div>
                                    <label className={labelClass}>Full Name</label>
                                    <input name="name" type="text" onChange={handleChange} className={inputClass} placeholder="Candidate Name" required disabled={pollingActive} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Department</label>
                                        <input name="dept" type="text" onChange={handleChange} className={inputClass} placeholder="CS" required disabled={pollingActive} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Semester</label>
                                        <input name="sem" type="number" onChange={handleChange} className={inputClass} placeholder="2" required disabled={pollingActive} />
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Seat / Position</label>
                                    <input name="seat" type="text" onChange={handleChange} className={inputClass} placeholder="e.g. Chairman" required disabled={pollingActive} />
                                </div>

                                <button type="submit" disabled={pollingActive} className="w-full py-3.5 bg-accent text-black font-semibold rounded-xl shadow-none hover:bg-accent-hover transition-all duration-200 mt-4 disabled:opacity-50 disabled:cursor-not-allowed">
                                    Submit Nomination
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Candidate List Table */}
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-6xl w-full mt-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">All Candidates</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-xs text-gray-500 bg-gray-50/50 border-b border-gray-100">
                                        <th className="font-semibold p-4 uppercase tracking-wider">Name</th>
                                        <th className="font-semibold p-4 uppercase tracking-wider">Position</th>
                                        <th className="font-semibold p-4 uppercase tracking-wider">Department</th>
                                        <th className="font-semibold p-4 uppercase tracking-wider">Semester</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {candidates.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="p-8 text-center text-gray-400">
                                                No candidates added yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        candidates.map((candidate) => (
                                            <tr key={candidate.id} className="hover:bg-gray-50/80 transition-colors">
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                                                            {candidate.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-gray-900">{candidate.name}</div>
                                                            <div className="text-xs text-gray-400">ID: {candidate.admission}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                                                        {candidate.seat}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-sm text-gray-900">{candidate.dept}</td>
                                                <td className="p-4 text-sm text-gray-600">Sem {candidate.sem}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>


        </div>
    );
};

export default AddCandidate;
