"use client";

import SectionTitle from "@/components/sectionTitle";

export default function AdminDashboardPage() {
  return (
    <>
      <SectionTitle title="Admin Dashboard" />
      <div className="flex flex-col lg:flex-row gap-5 mt-8">
        <div className="w-full lg:w-1/5">
          <div className="p-2 rounded text-center bg-green-700 text-white">
            SMIT Academy 
          </div>
          <div className="border border-gray-300 rounded text-center py-8 mt-2">
            <h2 className="text-4xl font-bold pb-2">62</h2>
            <h4 className="inline text-gray-500 text-sm">Total Students</h4>
          </div>
        </div>

        <div className="w-full lg:w-2/5">
          <div className="p-2 rounded text-center bg-green-700 text-white">
            Learning Management System
          </div>
          <div className="flex gap-5 mt-2">
            <div
              className="flex-grow border border-gray-300 rounded text-center py-8"
            >
              <h2 className="text-4xl font-bold pb-2">12</h2>
              <h4 className="inline text-gray-500 text-sm">Notes</h4>
            </div>
            <div
              className="flex-grow border border-gray-300 rounded text-center py-8"
            >
              <h2 className="text-4xl font-bold pb-2">10</h2>
              <h4 className="inline text-gray-500 text-sm">Papers</h4>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/5">
          <div className="p-2 rounded text-center bg-green-700 text-white">
            Quiz Bank
          </div>
          <div className="flex gap-5 mt-2">
            <div
              className="flex-grow border border-gray-300 rounded text-center py-8"
            >
              <h2 className="text-4xl font-bold pb-2">22</h2>
              <h4 className="inline text-gray-500 text-sm">Quiz</h4>
            </div>
            <div
              className="flex-grow border border-gray-300 rounded text-center py-8"
            >
              <h2 className="text-4xl font-bold pb-2">0</h2>
              <h4 className="inline text-gray-500 text-sm">Enrolled Students</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
