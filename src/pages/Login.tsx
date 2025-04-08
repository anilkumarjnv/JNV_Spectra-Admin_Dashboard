
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password.",
        variant: "destructive"
      });
      return;
    }
    
    // For demo purposes, allow any login
    navigate("/");
    
    toast({
      title: "Login Successful",
      description: "Welcome to Media Hub Admin Dashboard!",
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center bg-indigo-700 w-12 h-12 rounded-lg mb-4">
          <Image size={24} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Media Hub</h1>
        <p className="text-sm text-gray-500">Admin Dashboard</p>
      </div>
      
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-xl font-bold mb-2">Login</h2>
        <p className="text-sm text-gray-500 mb-6">Enter your credentials to access your dashboard</p>
        
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-sm text-violet-600 hover:text-violet-700">Forgot password?</a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <Button type="submit" className="w-full py-6 bg-violet-600 hover:bg-violet-700">
              Log in
            </Button>
          </div>
        </form>
        
        <p className="text-center text-sm text-gray-500 mt-6">
          This is a demo. Use any email and password to log in.
        </p>
      </div>
    </div>
  );
};

export default Login;
