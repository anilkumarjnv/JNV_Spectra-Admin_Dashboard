
import React, { useState } from "react";
import Layout from "@/components/dashboard/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Star, Calendar, ArrowUpDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface Event {
  id: number;
  title: string;
  date: string;
  type: string;
  imageCount: number;
  tags: string[];
  status: boolean;
  featured: boolean;
  slider: boolean;
  updated: string;
  image: string;
}

const initialEvents: Event[] = [
  {
    id: 1,
    title: "Johnson Wedding",
    date: "May 15, 2023",
    type: "Wedding",
    imageCount: 2,
    tags: ["Featured", "Slider"],
    status: true,
    featured: true,
    slider: true,
    updated: "20/05/2023",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 2,
    title: "Tech Corp Annual Gala",
    date: "Jul 10, 2023",
    type: "Corporate",
    imageCount: 1,
    tags: ["Featured", "Slider"],
    status: true,
    featured: true,
    slider: true,
    updated: "15/07/2023",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
  }
];

const EventsHosted = () => {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    type: "Wedding",
    status: true,
    description: ""
  });

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newId = Math.max(...events.map(e => e.id), 0) + 1;
    const event: Event = {
      id: newId,
      title: newEvent.title,
      date: newEvent.date,
      type: newEvent.type,
      imageCount: 0,
      tags: [],
      status: newEvent.status,
      featured: false,
      slider: false,
      updated: new Date().toLocaleDateString("en-GB"),
      image: "https://via.placeholder.com/100"
    };
    
    setEvents([...events, event]);
    setIsAddEventOpen(false);
    
    toast({
      title: "Event Added",
      description: "The new event has been added successfully."
    });
    
    setNewEvent({
      title: "",
      date: "",
      type: "Wedding",
      status: true,
      description: ""
    });
  };

  const handleToggleStatus = (id: number) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, status: !event.status } : event
    ));
  };

  const handleToggleFeatured = (id: number) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, featured: !event.featured } : event
    ));
  };

  const handleToggleSlider = (id: number) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, slider: !event.slider } : event
    ));
  };

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Events Hosted</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your past events
            </p>
          </div>
          <Button onClick={() => setIsAddEventOpen(true)} className="bg-violet-600 hover:bg-violet-700">
            <Plus size={18} className="mr-2" /> Add New
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8 max-md:grid-cols-2 max-sm:grid-cols-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-gray-500 text-sm mb-1">Total Events</div>
            <div className="text-3xl font-bold">{events.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-gray-500 text-sm mb-1">Active Events</div>
            <div className="text-3xl font-bold">{events.filter(e => e.status).length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-gray-500 text-sm mb-1">Featured Events</div>
            <div className="text-3xl font-bold">{events.filter(e => e.featured).length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-gray-500 text-sm mb-1">Slider Images</div>
            <div className="text-3xl font-bold">{events.reduce((sum, e) => e.slider ? sum + e.imageCount : sum, 0)}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-48">
            <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
              <option value="">All Types</option>
              <option value="wedding">Wedding</option>
              <option value="corporate">Corporate</option>
              <option value="social">Social</option>
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
                  EVENT DATE <ArrowUpDown size={14} className="cursor-pointer" />
                </th>
                <th className="px-6 py-4 text-sm text-gray-500 flex items-center gap-1">
                  TYPE <ArrowUpDown size={14} className="cursor-pointer" />
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
              {filteredEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="h-10 w-10 rounded object-cover mr-3"
                      />
                      <div>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-xs text-gray-500">{event.imageCount} gallery images</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      {event.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">{event.type}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {event.featured && (
                        <Badge 
                          className="bg-amber-100 hover:bg-amber-200 text-amber-800 border-0"
                          onClick={() => handleToggleFeatured(event.id)}
                        >
                          <Star size={12} className="mr-1 fill-amber-500 text-amber-500" /> Featured
                        </Badge>
                      )}
                      {event.slider && (
                        <Badge 
                          className="bg-blue-100 hover:bg-blue-200 text-blue-800 border-0"
                          onClick={() => handleToggleSlider(event.id)}
                        >
                          Slider
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div 
                      className={`rounded-full h-6 w-12 flex items-center ${event.status ? 'bg-green-400' : 'bg-gray-300'} cursor-pointer`}
                      onClick={() => handleToggleStatus(event.id)}
                    >
                      <div 
                        className={`bg-white rounded-full h-4 w-4 transform transition-transform ${event.status ? 'translate-x-7' : 'translate-x-1'}`} 
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">{event.updated}</td>
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

      {/* Add Event Dialog */}
      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new event.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-3">
              <label className="text-sm font-medium flex">
                Event Title <span className="text-red-500 ml-1">*</span>
              </label>
              <Input
                placeholder="Johnson Wedding"
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium flex">
                  Event Date <span className="text-red-500 ml-1">*</span>
                </label>
                <Input 
                  type="date" 
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium flex">
                  Event Type <span className="text-red-500 ml-1">*</span>
                </label>
                <select 
                  className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Social">Social Event</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm min-h-[100px]"
                placeholder="Enter a detailed description"
                value={newEvent.description}
                onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
              ></textarea>
            </div>
            
            <div>
              <label className="text-sm font-medium">Status</label>
              <select 
                className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={newEvent.status ? "active" : "inactive"}
                onChange={(e) => setNewEvent({...newEvent, status: e.target.value === "active"})}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Images</label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">Add images for this event. The first image will be used as the featured image.</p>
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
            <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-violet-600 hover:bg-violet-700" onClick={handleAddEvent}>
              Add Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default EventsHosted;
