import React, { useEffect, useState } from 'react'
import Navbar from "../../../components/Layout/Navbar";
import Sidebar from "../../../components/Layout/Sidebar";
import { authFetch } from "../../../utils/api";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, Area, AreaChart } from 'recharts';
import { exportToPDF, exportToExcel } from '../../../utils/exportUtils';

const AdminResults = () => {
    const [results, setResults] = useState([]);
    const [allCandidates, setAllCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [pollingActive, setPollingActive] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(new Date());

    // Update current time every minute
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Update every minute
        return () => clearInterval(timer);
    }, []);

    const fetchResults = async () => {
        try {
            // Fetch winners for the cards
            const response = await authFetch("http://localhost:8000/api/result");
            if (response.ok) {
                const data = await response.json();
                setResults(data);
            }

            // Fetch all candidates for the chart
            const allResponse = await authFetch("http://localhost:8000/api/table");
            if (allResponse.ok) {
                const allData = await allResponse.json();
                // Sort by vote count descending
                const sorted = allData.sort((a, b) => b.vote - a.vote);
                setAllCandidates(sorted);
            }

            // Fetch polling status
            const statusRes = await authFetch("http://localhost:8000/api/polling_status");
            if (statusRes.ok) {
                const statusData = await statusRes.json();
                setPollingActive(statusData.polling_active);
            }

            setLastUpdated(new Date());
        } catch (error) {
            console.error("Error fetching results:", error);
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchResults();
    }, []);

    // Auto-refresh every 30 seconds
    useEffect(() => {
        const refreshInterval = setInterval(() => {
            fetchResults();
        }, 30000); // 30 seconds

        return () => clearInterval(refreshInterval);
    }, []);

    // Helper map for clean seat names
    const seatMap = {
        "chair": "Chairman",
        "vchair": "Vice Chairman",
        "secretery": "Secretary",
        "ladyrep": "Lady Representative"
    };

    // Calculate polling time progress
    const getPollingProgress = () => {
        const now = currentTime;
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const currentMinutes = hours * 60 + minutes;

        const startTime = 9 * 60; // 9am in minutes
        const endTime = 17 * 60; // 5pm in minutes
        const totalDuration = endTime - startTime; // 8 hours = 480 minutes

        let progress = 0;
        let status = 'Not Started';
        let statusColor = '#6b7280'; // gray

        // Check if polling is manually stopped by admin
        if (!pollingActive) {
            // Calculate progress based on time, but show as stopped
            if (currentMinutes >= startTime && currentMinutes <= endTime) {
                progress = ((currentMinutes - startTime) / totalDuration) * 100;
            } else if (currentMinutes > endTime) {
                progress = 100;
            }
            status = 'Polling Stopped';
            statusColor = '#ef4444'; // red
        } else if (currentMinutes < startTime) {
            progress = 0;
            status = 'Polling Not Started';
            statusColor = '#6b7280';
        } else if (currentMinutes >= startTime && currentMinutes <= endTime) {
            progress = ((currentMinutes - startTime) / totalDuration) * 100;
            status = 'Polling Active';
            statusColor = '#10b981'; // green
        } else {
            progress = 100;
            status = 'Polling Closed';
            statusColor = '#ef4444'; // red
        }

        return { progress, status, statusColor, currentMinutes, startTime, endTime };
    };

    const pollingInfo = getPollingProgress();

    // Generate time data for the chart
    const generateTimeData = () => {
        const data = [];
        for (let hour = 9; hour <= 17; hour++) {
            const hourMinutes = hour * 60;
            const isPast = pollingInfo.currentMinutes >= hourMinutes;
            data.push({
                time: `${hour}:00`,
                hour: hour,
                value: isPast ? 100 : 0,
                label: hour === 9 ? 'Start' : hour === 17 ? 'End' : ''
            });
        }
        return data;
    };

    const timeData = generateTimeData();

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 overflow-auto bg-gray-50">
                <Navbar />
                <div className="max-w-7xl mx-auto p-8">
                    {/* Header with Refresh Controls */}
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-semibold text-gray-800">Election Results</h1>
                        <div className="flex items-center gap-3">
                            <div className="text-sm text-gray-500">
                                Last updated: {lastUpdated.toLocaleTimeString()}
                            </div>

                            {/* Export Buttons */}
                            <button
                                onClick={() => exportToPDF(allCandidates, 'election_results.pdf')}
                                disabled={allCandidates.length === 0}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                Export PDF
                            </button>

                            <button
                                onClick={() => exportToExcel(allCandidates, 'election_results.xlsx')}
                                disabled={allCandidates.length === 0}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Export Excel
                            </button>

                            <button
                                onClick={fetchResults}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Refresh
                            </button>
                        </div>
                    </div>

                    {/* Polling Time Progress */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-700">Polling Time Progress</h2>
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-3 w-3">
                                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75`} style={{ backgroundColor: pollingInfo.statusColor }}></span>
                                    <span className={`relative inline-flex rounded-full h-3 w-3`} style={{ backgroundColor: pollingInfo.statusColor }}></span>
                                </span>
                                <span className="text-sm font-semibold" style={{ color: pollingInfo.statusColor }}>
                                    {pollingInfo.status}
                                </span>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-6">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span className="font-medium">9:00 AM</span>
                                <span className="font-medium">{currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                                <span className="font-medium">5:00 PM</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                                <div
                                    className="h-4 rounded-full transition-all duration-500 ease-out"
                                    style={{
                                        width: `${pollingInfo.progress}%`,
                                        backgroundColor: pollingInfo.statusColor
                                    }}
                                ></div>
                            </div>
                            <div className="mt-2 text-center">
                                <span className="text-sm font-semibold text-gray-700">
                                    {pollingInfo.progress.toFixed(1)}% Complete
                                </span>
                            </div>
                        </div>

                        {/* Timeline Chart */}
                        <ResponsiveContainer width="100%" height={150}>
                            <AreaChart data={timeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={pollingInfo.statusColor} stopOpacity={0.8} />
                                        <stop offset="95%" stopColor={pollingInfo.statusColor} stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="time"
                                    tick={{ fontSize: 11 }}
                                />
                                <YAxis hide />
                                <Tooltip
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            return (
                                                <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-lg">
                                                    <p className="text-sm font-semibold">{payload[0].payload.time}</p>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Area
                                    type="stepAfter"
                                    dataKey="value"
                                    stroke={pollingInfo.statusColor}
                                    fillOpacity={1}
                                    fill="url(#colorTime)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Loading results...</div>
                    ) : results.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No votes recorded yet.</div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8">
                                {results.map((candidate, index) => (
                                    <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <h2 className="text-lg font-semibold text-gray-700 capitalize">
                                                {seatMap[candidate.seat] || candidate.seat}
                                            </h2>
                                            <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-md">LEADER</span>
                                        </div>

                                        {/* Winner / Leader */}
                                        <div className="flex items-center gap-4 mb-6 p-4 bg-accent/10 rounded-xl border border-accent/20">
                                            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center font-semibold text-black border-2 border-white shadow-sm">
                                                1st
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">{candidate.name}</div>
                                                <div className="text-xs text-gray-500">{candidate.dept} - S{candidate.semester}</div>
                                            </div>
                                            <div className="ml-auto text-2xl font-black text-gray-800">{candidate.vote} <span className="text-xs font-medium text-gray-400">votes</span></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Chart Visualization - All Candidates */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                                <h2 className="text-lg font-semibold text-gray-700 mb-6">All Candidates - Vote Distribution</h2>
                                <ResponsiveContainer width="100%" height={500}>
                                    <BarChart data={allCandidates} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis
                                            dataKey="name"
                                            angle={-45}
                                            textAnchor="end"
                                            height={120}
                                            tick={{ fontSize: 11 }}
                                        />
                                        <YAxis
                                            label={{ value: 'Votes', angle: -90, position: 'insideLeft' }}
                                            tick={{ fontSize: 12 }}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#fff',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '8px',
                                                padding: '12px'
                                            }}
                                            formatter={(value, name, props) => [
                                                value,
                                                'Votes'
                                            ]}
                                            labelFormatter={(label) => `Candidate: ${label}`}
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    const data = payload[0].payload;
                                                    return (
                                                        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
                                                            <p className="font-semibold text-gray-800">{data.name}</p>
                                                            <p className="text-sm text-gray-600">{seatMap[data.seat] || data.seat}</p>
                                                            <p className="text-sm text-gray-500">{data.dept} - S{data.sem}</p>
                                                            <p className="text-lg font-bold text-blue-600 mt-1">{data.vote} votes</p>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Legend
                                            wrapperStyle={{ paddingTop: '20px' }}
                                            formatter={() => 'Vote Count'}
                                        />
                                        <Bar dataKey="vote" radius={[8, 8, 0, 0]}>
                                            {allCandidates.map((entry, index) => {
                                                // Color by position
                                                const colorMap = {
                                                    'chair': '#3b82f6',      // blue
                                                    'vchair': '#10b981',     // green
                                                    'secretery': '#f59e0b',  // orange
                                                    'ladyrep': '#ef4444'     // red
                                                };
                                                return <Cell key={`cell-${index}`} fill={colorMap[entry.seat] || '#6b7280'} />;
                                            })}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AdminResults
