
import React, { useState } from "react";
import Layout from "@/components/dashboard/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Star, Edit, Trash2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

interface Testimonial {
  id: number;
  client: string;
  location: string;
  eventType: string;
  preview: string;
  rating: number;
  featured: boolean;
  status: boolean;
  avatar?: string;
}

const testimonialData: Testimonial[] = [
  {
    id: 1,
    client: "Sarah Johnson",
    location: "Boston, MA",
    eventType: "Wedding",
    preview: "The team went above and beyond...",
    rating: 5,
    featured: true,
    status: true,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    id: 2,
    client: "Michael Thompson",
    location: "CEO, Innovate Tech",
    eventType: "Corporate",
    preview: "Our annual company gala was...",
    rating: 4,
    featured: false,
    status: true,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  }
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(testimonialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    client: "",
    location: "",
    eventType: "Corporate",
    preview: "",
    rating: 0,
    featured: false,
    status: true
  });

  const handleAddTestimonial = () => {
    if (!newTestimonial.client || !newTestimonial.preview) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newId = Math.max(...testimonials.map(t => t.id), 0) + 1;
    setTestimonials([
      ...testimonials,
      { ...newTestimonial, id: newId }
    ]);
    
    setIsAddDialogOpen(false);
    setNewTestimonial({
      client: "",
      location: "",
      eventType: "Corporate",
      preview: "",
      rating: 0,
      featured: false,
      status: true
    });
    
    toast({
      title: "Testimonial Added",
      description: "The new testimonial has been added successfully."
    });
  };

  const handleToggleFeatured = (id: number) => {
    setTestimonials(testimonials.map(testimonial => 
      testimonial.id === id 
        ? { ...testimonial, featured: !testimonial.featured } 
        : testimonial
    ));
  };

  const handleToggleStatus = (id: number) => {
    setTestimonials(testimonials.map(testimonial => 
      testimonial.id === id 
        ? { ...testimonial, status: !testimonial.status } 
        : testimonial
    ));
  };

  const handleDelete = (id: number) => {
    setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
    toast({
      title: "Testimonial Deleted",
      description: "The testimonial has been deleted successfully."
    });
  };

  const handleRatingChange = (value: number) => {
    setNewTestimonial({
      ...newTestimonial,
      rating: value
    });
  };

  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Testimonials Management</h1>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-violet-600 hover:bg-violet-700">
            <Plus size={18} className="mr-2" /> Add Testimonial
          </Button>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search testimonials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-48">
            <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
              <option value="">All Events</option>
              <option value="wedding">Wedding</option>
              <option value="corporate">Corporate</option>
              <option value="social">Social</option>
            </select>
          </div>
          <div className="w-48">
            <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="px-6 py-4 text-sm text-gray-500">Client</th>
                <th className="px-6 py-4 text-sm text-gray-500">Event Type</th>
                <th className="px-6 py-4 text-sm text-gray-500">Testimonial Preview</th>
                <th className="px-6 py-4 text-sm text-gray-500">Rating</th>
                <th className="px-6 py-4 text-sm text-gray-500">Featured</th>
                <th className="px-6 py-4 text-sm text-gray-500">Status</th>
                <th className="px-6 py-4 text-sm text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {testimonials.map((testimonial) => (
                <tr key={testimonial.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={testimonial.avatar || "https://via.placeholder.com/40"}
                        alt={testimonial.client}
                        className="h-10 w-10 rounded-full mr-3"
                      />
                      <div>
                        <div className="font-medium">{testimonial.client}</div>
                        <div className="text-sm text-gray-500">{testimonial.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{testimonial.eventType}</td>
                  <td className="px-6 py-4 max-w-xs truncate">{testimonial.preview}</td>
                  <td className="px-6 py-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={18}
                          className={star <= testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleToggleFeatured(testimonial.id)}
                      className={`${testimonial.featured ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      <Star className={testimonial.featured ? 'fill-yellow-400' : ''} />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div 
                      className={`rounded-full h-6 w-12 flex items-center ${testimonial.status ? 'bg-green-400' : 'bg-gray-300'} cursor-pointer`}
                      onClick={() => handleToggleStatus(testimonial.id)}
                    >
                      <div 
                        className={`bg-white rounded-full h-4 w-4 transform transition-transform ${testimonial.status ? 'translate-x-7' : 'translate-x-1'}`} 
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-3">
                      <button className="text-blue-500 hover:text-blue-700">
                        <Edit size={18} />
                      </button>
                      <button 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(testimonial.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Testimonial</DialogTitle>
            <DialogDescription>
              Add a new client testimonial to showcase on your website.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-3">
              <label className="text-sm font-medium flex">
                Client Name <span className="text-red-500 ml-1">*</span>
              </label>
              <Input
                value={newTestimonial.client}
                onChange={(e) => setNewTestimonial({...newTestimonial, client: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium flex">
                  Event Type <span className="text-red-500 ml-1">*</span>
                </label>
                <select 
                  className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                  value={newTestimonial.eventType}
                  onChange={(e) => setNewTestimonial({...newTestimonial, eventType: e.target.value})}
                >
                  <option value="Corporate">Corporate</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Social">Social Event</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Rating (Optional)</label>
                <div className="flex mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={24}
                      onClick={() => handleRatingChange(star)}
                      className={`cursor-pointer ${
                        star <= newTestimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium">Client Designation/Location</label>
              <Input
                placeholder="e.g., CEO, Company Name or City, State"
                value={newTestimonial.location}
                onChange={(e) => setNewTestimonial({...newTestimonial, location: e.target.value})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium flex">
                Testimonial Quote <span className="text-red-500 ml-1">*</span>
              </label>
              <Textarea
                placeholder="Enter the client's testimonial here..."
                rows={4}
                className="resize-none"
                value={newTestimonial.preview}
                onChange={(e) => setNewTestimonial({...newTestimonial, preview: e.target.value})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Client Photo</label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="text-gray-400 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500">No client photo uploaded</p>
                  <p className="text-xs text-gray-400 mt-1">Click to add client photo</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Featured Testimonial</label>
                <Switch 
                  checked={newTestimonial.featured}
                  onCheckedChange={(checked) => setNewTestimonial({...newTestimonial, featured: checked})}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium">Active Status</label>
                <Switch 
                  checked={newTestimonial.status}
                  onCheckedChange={(checked) => setNewTestimonial({...newTestimonial, status: checked})}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-violet-600 hover:bg-violet-700" onClick={handleAddTestimonial}>
              <Plus className="mr-2 h-4 w-4" /> Add Testimonial
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Testimonials;
