import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import img from "../No data.png";

const PendingReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingReports = async () => {
      try {
        console.log("Fetching pending reports...");
        const response = await axios.get(
          "http://localhost:5000/Back/lostfound/pending"
        );
        console.log("Pending Reports Response:", response.data);
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching pending reports:", error);
        toast.error("Failed to fetch pending reports. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingReports();
  }, []);

  const handleApprove = async (reportId) => {
    try {
      console.log("Approving report with ID:", reportId);
      await axios.patch(
        `http://localhost:5000/Back/lostfound/${reportId}/approve`
      );
      setReports(reports.filter((report) => report._id !== reportId));
      toast.success("Report approved successfully!");
    } catch (error) {
      console.error("Error approving report:", error);
      toast.error("Failed to approve the report. Please try again.");
    }
  };

  const handleReject = async (reportId) => {
    try {
      console.log("Rejecting report with ID:", reportId);
      await axios.patch(
        `http://localhost:5000/Back/lostfound/${reportId}/reject`
      );
      setReports(reports.filter((report) => report._id !== reportId));
      toast.success("Report rejected successfully!");
    } catch (error) {
      console.error("Error rejecting report:", error);
      toast.error("Failed to reject the report. Please try again.");
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const parsedDate = new Date(date);
    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const year = parsedDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (loading) return <p>Loading pending reports...</p>;

  if (reports.length === 0)
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen text-center"
        style={{ width: "100vw" }}
      >
        <img
          src={img}
          alt="No pending reports"
          className="mb-6 w-64 h-64 object-contain"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          No Pending Reports Found
        </h2>
        <p className="text-gray-600">
          All reports have been reviewed. Check back later for new submissions.
        </p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Pending Lost & Found Reports
      </h2>
      {reports.map((report) => (
        <div
          key={report._id}
          className="border p-6 rounded-lg mb-6 shadow-md bg-white hover:shadow-lg transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {report.itemName || "Unnamed Item"}
          </h3>
          <p className="text-gray-600">
            <strong>Status:</strong> {report.status}
          </p>
          <p className="text-gray-600">
            <strong>Reporter Name:</strong> {report.reporterName || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Reporter Email:</strong> {report.reporterEmail || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Location:</strong> {report.location || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Date:</strong> {formatDate(report.date)}
          </p>
          <p className="text-gray-600">
            <strong>Category:</strong> {report.category || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Description:</strong> {report.description || "N/A"}
          </p>
          {report.imageUrl && (
            <img
              src={report.imageUrl}
              alt="Item"
              className="w-48 mt-4 rounded shadow-md"
            />
          )}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => handleApprove(report._id)}
              className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-all duration-300"
            >
              Approve
            </button>
            <button
              onClick={() => handleReject(report._id)}
              className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition-all duration-300"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PendingReports;
