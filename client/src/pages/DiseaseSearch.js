import React, { useState } from "react";
import { Link } from "react-router-dom";

function DiseaseSearch() {
  const [diseaseName, setDiseaseName] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [medicines, setMedicines] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!diseaseName.trim()) {
      setError("Please enter a disease name.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}api/v1/user/medicines?diseaseName=${diseaseName}`
      );

      if (!response.ok) {
        throw new Error("No matching disease found.");
      }

      const data = await response.json();
      setMedicines(data);
    } catch (error) {
      setError(error.message);
      setMedicines(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-[url('https://e0.pxfuel.com/wallpapers/927/748/desktop-wallpaper-ayurvedic-banner-design.jpg')] flex items-center justify-center">
      <div className="max-w-lg mx-auto p-8 mt-5 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Find Medicines by Disease
        </h1>

        <form onSubmit={handleSearch} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Disease Name
            </label>
            <input
              type="text"
              className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-300 transition"
              value={diseaseName}
              onChange={(e) => setDiseaseName(e.target.value)}
              placeholder="Enter disease name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Symptoms (optional)
            </label>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-300 transition"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Enter symptoms"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-800 text-white font-semibold rounded-xl shadow-lg hover:from-green-600 hover:to-green-500 transition duration-300 transform hover:scale-105"
            >
              {loading ? "Searching..." : "Search Medicines"}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 border border-red-200 rounded-lg text-center">
            {error}
          </div>
        )}

        {medicines && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
              Medicines for {medicines.disease}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  Allopathic Medicines
                </h3>
                <ul className="list-disc ml-6 space-y-1 text-gray-800">
                  {medicines.Allopathic.map((medicine, index) => (
                    <li key={index}>{medicine}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  Ayurvedic Medicines
                </h3>
                <ul className="list-disc ml-6 space-y-1 text-gray-800">
                  {medicines.Ayurvedic.map((medicine, index) => (
                    <li key={index}>{medicine}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 underline text-blue-600">
              <Link to="/get-checkup-done">Consult a doctor online</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiseaseSearch;
