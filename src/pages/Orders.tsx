
import React, { useState } from "react";
import Layout from "@/components/dashboard/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, MoreVertical, FileText, Download, Mail, AlertCircle, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Order {
  id: number;
  customer: string;
  email: string;
  eventDate: string;
  service: string;
  status: "Confirmed" | "Pending" | "Cancelled";
}

interface Invoice {
  id: string;
  customer: string;
  email: string;
  date: string;
  total: number;
  status: "Paid" | "Unpaid";
  items: {
    description: string;
    quantity: number;
    rate: number;
  }[];
}

const initialOrders: Order[] = [
  {
    id: 1,
    customer: "Alice Johnson",
    email: "alice@example.com",
    eventDate: "Sep 20, 2023",
    service: "Wedding Photography",
    status: "Confirmed",
  },
  {
    id: 2,
    customer: "Bob Smith",
    email: "bob@example.com",
    eventDate: "Oct 5, 2023",
    service: "Sound System Rental",
    status: "Pending",
  },
];

const initialInvoices: Invoice[] = [
  {
    id: "INV-2023-001",
    customer: "Alice Johnson",
    email: "alice@example.com",
    date: "Jun 16, 2023",
    total: 1700,
    status: "Paid",
    items: [
      { description: "Wedding Photography Package", quantity: 1, rate: 1500 },
      { description: "Extra hour coverage", quantity: 1, rate: 200 }
    ]
  }
];

const Orders = () => {
  const [activeTab, setActiveTab] = useState<"Orders" | "Invoices">("Orders");
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [isEditOrderOpen, setIsEditOrderOpen] = useState(false);
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false);
  const [isViewInvoiceOpen, setIsViewInvoiceOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null);
  const [newOrder, setNewOrder] = useState<Omit<Order, "id">>({
    customer: "",
    email: "",
    eventDate: "",
    service: "",
    status: "Pending"
  });

  const handleEditOrder = (order: Order) => {
    setCurrentOrder(order);
    setIsEditOrderOpen(true);
  };

  const handleUpdateOrder = () => {
    if (currentOrder) {
      setOrders(orders.map(order => 
        order.id === currentOrder.id ? currentOrder : order
      ));
      setIsEditOrderOpen(false);
      toast({
        title: "Order Updated",
        description: "The order has been updated successfully."
      });
    }
  };

  const handleAddOrder = () => {
    if (!newOrder.customer || !newOrder.email || !newOrder.eventDate || !newOrder.service) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newId = Math.max(...orders.map(o => o.id), 0) + 1;
    const order = { ...newOrder, id: newId };
    setOrders([...orders, order]);
    
    setIsAddOrderOpen(false);
    setNewOrder({
      customer: "",
      email: "",
      eventDate: "",
      service: "",
      status: "Pending"
    });
    
    toast({
      title: "Order Added",
      description: "The new order has been added successfully."
    });
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setCurrentInvoice(invoice);
    setIsViewInvoiceOpen(true);
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-violet-100 text-violet-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      case "Paid":
        return "bg-green-100 text-green-700";
      case "Unpaid":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredOrders = orders.filter(order => 
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredInvoices = invoices.filter(invoice => 
    invoice.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPendingOrders = orders.filter(order => order.status === "Pending").length;
  const totalUnpaidInvoices = invoices.filter(invoice => invoice.status === "Unpaid").length;

  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Orders & Invoices</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your orders and generate invoices
            </p>
          </div>
          {activeTab === "Orders" && (
            <Button onClick={() => setIsAddOrderOpen(true)} className="bg-violet-600 hover:bg-violet-700">
              <Plus size={18} className="mr-2" /> Add New Order
            </Button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8 max-md:grid-cols-2 max-sm:grid-cols-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-gray-500 text-sm mb-1">Total Orders</div>
            <div className="text-3xl font-bold">{orders.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-gray-500 text-sm mb-1">Pending Orders</div>
            <div className="text-3xl font-bold">{totalPendingOrders}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-gray-500 text-sm mb-1">Total Invoices</div>
            <div className="text-3xl font-bold">{invoices.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-gray-500 text-sm mb-1">Unpaid Invoices</div>
            <div className="text-3xl font-bold">{totalUnpaidInvoices}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 bg-white rounded-lg overflow-hidden">
          <div className="flex">
            <div
              onClick={() => setActiveTab("Orders")}
              className={`px-6 py-4 text-sm cursor-pointer flex-1 text-center ${
                activeTab === "Orders"
                  ? "bg-white border-b-2 border-violet-600 text-violet-600 font-medium"
                  : "bg-gray-50 text-gray-500"
              }`}
            >
              Orders
            </div>
            <div
              onClick={() => setActiveTab("Invoices")}
              className={`px-6 py-4 text-sm cursor-pointer flex-1 text-center ${
                activeTab === "Invoices"
                  ? "bg-white border-b-2 border-violet-600 text-violet-600 font-medium"
                  : "bg-gray-50 text-gray-500"
              }`}
            >
              Invoices
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder={activeTab === "Orders" 
                ? "Search orders by customer name or email..." 
                : "Search invoices by number or client name..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-48">
            <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm">
              <option value="">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {activeTab === "Orders" && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-6 py-4 text-sm text-gray-500">CUSTOMER</th>
                  <th className="px-6 py-4 text-sm text-gray-500">EVENT DATE</th>
                  <th className="px-6 py-4 text-sm text-gray-500">SERVICE TYPE</th>
                  <th className="px-6 py-4 text-sm text-gray-500">STATUS</th>
                  <th className="px-6 py-4 text-sm text-gray-500">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </td>
                    <td className="px-6 py-4">{order.eventDate}</td>
                    <td className="px-6 py-4">{order.service}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditOrder(order)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "Invoices" && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 text-left">
                <tr>
                  <th className="px-6 py-4 text-sm text-gray-500">INVOICE #</th>
                  <th className="px-6 py-4 text-sm text-gray-500">DATE</th>
                  <th className="px-6 py-4 text-sm text-gray-500">CLIENT</th>
                  <th className="px-6 py-4 text-sm text-gray-500">TOTAL</th>
                  <th className="px-6 py-4 text-sm text-gray-500">STATUS</th>
                  <th className="px-6 py-4 text-sm text-gray-500">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{invoice.id}</td>
                    <td className="px-6 py-4">{invoice.date}</td>
                    <td className="px-6 py-4">
                      <div>{invoice.customer}</div>
                      <div className="text-sm text-gray-500">{invoice.email}</div>
                    </td>
                    <td className="px-6 py-4">${invoice.total.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewInvoice(invoice)}>
                              <FileText className="mr-2 h-4 w-4" /> View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" /> Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" /> Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <AlertCircle className="mr-2 h-4 w-4" /> Mark as Unpaid
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Order Dialog */}
      <Dialog open={isEditOrderOpen} onOpenChange={setIsEditOrderOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Order</DialogTitle>
            <DialogDescription>
              Update the details for this order.
            </DialogDescription>
          </DialogHeader>
          
          {currentOrder && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium">Customer Name</label>
                  <Input
                    value={currentOrder.customer}
                    onChange={(e) => setCurrentOrder({...currentOrder, customer: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    value={currentOrder.email}
                    onChange={(e) => setCurrentOrder({...currentOrder, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium">Contact Number</label>
                  <Input placeholder="555-123-4567" />
                </div>
                <div>
                  <label className="text-sm font-medium">Event Date</label>
                  <Input 
                    type="text" 
                    value={currentOrder.eventDate}
                    onChange={(e) => setCurrentOrder({...currentOrder, eventDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Service Type</label>
                <Input
                  value={currentOrder.service}
                  onChange={(e) => setCurrentOrder({...currentOrder, service: e.target.value})}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Status</label>
                <select 
                  className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                  value={currentOrder.status}
                  onChange={(e) => setCurrentOrder({...currentOrder, status: e.target.value as "Confirmed" | "Pending" | "Cancelled"})}
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Notes</label>
                <Textarea
                  placeholder="Client requested extra hour of coverage"
                  rows={3}
                  className="resize-none"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOrderOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-violet-600 hover:bg-violet-700" onClick={handleUpdateOrder}>
              Update Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add New Order Dialog */}
      <Dialog open={isAddOrderOpen} onOpenChange={setIsAddOrderOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Order</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new order.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium flex">
                  Customer Name <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  value={newOrder.customer}
                  onChange={(e) => setNewOrder({...newOrder, customer: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium flex">
                  Email <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  type="email"
                  value={newOrder.email}
                  onChange={(e) => setNewOrder({...newOrder, email: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">Contact Number</label>
                <Input placeholder="555-123-4567" />
              </div>
              <div>
                <label className="text-sm font-medium flex">
                  Event Date <span className="text-red-500 ml-1">*</span>
                </label>
                <Input 
                  type="date" 
                  value={newOrder.eventDate}
                  onChange={(e) => setNewOrder({...newOrder, eventDate: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium flex">
                Service Type <span className="text-red-500 ml-1">*</span>
              </label>
              <Input
                value={newOrder.service}
                onChange={(e) => setNewOrder({...newOrder, service: e.target.value})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Status</label>
              <select 
                className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                value={newOrder.status}
                onChange={(e) => setNewOrder({...newOrder, status: e.target.value as "Confirmed" | "Pending" | "Cancelled"})}
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Notes</label>
              <Textarea
                placeholder="Add any additional notes about this order"
                rows={3}
                className="resize-none"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOrderOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-violet-600 hover:bg-violet-700" onClick={handleAddOrder}>
              <Plus className="mr-2 h-4 w-4" /> Add Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Invoice Dialog */}
      <Dialog open={isViewInvoiceOpen} onOpenChange={setIsViewInvoiceOpen}>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle>Invoice #{currentInvoice?.id}</DialogTitle>
            <DialogDescription>
              Created on {currentInvoice?.date}
            </DialogDescription>
          </DialogHeader>
          
          {currentInvoice && (
            <div className="py-4">
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-sm text-gray-500 mb-2">From:</h3>
                  <div className="font-medium">Your Company Name</div>
                  <div className="text-sm">123 Business Street</div>
                  <div className="text-sm">City, State ZIP</div>
                  <div className="text-sm">contact@yourcompany.com</div>
                </div>
                <div className="text-right">
                  <h3 className="text-sm text-gray-500 mb-2">To:</h3>
                  <div className="font-medium">{currentInvoice.customer}</div>
                  <div className="text-sm">{currentInvoice.email}</div>
                  <div className="text-sm">555-123-4567</div>
                </div>
              </div>
              
              <div className="border-t border-b border-gray-200 py-4 mb-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-medium">Description</th>
                      <th className="text-center py-2 font-medium">Qty</th>
                      <th className="text-right py-2 font-medium">Rate</th>
                      <th className="text-right py-2 font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentInvoice.items.map((item, index) => (
                      <tr key={index}>
                        <td className="py-3">{item.description}</td>
                        <td className="text-center py-3">{item.quantity}</td>
                        <td className="text-right py-3">${item.rate.toFixed(2)}</td>
                        <td className="text-right py-3">${(item.quantity * item.rate).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm mt-4">Thank you for your business!</div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium mr-8">Total:</span>
                    <span className="font-bold">${currentInvoice.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium mr-8">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(currentInvoice.status)}`}>
                      {currentInvoice.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewInvoiceOpen(false)}>
              Close
            </Button>
            <Button className="bg-violet-600 hover:bg-violet-700">
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Orders;
