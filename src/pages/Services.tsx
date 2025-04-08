
import React, { useState } from "react";
import Layout from "@/components/dashboard/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Star, ArrowUpDown, ChevronLeft } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface Service {
  id: number;
  title: string;
  price: string;
  image: string;
  category: "Service" | "Rental";
  tags: string[];
  status: boolean;
  featured: boolean;
  slider: boolean;
  updated: string;
}

const initialServices: Service[] = [
  {
    id: 1,
    title: "Event Coordination",
    price: "$1000-$5000",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
    category: "Service",
    tags: ["Featured", "Slider"],
    status: true,
    featured: true,
    slider: true,
    updated: "15/06/2023"
  },
  {
    id: 2,
    title: "Photography Service",
    price: "$500-$1500",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
    category: "Service",
    tags: ["Featured", "Slider"],
    status: true,
    featured: true,
    slider: true,
    updated: "10/05/2023"
  },
  {
    id: 3,
    title: "Sound System Rental",
    price: "$300/day",
    image: "https://images.unsplash.com/photo-1520170350707-b2da59970118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
    category: "Rental",
    tags: ["Featured"],
    status: true,
    featured: true,
    slider: false,
    updated: "20/07/2023"
  }
];

const Services = () => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"General" | "Images" | "Details">("General");
  const [newService, setNewService] = useState({
    title: "",
    price: "",
    category: "Service" as "Service" | "Rental",
    description: "",
    status: true
  });

  const handleAddService = () => {
    if (!newService.title) {
      toast({
        title: "Missing Information",
        description: "Please provide at least a title for the service/rental item.",
        variant: "destructive"
      });
      return;
    }

    const newId = Math.max(...services.map(s => s.id), 0) + 1;
    const service: Service = {
      id: newId,
      title: newService.title,
      price: newService.price,
      category: newService.category,
      image: "https://via.placeholder.com/100",
      tags: [],
      status: newService.status,
      featured: false,
      slider: false,
      updated: new Date().toLocaleDateString("en-GB")
    };
    
    setServices([...services, service]);
    setIsAddOpen(false);
    
    toast({
      title: "Service Added",
      description: "The new service/rental item has been added successfully."
    });
    
    setNewService({
      title: "",
      price: "",
      category: "Service",
      description: "",
      status: true
    });
    
    setActiveTab("General");
  };

  const handleToggleStatus = (id: number) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, status: !service.status } : service
    ));
  };

  const handleToggleFeatured = (id: number) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, featured: !service.featured } : service
    ));
  };

  const handleToggleSlider = (id: number) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, slider: !service.slider } : service
    ));
  };

  const servicesCount = services.filter(s => s.category === "Service").length;
  const rentalsCount = services.filter(s => s.category === "Rental").length;
  const filteredServices = services.filter(service => 
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Services & Rentals</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your services and rentals offerings
            </p>
          </div>
          <Button onClick={() => setIsAddOpen(true)} className="bg-violet-600 hover:bg-violet-700">
            <Plus size={18} className="mr-2" /> Add New
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8 max-md:grid-cols-2 max-sm:grid-cols-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-gray-500 text-sm mb-1">Total Items</div>
            <div className="text-3xl font-bold">{services.length}</div>
            <div className="text-sm text-gray-500 mt-1">{servicesCount} services, {rentalsCount} rentals</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-gray-500 text-sm mb-1">Active Items</div>
            <div className="text-3xl font-bold">{services.filter(s => s.status).length}</div>
            <div className="text-sm text-gray-500 mt-1">{services.filter(s => s.status && s.category === "Service").length} services, {services.filter(s => s.status && s.category === "Rental").length} rentals</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-gray-500 text-sm mb-1">Featured Items</div>
            <div className="text-3xl font-bold">{services.filter(s => s.featured).length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-gray-500 text-sm mb-1">Slider Images</div>
            <div className="text-3xl font-bold">{services.filter(s => s.slider).length}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search services or rentals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-48">
            <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
              <option value="">All</option>
              <option value="service">Services</option>
              <option value="rental">Rentals</option>
            </select>
          </div>
          <div className="w-48">
            <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-4 text-sm text-gray-500 flex items-center gap-1">
                  TITLE <ArrowUpDown size={14} className="cursor-pointer" />
                </th>
                <th className="px-6 py-4 text-sm text-gray-500 flex items-center gap-1">
                  CATEGORY <ArrowUpDown size={14} className="cursor-pointer" />
                </th>
                <th className="px-6 py-4 text-sm text-gray-500">TAGS</th>
                <th className="px-6 py-4 text-sm text-gray-500 flex items-center gap-1">
                  STATUS <ArrowUpDown size={14} className="cursor-pointer" />
                </th>
                <th className="px-6 py-4 text-sm text-gray-500 flex items-center gap-1">
                  UPDATED <ArrowUpDown size={14} className="cursor-pointer" />
                </th>
                <th className="px-6 py-4 text-sm text-gray-500">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-10 w-10 rounded object-cover mr-3"
                      />
                      <div>
                        <div className="font-medium">{service.title}</div>
                        <div className="text-xs text-gray-500">{service.price}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge 
                      className={`${
                        service.category === "Service" 
                          ? "bg-violet-100 text-violet-800" 
                          : "bg-blue-100 text-blue-800"
                      } border-0`}
                    >
                      {service.category}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {service.featured && (
                        <Badge 
                          className="bg-amber-100 hover:bg-amber-200 text-amber-800 border-0"
                          onClick={() => handleToggleFeatured(service.id)}
                        >
                          <Star size={12} className="mr-1 fill-amber-500 text-amber-500" /> Featured
                        </Badge>
                      )}
                      {service.slider && (
                        <Badge 
                          className="bg-blue-100 hover:bg-blue-200 text-blue-800 border-0"
                          onClick={() => handleToggleSlider(service.id)}
                        >
                          Slider
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div 
                      className={`rounded-full h-6 w-12 flex items-center ${service.status ? 'bg-green-400' : 'bg-gray-300'} cursor-pointer`}
                      onClick={() => handleToggleStatus(service.id)}
                    >
                      <div 
                        className={`bg-white rounded-full h-4 w-4 transform transition-transform ${service.status ? 'translate-x-7' : 'translate-x-1'}`} 
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">{service.updated}</td>
                  <td className="px-6 py-4">
                    <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.854 1.146a.5.5 0 00-.707 0L3.5 8.793V11.5h2.707l7.647-7.646a.5.5 0 000-.708l-2-2zM3 9.207L10.293 1.5 12.5 3.707 5.207 11H3V9.207z" fill="currentColor"></path>
                      </svg>
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 w-9 p-0 ml-2 text-red-500">
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H3.5C3.22386 4 3 3.77614 3 3.5ZM3 7C3 6.44772 3.44772 6 4 6H11C11.5523 6 12 6.44772 12 7V11C12 11.5523 11.5523 12 11 12H4C3.44772 12 3 11.5523 3 11V7Z" fill="currentColor"></path>
                      </svg>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Service Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[650px] p-0">
          <div className="px-6 py-4 border-b flex items-center">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsAddOpen(false)}>
              <ChevronLeft size={16} />
            </Button>
            <div className="flex-1 text-center">
              <DialogTitle>Add New Service/Rental</DialogTitle>
              <DialogDescription className="mt-1">
                Create new service or rental item
              </DialogDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-violet-600 hover:bg-violet-700" onClick={handleAddService}>
                Save
              </Button>
            </div>
          </div>
          
          {/* Tabs for the dialog */}
          <div>
            <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as "General" | "Images" | "Details")}>
              <div className="border-b">
                <TabsList className="flex w-full bg-transparent border-0 p-0">
                  <TabsTrigger 
                    value="General" 
                    className={`flex-1 rounded-none border-b-2 px-6 py-3 ${activeTab === "General" ? "border-violet-600 text-violet-600" : "border-transparent text-gray-500"}`}
                  >
                    General
                  </TabsTrigger>
                  <TabsTrigger 
                    value="Images" 
                    className={`flex-1 rounded-none border-b-2 px-6 py-3 ${activeTab === "Images" ? "border-violet-600 text-violet-600" : "border-transparent text-gray-500"}`}
                  >
                    Images
                  </TabsTrigger>
                  <TabsTrigger 
                    value="Details" 
                    className={`flex-1 rounded-none border-b-2 px-6 py-3 ${activeTab === "Details" ? "border-violet-600 text-violet-600" : "border-transparent text-gray-500"}`}
                  >
                    Details
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="General" className="p-6">
                <div className="grid gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">General Information</h3>
                    <p className="text-sm text-gray-500 mb-4">Basic information about the service or rental</p>
                    
                    <div className="grid gap-4">
                      <div>
                        <label className="text-sm font-medium flex">
                          Title <span className="text-red-500 ml-1">*</span>
                        </label>
                        <Input
                          placeholder="Enter title"
                          value={newService.title}
                          onChange={(e) => setNewService({...newService, title: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <div className="border rounded-md mt-1">
                          <div className="flex items-center border-b px-3 py-2 gap-1">
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                                <path d="M5 4.89171V10.1083C5 10.3403 5.24061 10.4773 5.43678 10.3756L10.1299 7.76728C10.3574 7.64929 10.3574 7.35071 10.1299 7.23272L5.43678 4.62437C5.24061 4.52272 5 4.65967 5 4.89171Z" fill="currentColor"></path>
                              </svg>
                            </button>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                                <path d="M3.68979 2.75C3.68979 2.47386 3.91366 2.25 4.18979 2.25H10.6898C10.9659 2.25 11.1898 2.47386 11.1898 2.75V4.25C11.1898 4.52614 10.9659 4.75 10.6898 4.75H4.18979C3.91366 4.75 3.68979 4.52614 3.68979 4.25V2.75ZM3.68979 6.25C3.68979 5.97386 3.91366 5.75 4.18979 5.75H10.6898C10.9659 5.75 11.1898 5.97386 11.1898 6.25V7.75C11.1898 8.02614 10.9659 8.25 10.6898 8.25H4.18979C3.91366 8.25 3.68979 8.02614 3.68979 7.75V6.25ZM4.18979 9.25C3.91366 9.25 3.68979 9.47386 3.68979 9.75V11.25C3.68979 11.5261 3.91366 11.75 4.18979 11.75H10.6898C10.9659 11.75 11.1898 11.5261 11.1898 11.25V9.75C11.1898 9.47386 10.9659 9.25 10.6898 9.25H4.18979Z" fill="currentColor"></path>
                              </svg>
                            </button>
                          </div>
                          <textarea
                            className="w-full px-3 py-2 text-sm min-h-[150px] focus:outline-none"
                            placeholder="Enter a detailed description..."
                            value={newService.description}
                            onChange={(e) => setNewService({...newService, description: e.target.value})}
                          ></textarea>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Category</label>
                        <select 
                          className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                          value={newService.category}
                          onChange={(e) => setNewService({...newService, category: e.target.value as "Service" | "Rental"})}
                        >
                          <option value="Service">Service</option>
                          <option value="Rental">Rental</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Pricing (Optional)</label>
                        <Input
                          placeholder="e.g., $500-$1500"
                          value={newService.price}
                          onChange={(e) => setNewService({...newService, price: e.target.value})}
                        />
                      </div>
                      
                      <div className="flex items-center mt-2">
                        <input 
                          type="checkbox" 
                          id="active" 
                          checked={newService.status}
                          onChange={(e) => setNewService({...newService, status: e.target.checked})}
                          className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                        />
                        <label htmlFor="active" className="ml-2 text-sm">Active</label>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="Images" className="p-6">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Images</h3>
                  <p className="text-sm text-gray-500 mb-4">Upload and manage images for this service or rental</p>
                  
                  <div className="mb-6">
                    <label className="text-sm font-medium">Featured Image <span className="text-red-500">*</span></label>
                    <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="mt-1 text-sm text-gray-600">No featured image uploaded</p>
                        <p className="text-xs text-gray-400 mt-1">Click to add featured image</p>
                      </div>
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button variant="outline" size="sm">
                        <Plus size={16} className="mr-2" /> Add Image
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium">Additional Images</label>
                      <Button variant="outline" size="sm">
                        <Plus size={16} className="mr-2" /> Add More Images
                      </Button>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="mt-1 text-sm text-gray-600">No additional images uploaded</p>
                        <p className="text-xs text-gray-400 mt-1">Click to add additional images</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="Details" className="p-6">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Additional Details</h3>
                  <p className="text-sm text-gray-500 mb-4">Add specifications and other details</p>
                  
                  <div className="grid gap-4">
                    <div>
                      <label className="text-sm font-medium">Specifications</label>
                      <textarea
                        className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[100px]"
                        placeholder="Enter specifications or features..."
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Terms & Conditions</label>
                      <textarea
                        className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[100px]"
                        placeholder="Enter terms and conditions..."
                      ></textarea>
                    </div>
                    
                    <div className="flex items-center mt-2">
                      <input 
                        type="checkbox" 
                        id="featured" 
                        className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                      />
                      <label htmlFor="featured" className="ml-2 text-sm">Featured</label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="slider" 
                        className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                      />
                      <label htmlFor="slider" className="ml-2 text-sm">Show in Slider</label>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Services;
