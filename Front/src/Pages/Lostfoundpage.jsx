import React, { useEffect, useState } from "react";
import { Sun, Moon, ClipboardList, ShieldCheck, Handshake } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LostFoundHeroSection() {
  const [darkMode, setDarkMode] = useState(false);
  const [lostItems, setLostItems] = useState([]); // State for lost items
  const [foundItems, setFoundItems] = useState([]); // State for found items
  const navigate = useNavigate();

  const steps = [
    {
      icon: <ClipboardList size={28} />,
      title: "Report a lost or found item",
      description:
        "Fill the declaration and give as much detail as possible (the location of loss, the type of item, the description) to help the algorithm to identify it quickly.",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Prove ownership of the item",
      description:
        'Once the lost item "matched", prove who you are thanks to a security question (ex: describe the shell of your phone, ...). Then, our partner who found this item will be able to validate.',
    },
    {
      icon: <Handshake size={28} />,
      title: "Get it back!",
      description:
        "As soon as you are authenticated, you receive the information to pick it up or have it delivered. Remember to communicate the reference’s number found.",
    },
  ];

  // Fetch approved items from the backend
  useEffect(() => {
    const fetchApprovedItems = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/Back/lostfound/approved" // Replace with your backend API endpoint
        );
        const approvedItems = response.data;

        // Filter items based on their status
        setLostItems(approvedItems.filter((item) => item.status === "Lost"));
        setFoundItems(approvedItems.filter((item) => item.status === "Found"));
      } catch (error) {
        console.error("Error fetching approved items:", error);
      }
    };

    fetchApprovedItems();
  }, []);

  return (
    <div
      className={
        darkMode ? "dark bg-gray-900 text-white" : "bg-[#b3e5fc] text-gray-900"
      }
    >
      {/* Header & Dark Mode Toggle */}
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-bold">Lost & Found</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-white dark:bg-gray-800 shadow"
        >
          {darkMode ? (
            <Sun className="text-yellow-400" />
          ) : (
            <Moon className="text-gray-600" />
          )}
        </button>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-8 py-12 gap-8">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            BECAUSE YOUR <br />
            LOST THING DESERVE <br />
            A SECOND CHANCE <br />
          </h2>
          <p className="text-lg mb-6 text-green-700 font-semibold">
            Lost or found something?
            <br />
            Let us help you
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigate("/lostfoundform?status=Lost")}
              className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-green-700 transition"
            >
              I HAVE LOST
            </button>
            <button
              onClick={() => navigate("/lostfoundform?status=Found")}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              I HAVE FOUND
            </button>
          </div>
        </motion.div>

        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3771/3771441.png"
            alt="Lost and Found Hero"
            className="w-72 md:w-96 drop-shadow-lg"
          />
        </motion.div>
      </div>

      {/* How It Works Section */}
      <motion.div
        className="bg-white dark:bg-gray-950 py-16 px-6 text-center relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-2 text-[#03396c]">
          HOW CAMPUSLINK HELPS YOU
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-12">How it works</p>

        <div className="relative flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 w-full max-w-sm text-center rounded-xl shadow-md p-6 relative z-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="bg-[#e0f7fa] p-4 rounded-full shadow text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300">
                  {step.icon}
                </div>
              </div>
              <h4 className="text-[#03396c] dark:text-cyan-200 text-lg font-semibold mb-3">
                {step.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}

          <div className="hidden md:flex absolute top-1/2 left-[12%] right-[12%] justify-between items-center z-0">
            <div className="border-t-2 border-dotted border-gray-300 dark:border-gray-600 w-1/3"></div>
            <div className="border-t-2 border-dotted border-gray-300 dark:border-gray-600 w-1/3"></div>
          </div>
        </div>
      </motion.div>

      {/* Popular Categories */}
      <motion.section
        className="bg-white dark:bg-gray-950 py-16 px-6 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#03396c] dark:text-cyan-100">
          Popular Lost & Found Categories
        </h3>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {[
            "📱 Phones",
            "👛 Wallets",
            "📚 Books",
            "🆔 ID Cards",
            "🎧 Accessories",
            "📦 Other",
          ].map((item, i) => {
            const [emoji, label] = item.split(" ");
            return (
              <motion.div
                key={i}
                className="bg-[#e0f7fa] dark:bg-cyan-900 text-cyan-800 dark:text-cyan-100 w-40 h-40 flex flex-col items-center justify-center rounded-xl shadow-md"
                onClick={() => navigate(`/categories/${label}`)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: i * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="text-4xl mb-2">{emoji}</div>
                <div className="text-lg font-semibold">{label}</div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Recently Lost Items Section */}
      <motion.section
        className="bg-gray-100 dark:bg-gray-900 py-16 px-6 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl text-center flex-1 md:text-4xl font-bold text-[#03396c] dark:text-cyan-100">
            Recently Lost Items
          </h3>
          <button
            onClick={() => navigate("/lostitems")}
            className="text-sm font-semibold text-blue-600 hover:underline ml-4"
          >
            See All Lost Items
          </button>
        </div>
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <div className="flex space-x-6">
            {lostItems.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer min-w-[250px]"
                onClick={() => navigate(`/lostitems`)}
              >
                <img
                  src={item.imageUrl || "https://via.placeholder.com/150"}
                  alt={item.itemName}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                  {item.itemName}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Location:</strong> {item.location}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Date:</strong>{" "}
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Recently Found Items Section */}
      <motion.section
        className="bg-white dark:bg-gray-950 py-16 px-6 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl md:text-4xl font-bold text-[#03396c] dark:text-cyan-100 text-center flex-1">
            Recently Found Items
          </h3>
          <button
            onClick={() => navigate("/founditems")}
            className="text-sm font-semibold text-blue-600 hover:underline ml-4"
          >
            See All Found Items
          </button>
        </div>
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <div className="flex space-x-6">
            {foundItems.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer min-w-[250px]"
                onClick={() => navigate(`/founditems`)}
              >
                <img
                  src={item.imageUrl || "https://via.placeholder.com/150"}
                  alt={item.itemName}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                  {item.itemName}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Location:</strong> {item.location}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Date:</strong>{" "}
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why Use CampusLink */}
      <motion.section
        className="bg-gray-100 dark:bg-gray-900 py-16 px-6 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#03396c] dark:text-cyan-100">
          Why Use CampusLink Lost & Found?
        </h3>
        <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-lg mb-8">
          We built this platform so you don't have to panic when losing
          something. CampusLink ensures a secure, fast, and community-driven way
          to find your belongings.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {["Fast Matching", "Secure Validation", "Student Friendly"].map(
            (title, i) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow w-72"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: i * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <h4 className="text-lg font-semibold mb-2">{title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {title === "Fast Matching"
                    ? "Our system helps you find a match quickly using smart filtering."
                    : title === "Secure Validation"
                    ? "Ownership is verified through questions before connecting people."
                    : "No charges, no hassle – built for campus life by students."}
                </p>
              </motion.div>
            )
          )}
        </div>
      </motion.section>

      {/* FAQs */}
      <motion.section
        className="bg-gray-100 dark:bg-gray-900 py-16 px-6 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-8 text-[#03396c] dark:text-cyan-100">
          Frequently Asked Questions
        </h3>
        <div className="max-w-2xl mx-auto text-left space-y-4">
          {[
            "What happens after I submit a lost item?",
            "Is my personal data safe?",
            "Can I report anonymously?",
          ].map((q, i) => {
            const a =
              i === 0
                ? "Your item will be added to our system. If a match is found, you’ll be notified immediately to prove ownership."
                : i === 1
                ? "Absolutely. We only use the information you provide to assist with the matching process."
                : "Found items can be submitted anonymously. But to recover lost items, verification is needed.";
            return (
              <motion.details
                key={i}
                className="bg-white dark:bg-gray-800 p-4 rounded-md shadow cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: i * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <summary className="font-semibold text-[#03396c] dark:text-cyan-200">
                  {q}
                </summary>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                  {a}
                </p>
              </motion.details>
            );
          })}
        </div>
      </motion.section>

      {/* Final Call to Action */}
      <motion.section
        className="bg-[#03396c] text-white py-16 px-6 text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Found or Lost Something on Campus?
        </h3>
        <p className="text-lg mb-6">
          Help the community by reporting it through CampusLink's Lost & Found
          platform.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-full font-semibold shadow">
            Report Lost Item
          </button>
          <button className="bg-white text-[#03396c] hover:bg-gray-100 transition px-6 py-3 rounded-full font-semibold shadow">
            I Found Something
          </button>
        </div>
      </motion.section>
    </div>
  );
}
