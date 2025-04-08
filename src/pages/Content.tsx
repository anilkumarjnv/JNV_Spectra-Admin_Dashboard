
import React from "react";
import Layout from "@/components/dashboard/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Edit, MoreVertical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ContentSection {
  id: number;
  title: string;
  subtitle: string;
  lastUpdated: string;
  image: string;
}

const contentSections: ContentSection[] = [
  {
    id: 1,
    title: "Hero Section",
    subtitle: "Creating Memorable Events",
    lastUpdated: "Apr 10, 2023",
    image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
  },
  {
    id: 2,
    title: "About Us",
    subtitle: "Our Story",
    lastUpdated: "Apr 12, 2023",
    image: "https://images.unsplash.com/photo-1643029714206-0e21ba8fb76f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
  }
];

const Content = () => {
  return (
    <Layout>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Section Content</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage content for website sections
          </p>
        </div>

        <div className="flex items-center mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search content sections..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1">
          {contentSections.map((section) => (
            <Card key={section.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex justify-between p-4 pb-0">
                  <div>
                    <h2 className="text-xl font-bold">{section.title}</h2>
                    <p className="text-sm text-gray-500">Last updated: {section.lastUpdated}</p>
                  </div>
                  <div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                      <MoreVertical size={18} />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 mb-4">
                  <img 
                    src={section.image} 
                    alt={section.title} 
                    className="w-full h-56 object-cover"
                  />
                </div>
                
                {section.id === 1 && (
                  <div className="px-4 pb-4">
                    <p className="text-lg font-medium mb-1">Creating Memorable Events</p>
                    <p className="text-sm text-gray-700">Professional event planning and management services for all occasions.</p>
                    <p className="text-sm text-gray-700 mt-2">...</p>
                  </div>
                )}
                
                {section.id === 2 && (
                  <div className="px-4 pb-4">
                    <p className="text-lg font-medium mb-1">Our Story</p>
                    <p className="text-sm text-gray-700">With over 10 years of experience, we specialize in creating unique and memorable events tailored to your needs.</p>
                  </div>
                )}
                
                <div className="border-t p-4 text-right">
                  <Button className="bg-violet-600 hover:bg-violet-700">
                    <Edit size={16} className="mr-2" />
                    Edit Content
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Content;
