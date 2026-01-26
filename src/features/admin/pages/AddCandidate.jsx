import React, { useState } from "react";
import Navbar from "../../../components/Layout/Navbar";
import Sidebar from "../../../components/Layout/Sidebar";
import logo from "../../../Assets/logoh.svg"; // Adjusted path
import { authFetch } from "../../../utils/api";

const AddCandidate = () => {
    const [formData, setFormData] = useState({
        id: "", name: "", dept: "", sem: "", seat: ""
    });

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
            } else {
                alert("Failed to add candidate. Please check inputs.");
            }
        } catch (error) {
            console.error("Error adding candidate:", error);
            alert("An error occurred. See console.");
        }
    };

    const inputClass = "w-full px-4 py-3 bg-gray-50 border-none rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all duration-200 mt-1";
    const labelClass = "text-sm font-semibold text-gray-600 ml-1";

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="p-4 md:p-8 flex items-center justify-center">

                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-2xl w-full flex gap-8">
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
                                    <input name="id" type="text" onChange={handleChange} class={inputClass} placeholder="e.g. 2023CS01" required />
                                </div>
                                <div>
                                    <label className={labelClass}>Full Name</label>
                                    <input name="name" type="text" onChange={handleChange} className={inputClass} placeholder="Candidate Name" required />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Department</label>
                                        <input name="dept" type="text" onChange={handleChange} className={inputClass} placeholder="CS" required />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Semester</label>
                                        <input name="sem" type="number" onChange={handleChange} className={inputClass} placeholder="2" required />
                                    </div>
                                </div>
                                <div>
                                    <label className={labelClass}>Seat / Position</label>
                                    <input name="seat" type="text" onChange={handleChange} className={inputClass} placeholder="e.g. Chairman" required />
                                </div>

                                <button type="submit" className="w-full py-3.5 bg-accent text-black font-semibold rounded-xl shadow-none hover:bg-accent-hover transition-all duration-200 mt-4">
                                    Submit Nomination
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AddCandidate;
