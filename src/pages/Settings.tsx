
import React, { useState } from "react";
import Layout from "@/components/dashboard/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Save } from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Account");
  const [formData, setFormData] = useState({
    name: "Admin User",
    email: "admin@example.com",
    currentPassword: "",
    newPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleUpdatePassword = () => {
    if (!formData.currentPassword || !formData.newPassword) {
      toast({
        title: "Error",
        description: "Please fill in all password fields.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password Updated",
      description: "Your password has been updated successfully.",
    });
    
    setFormData({
      ...formData,
      currentPassword: "",
      newPassword: "",
    });
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your account and system settings
          </p>
        </div>

        <div className="mb-6 border-b">
          <div className="flex">
            {["Account", "Appearance", "Notifications"].map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm cursor-pointer ${
                  activeTab === tab
                    ? "bg-white text-violet-600 border border-gray-200 border-b-0 rounded-t-lg"
                    : "text-gray-500"
                }`}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>

        {activeTab === "Account" && (
          <>
            <Card className="mb-6">
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-2">Profile Information</h2>
                <p className="text-sm text-gray-500 mb-6">Update your account information</p>
                
                <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button onClick={handleSaveProfile} className="bg-violet-600 hover:bg-violet-700">
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-2">Password</h2>
                <p className="text-sm text-gray-500 mb-6">Change your password</p>
                
                <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Current Password</label>
                    <Input 
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">New Password</label>
                    <Input 
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button onClick={handleUpdatePassword} className="bg-violet-600 hover:bg-violet-700">
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === "Appearance" && (
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-6">Appearance Settings</h2>
              <p className="text-gray-500">Appearance settings will be available soon.</p>
            </CardContent>
          </Card>
        )}

        {activeTab === "Notifications" && (
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-6">Notification Preferences</h2>
              <p className="text-gray-500">Notification settings will be available soon.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default Settings;
