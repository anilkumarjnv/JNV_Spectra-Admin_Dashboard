
import React, { useState } from "react";
import Layout from "@/components/dashboard/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Star, ArrowUpDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface PlanningItem {
  id: number;
  name: string;
  image: string;
  vendor: string;
  pricing: string;
  tags: string[];
  status: boolean;
  featured: boolean;
  slider: boolean;
  updated: string;
}

const initialItems: PlanningItem[] = [
  {
    id: 1,
    name: "Catering Service",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
    vendor: "Gourmet Delights",
    pricing: "$25-$75 per person",
    tags: ["Featured", "Slider"],
    status: true,
    featured: true,
    slider: true,
    updated: "15/06/2023"
  },
  {
    id: 2,
    name: "Venue Decoration",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80",
    vendor: "Decor Magic",
    pricing: "$800-$3000",
    tags: ["Featured", "Slider"],
    status: true,
    featured: true,
    slider: true,
    updated: "10/06/2023"
  }
];

const EventPlanning = () => {
  const [items, setItems] = useState<PlanningItem[]>(initialItems);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newItem, setNewItem] = useState({
    name: "",
    vendor: "",
    vendorContact: "",
    pricing: "",
    description: "",
    status: true
  });

  const handleAddItem = () => {
    if (!newItem.name) {
      toast({
        title: "Missing Information",
        description: "Please provide at least a name for the planning item.",
        variant: "destructive"
      });
      return;
    }

    const newId = Math.max(...items.map(i => i.id), 0) + 1;
    const item: PlanningItem = {
      id: newId,
      name: newItem.name,
      vendor: newItem.vendor,
      pricing: newItem.pricing,
      tags: [],
      status: newItem.status,
      featured: false,
      slider: false,
      updated: new Date().toLocaleDateString("en-GB"),
      image: "https://via.placeholder.com/100"
    };
    
    setItems([...items, item]);
    setIsAddItemOpen(false);
    
    toast({
      title: "Planning Item Added",
      description: "The new planning item has been added successfully."
    });
    
    setNewItem({
      name: "",
      vendor: "",
      vendorContact: "",
      pricing: "",
      description: "",
      status: true
    });
  };

  const handleToggleStatus = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, status: !item.status } : item
    ));
  };

  const handleToggleFeatured = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, featured: !item.featured } : item
    ));
  };

  const handleToggleSlider = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, slider: !item.slider } : item
    ));
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.vendor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Event Planning</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your event planning items
            </p>
          </div>
          <Button onClick={() => setIsAddItemOpen(true)} className="bg-violet-600 hover:bg-violet-700">
            <Plus size={18} className="mr-2" /> Add New
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8 max-md:grid-cols-2 max-sm:grid-cols-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-gray-500 text-sm mb-1">Total Planning Items</div>
            <div className="text-3xl font-bold">{items.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-gray-500 text-sm mb-1">Active Items</div>
            <div className="text-3xl font-bold">{items.filter(i => i.status).length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-gray-500 text-sm mb-1">Featured Items</div>
            <div className="text-3xl font-bold">{items.filter(i => i.featured).length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-gray-500 text-sm mb-1">Slider Images</div>
            <div className="text-3xl font-bold">{items.filter(i => i.slider).length}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search planning items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
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
                  NAME <ArrowUpDown size={14} className="cursor-pointer" />
                </th>
                <th className="px-6 py-4 text-sm text-gray-500">VENDOR</th>
                <th className="px-6 py-4 text-sm text-gray-500">PRICING</th>
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
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-10 w-10 rounded object-cover mr-3"
                      />
                      <div className="font-medium">{item.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{item.vendor}</td>
                  <td className="px-6 py-4">{item.pricing}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {item.featured && (
                        <Badge 
                          className="bg-amber-100 hover:bg-amber-200 text-amber-800 border-0"
                          onClick={() => handleToggleFeatured(item.id)}
                        >
                          <Star size={12} className="mr-1 fill-amber-500 text-amber-500" /> Featured
                        </Badge>
                      )}
                      {item.slider && (
                        <Badge 
                          className="bg-blue-100 hover:bg-blue-200 text-blue-800 border-0"
                          onClick={() => handleToggleSlider(item.id)}
                        >
                          Slider
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div 
                      className={`rounded-full h-6 w-12 flex items-center ${item.status ? 'bg-green-400' : 'bg-gray-300'} cursor-pointer`}
                      onClick={() => handleToggleStatus(item.id)}
                    >
                      <div 
                        className={`bg-white rounded-full h-4 w-4 transform transition-transform ${item.status ? 'translate-x-7' : 'translate-x-1'}`} 
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">{item.updated}</td>
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

      {/* Add Planning Item Dialog */}
      <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Planning Item</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new planning item.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div>
              <label className="text-sm font-medium flex">
                Planning Item Name <span className="text-red-500 ml-1">*</span>
              </label>
              <Input
                placeholder="Venue Decoration"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[100px]"
                placeholder="Enter a detailed description"
                value={newItem.description}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
              ></textarea>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">Vendor Name</label>
                <Input
                  placeholder="Vendor name (optional)"
                  value={newItem.vendor}
                  onChange={(e) => setNewItem({...newItem, vendor: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Vendor Contact</label>
                <Input
                  placeholder="Email or phone (optional)"
                  value={newItem.vendorContact}
                  onChange={(e) => setNewItem({...newItem, vendorContact: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Pricing</label>
              <Input
                placeholder="$500-$1500 (optional)"
                value={newItem.pricing}
                onChange={(e) => setNewItem({...newItem, pricing: e.target.value})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Status</label>
              <select 
                className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={newItem.status ? "active" : "inactive"}
                onChange={(e) => setNewItem({...newItem, status: e.target.value === "active"})}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Featured Image</label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">Upload a featured image for this planning item</p>
                  <button
                    type="button"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                  >
                    Add Image
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddItemOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-violet-600 hover:bg-violet-700" onClick={handleAddItem}>
              Add Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default EventPlanning;
