
import React from "react";
import {
  Monitor,
  ClipboardList,
  // Replace Confetti with PartyPopper which is available
  PartyPopper,
  FileCheck,
  LayoutGrid,
  MessagesSquare,
} from "lucide-react";

import Sidebar from "@/components/dashboard/Sidebar";
import StatCard from "@/components/dashboard/StatCard";
import ActivityCard from "@/components/dashboard/ActivityCard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardTabs from "@/components/dashboard/DashboardTabs";
import SalesPerformance from "@/components/dashboard/SalesPerformance";

const Index: React.FC = () => {
  // Data for stat cards
  const statCards = [
    { count: 3, label: "Available items", icon: <Monitor size={24} /> },
    { count: 2, label: "Planning items", icon: <ClipboardList size={24} /> },
    { count: 2, label: "Past events", icon: <PartyPopper size={24} /> },
    { count: 2, label: "Pending & completed", icon: <FileCheck size={24} /> },
    { count: 2, label: "Website sections", icon: <LayoutGrid size={24} /> },
    { count: 2, label: "Client reviews", icon: <MessagesSquare size={24} /> },
  ];

  // Data for activity cards
  const recentActivity = {
    title: "Recent Activity",
    description: "Track recent changes and updates across your modules.",
    items: [
      "New Service Added: Photography Service",
      "Order Status Updated: Alice Johnson - Confirmed",
      "Event Created: Tech Corp Annual Gala",
    ],
  };

  const upcomingEvents = {
    title: "Upcoming Events",
    description: "View events scheduled for the next month.",
    items: [
      "September 20, 2023: Alice Johnson Wedding",
      "October 5, 2023: Bob Smith - Sound System Rental",
    ],
  };

  // Dashboard tabs
  const dashboardTabs = ["Overview", "Analytics", "Reports", "Notifications"];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <div className="flex min-h-screen bg-[#f8f9fa]">
        <Sidebar />

        <main className="grow bg-[#f8f9fa] p-8">
          <DashboardHeader
            title="Dashboard"
            description="Welcome to your event management dashboard. Here's an overview of your business."
          />

          {/* Stats Grid */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 mb-8 max-md:grid-cols-[repeat(2,1fr)] max-sm:grid-cols-[1fr]">
            {statCards.map((card, index) => (
              <StatCard
                key={index}
                count={card.count}
                label={card.label}
                icon={card.icon}
              />
            ))}
          </div>

          {/* Dashboard Tabs */}
          <DashboardTabs tabs={dashboardTabs} />

          {/* Activity and Events Section */}
          <div className="grid grid-cols-[2fr_1fr] gap-6 mb-8 max-md:grid-cols-[1fr] max-sm:grid-cols-[1fr]">
            <ActivityCard
              title={recentActivity.title}
              description={recentActivity.description}
              items={recentActivity.items}
            />
            <ActivityCard
              title={upcomingEvents.title}
              description={upcomingEvents.description}
              items={upcomingEvents.items}
            />
          </div>

          {/* Sales Performance Section */}
          <SalesPerformance />
        </main>
      </div>
    </>
  );
};

export default Index;
