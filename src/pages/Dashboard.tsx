
import React from "react";
import { ArrowRight, Monitor, ClipboardList, PartyPopper, FileCheck, LayoutGrid, MessagesSquare } from "lucide-react";
import Layout from "@/components/dashboard/Layout";
import { Link } from "react-router-dom";

const StatCard = ({ count, label, icon, linkTo }: { count: number | string; label: string; icon: React.ReactNode; linkTo: string }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm relative">
    <div className="text-2xl font-bold text-gray-900">{count}</div>
    <div className="text-sm text-gray-500 mt-1">{label}</div>
    <div className="absolute text-violet-500 right-6 top-6">{icon}</div>
    <Link to={linkTo}>
      <div className="text-sm text-violet-600 cursor-pointer mt-4 flex items-center gap-1 hover:gap-2 transition-all">
        View Details <ArrowRight size={16} />
      </div>
    </Link>
  </div>
);

const Dashboard = () => {
  return (
    <Layout>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome to your event management dashboard. Here's an overview of your business.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8 max-lg:grid-cols-2 max-md:grid-cols-1">
          <StatCard count={3} label="Available items" icon={<Monitor size={24} />} linkTo="/services" />
          <StatCard count={2} label="Planning items" icon={<ClipboardList size={24} />} linkTo="/event-planning" />
          <StatCard count={2} label="Past events" icon={<PartyPopper size={24} />} linkTo="/events-hosted" />
          <StatCard count={2} label="Pending & completed" icon={<FileCheck size={24} />} linkTo="/orders" />
          <StatCard count={2} label="Website sections" icon={<LayoutGrid size={24} />} linkTo="/content" />
          <StatCard count={2} label="Client reviews" icon={<MessagesSquare size={24} />} linkTo="/testimonials" />
        </div>

        {/* Dashboard Tabs */}
        <div className="flex gap-6 mb-8 border-b border-gray-200">
          <div className="text-sm pb-4 border-b-2 border-violet-600 text-violet-600 font-medium">Overview</div>
          <div className="text-sm pb-4 text-gray-500 cursor-pointer hover:text-gray-700">Analytics</div>
          <div className="text-sm pb-4 text-gray-500 cursor-pointer hover:text-gray-700">Reports</div>
          <div className="text-sm pb-4 text-gray-500 cursor-pointer hover:text-gray-700">Notifications</div>
        </div>

        {/* Activity and Events Section */}
        <div className="grid grid-cols-2 gap-6 mb-8 max-md:grid-cols-1">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-gray-900 mb-1">Recent Activity</h3>
            <p className="text-sm text-gray-500 mb-4">Track recent changes and updates across your modules.</p>
            <div className="flex flex-col gap-3 text-sm">
              <div className="text-gray-700">New Service Added: Photography Service</div>
              <div className="text-gray-700">Order Status Updated: Alice Johnson - Confirmed</div>
              <div className="text-gray-700">Event Created: Tech Corp Annual Gala</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-base font-semibold text-gray-900 mb-1">Upcoming Events</h3>
            <p className="text-sm text-gray-500 mb-4">View events scheduled for the next month.</p>
            <div className="flex flex-col gap-3 text-sm">
              <div className="text-gray-700">September 20, 2023: Alice Johnson Wedding</div>
              <div className="text-gray-700">October 5, 2023: Bob Smith - Sound System Rental</div>
            </div>
          </div>
        </div>

        {/* Sales Performance Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-base font-semibold text-gray-900 mb-1">Sales Performance</h3>
          <p className="text-sm text-gray-500 mb-4">Track your sales performance over the last 6 months.</p>
          <div className="h-40 flex items-center justify-center text-gray-400">
            Sales chart will be displayed here
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
