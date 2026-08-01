import React, { useState } from 'react';
import { useStore } from '../data/store';
import { SALES_ANALYTICS_DATA } from '../data/initialData';
import {
  BarChart3,
  Package,
  Tag,
  ShoppingBag,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  AlertTriangle,
  Users,
  DollarSign,
  CheckCircle,
  Eye,
  Calendar,
  X
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

export const AdminDashboard = () => {
  const {
    adminTab,
    setAdminTab,
    products,
    discounts,
    orders,
    saveProduct,
    deleteProduct,
    createDiscount,
    toggleDiscountStatus,
    deleteDiscount,
    updateOrderStatus,
    categories,
    showToast
  } = useStore();

  // --- Modals State ---
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddDiscountOpen, setIsAddDiscountOpen] = useState(false);

  // Form State for New Product
  const [productForm, setProductForm] = useState({
    name: '',
    category_id: 'oils',
    sku: '',
    unit: '100 g',
    price: 1500,
    discount_price: '',
    stock_qty: 25,
    image: 'https://images.unsplash.com/photo-1608248597263-00079e96047a?auto=format&fit=crop&w=600&q=80',
    description: '',
    ingredients: '',
    usage_info: ''
  });

  // Form State for New Discount
  const [discountForm, setDiscountForm] = useState({
    name: '',
    type: 'percentage',
    value: 15,
    coupon_code: '',
    target: 'product',
    target_id: products[0]?.id || 'prod-101',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    description: ''
  });

  // Calculate High-level Analytics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total_amount, 0) + 1420000; // Adding historical baseline
  const totalOrdersCount = orders.length + 380;
  const totalStockItems = products.reduce((sum, p) => sum + p.stock_qty, 0);
  const lowStockProducts = products.filter((p) => p.stock_qty <= 5);

  const handleOpenEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      ...product,
      discount_price: product.discount_price || ''
    });
    setIsAddProductOpen(true);
  };

  const handleSaveProductForm = (e) => {
    e.preventDefault();
    saveProduct({
      ...productForm,
      id: editingProduct ? editingProduct.id : undefined,
      price: parseFloat(productForm.price),
      discount_price: productForm.discount_price ? parseFloat(productForm.discount_price) : null,
      stock_qty: parseInt(productForm.stock_qty, 10)
    });
    setIsAddProductOpen(false);
    setEditingProduct(null);
  };

  const handleSaveDiscountForm = (e) => {
    e.preventDefault();
    createDiscount({
      ...discountForm,
      value: parseFloat(discountForm.value)
    });
    setIsAddDiscountOpen(false);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Admin Title & Tab Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-emerald-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-emerald-950 text-xs font-black mb-2">
            Store Admin Control Center
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold">HerbalMart Operations & Analytics</h1>
          <p className="text-emerald-200 text-xs mt-1">Manage catalog, run discount campaigns, and track product performance.</p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex items-center gap-2 bg-emerald-900/90 p-1.5 rounded-2xl border border-emerald-700/60 overflow-x-auto">
          <button
            onClick={() => setAdminTab('analytics')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              adminTab === 'analytics' ? 'bg-amber-400 text-emerald-950 shadow-md' : 'text-emerald-200 hover:text-white'
            }`}
          >
            <BarChart3 size={15} /> Sales Analytics
          </button>
          <button
            onClick={() => setAdminTab('products')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              adminTab === 'products' ? 'bg-amber-400 text-emerald-950 shadow-md' : 'text-emerald-200 hover:text-white'
            }`}
          >
            <Package size={15} /> Products ({products.length})
          </button>
          <button
            onClick={() => setAdminTab('discounts')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              adminTab === 'discounts' ? 'bg-amber-400 text-emerald-950 shadow-md' : 'text-emerald-200 hover:text-white'
            }`}
          >
            <Tag size={15} /> Discount Engine
          </button>
          <button
            onClick={() => setAdminTab('orders')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              adminTab === 'orders' ? 'bg-amber-400 text-emerald-950 shadow-md' : 'text-emerald-200 hover:text-white'
            }`}
          >
            <ShoppingBag size={15} /> Orders ({orders.length})
          </button>
        </div>
      </div>

      {/* SECTION 1: Sales & Product Performance Analytics (PRD 4.1.2) */}
      {adminTab === 'analytics' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Top Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Sales Revenue</div>
                <div className="text-2xl font-black text-emerald-950 mt-1">
                  Rs. {totalRevenue.toLocaleString('en-LK')}
                </div>
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-1">
                  <TrendingUp size={12} /> +18.4% vs last month
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <DollarSign size={24} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Customer Orders</div>
                <div className="text-2xl font-black text-slate-900 mt-1">{totalOrdersCount}</div>
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-1">
                  <TrendingUp size={12} /> +12.5% order growth
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                <ShoppingBag size={24} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Catalog Stock</div>
                <div className="text-2xl font-black text-slate-900 mt-1">{totalStockItems} Units</div>
                <span className="text-[11px] font-bold text-amber-600 flex items-center gap-1 mt-1">
                  <AlertTriangle size={12} /> {lowStockProducts.length} items low stock
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Package size={24} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Campaigns</div>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  {discounts.filter((d) => d.status === 'active').length} Promos
                </div>
                <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-1">
                  <CheckCircle size={12} /> Auto-applying at checkout
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                <Tag size={24} />
              </div>
            </div>

          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sales Trend Chart */}
            <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-heading font-bold text-slate-900 text-lg">Sales Revenue & Order Trend</h3>
                  <p className="text-xs text-slate-500">Monthly revenue growth from herbal product catalog.</p>
                </div>
                <span className="bg-emerald-100 text-emerald-900 font-bold text-xs px-3 py-1 rounded-full">
                  Monthly Growth
                </span>
              </div>

              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={SALES_ANALYTICS_DATA.monthly_revenue}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1b4332" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#52b788" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `Rs.${v / 1000}k`} />
                    <Tooltip
                      formatter={(val) => [`Rs. ${val.toLocaleString('en-LK')}`, 'Revenue']}
                      contentStyle={{ borderRadius: '12px', border: '1px solid #d8f3dc' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#1b4332" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Sales Share Pie Chart */}
            <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
              <div>
                <h3 className="font-heading font-bold text-slate-900 text-lg">Category Revenue Share</h3>
                <p className="text-xs text-slate-500">Breakdown of sales by product type.</p>
              </div>

              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={SALES_ANALYTICS_DATA.category_sales}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {SALES_ANALYTICS_DATA.category_sales.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Performance Lists: Best Sellers & Stock Alert */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Top Performing Products */}
            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-slate-900 text-lg flex items-center gap-2">
                <TrendingUp size={20} className="text-emerald-700" /> Best-Selling Herbal Products
              </h3>

              <div className="space-y-3">
                {products.slice(0, 4).map((p, idx) => (
                  <div key={p.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="font-black text-xs text-emerald-900 w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center">
                        #{idx + 1}
                      </span>
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{p.name}</h4>
                        <span className="text-[10px] text-slate-400">SKU: {p.sku} • {p.unit}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-black text-emerald-950">
                        Rs. {(p.price * 48).toLocaleString('en-LK')}
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700">48 units sold</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Low Stock Warning Panel */}
            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-slate-900 text-lg flex items-center gap-2">
                <AlertTriangle size={20} className="text-amber-500" /> Stock & Restock Alert Monitor
              </h3>

              <div className="space-y-3">
                {lowStockProducts.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-500 font-semibold">
                    All product stock levels are currently healthy!
                  </div>
                ) : (
                  lowStockProducts.map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-3 bg-amber-50 rounded-2xl border border-amber-200">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <h4 className="font-bold text-xs text-slate-900">{p.name}</h4>
                          <span className="text-[10px] text-amber-800 font-semibold">
                            CRITICAL LOW STOCK: {p.stock_qty} left
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleOpenEditProduct(p)}
                        className="btn-accent text-[11px] px-3 py-1.5 rounded-lg font-bold"
                      >
                        Restock Now
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* SECTION 2: Product Management (PRD 4.1.1) */}
      {adminTab === 'products' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <h2 className="font-heading font-bold text-lg text-slate-900">Herbal Product Catalog CRUD</h2>
              <p className="text-xs text-slate-500">Add new products, update prices, ingredients, and adjust stock quantities.</p>
            </div>
            <button
              onClick={() => {
                setEditingProduct(null);
                setProductForm({
                  name: '',
                  category_id: 'oils',
                  sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
                  unit: '100 g',
                  price: 1800,
                  discount_price: '',
                  stock_qty: 30,
                  image: 'https://images.unsplash.com/photo-1608248597263-00079e96047a?auto=format&fit=crop&w=600&q=80',
                  description: '',
                  ingredients: '',
                  usage_info: ''
                });
                setIsAddProductOpen(true);
              }}
              className="btn-primary text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md"
            >
              <Plus size={16} /> Add New Herbal Product
            </button>
          </div>

          {/* Product Table */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Product Details</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">SKU / Unit</th>
                    <th className="p-4">Price / Discount</th>
                    <th className="p-4">Stock Level</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                          <div>
                            <div className="font-bold text-slate-900 text-xs">{p.name}</div>
                            <div className="text-[10px] text-slate-400 line-clamp-1">{p.ingredients}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 uppercase font-bold text-[10px] text-emerald-800">
                        {p.category_id}
                      </td>
                      <td className="p-4">
                        <div className="font-mono text-slate-600 text-[11px]">{p.sku}</div>
                        <div className="text-[10px] text-slate-400">{p.unit}</div>
                      </td>
                      <td className="p-4">
                        {p.discount_price ? (
                          <div>
                            <span className="font-extrabold text-emerald-950">Rs. {p.discount_price.toLocaleString('en-LK')}</span>
                            <span className="text-[10px] text-slate-400 line-through block">Rs. {p.price.toLocaleString('en-LK')}</span>
                          </div>
                        ) : (
                          <span className="font-extrabold text-slate-900">Rs. {p.price.toLocaleString('en-LK')}</span>
                        )}
                      </td>
                      <td className="p-4">
                        {p.stock_qty <= 5 ? (
                          <span className="bg-amber-100 text-amber-900 font-bold px-2.5 py-1 rounded-full text-[10px] inline-flex items-center gap-1">
                            <AlertTriangle size={12} /> {p.stock_qty} units (Low)
                          </span>
                        ) : (
                          <span className="bg-emerald-100 text-emerald-900 font-bold px-2.5 py-1 rounded-full text-[10px]">
                            {p.stock_qty} in stock
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditProduct(p)}
                            className="p-1.5 bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-900 rounded-lg transition-colors"
                            title="Edit product"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="p-1.5 bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-700 rounded-lg transition-colors"
                            title="Deactivate product"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* SECTION 3: Discount & Promotion Management Engine (PRD 4.1.3) */}
      {adminTab === 'discounts' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <h2 className="font-heading font-bold text-lg text-slate-900">Discount Engine & Promotions</h2>
              <p className="text-xs text-slate-500">
                Create product or category percentage/fixed discounts, coupon codes, and set date ranges.
              </p>
            </div>
            <button
              onClick={() => setIsAddDiscountOpen(true)}
              className="btn-accent text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-md"
            >
              <Plus size={16} /> Create New Discount Campaign
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {discounts.map((d) => (
              <div
                key={d.id}
                className={`bg-white rounded-2xl p-6 border-2 transition-all shadow-sm flex flex-col justify-between ${
                  d.status === 'active' ? 'border-emerald-200' : 'border-slate-200 opacity-60'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-emerald-900 text-amber-300 font-mono font-extrabold text-xs px-2.5 py-1 rounded-lg">
                      {d.coupon_code}
                    </span>
                    <button
                      onClick={() => toggleDiscountStatus(d.id)}
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        d.status === 'active'
                          ? 'bg-emerald-100 text-emerald-900'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {d.status === 'active' ? 'Active' : 'Disabled'}
                    </button>
                  </div>

                  <h3 className="font-heading font-bold text-slate-900 text-base mb-1">{d.name}</h3>
                  <p className="text-xs text-slate-500 mb-4">{d.description}</p>

                  <div className="bg-slate-50 p-3 rounded-xl space-y-1 text-xs text-slate-600 font-semibold mb-4">
                    <div>Type: <span className="text-slate-900 uppercase">{d.type}</span></div>
                    <div>Value: <span className="text-emerald-900 font-bold">{d.type === 'percentage' ? `${d.value}% OFF` : `Rs. ${d.value} OFF`}</span></div>
                    <div>Valid: <span className="text-slate-900">{d.start_date} to {d.end_date}</span></div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                  <button
                    onClick={() => toggleDiscountStatus(d.id)}
                    className="text-xs font-bold text-emerald-900 hover:underline"
                  >
                    {d.status === 'active' ? 'Disable Campaign' : 'Enable Campaign'}
                  </button>
                  <button
                    onClick={() => deleteDiscount(d.id)}
                    className="text-red-500 hover:text-red-700 text-xs p-1"
                    title="Delete discount"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* SECTION 4: Order & Customer Management (PRD 4.1.4) */}
      {adminTab === 'orders' && (
        <div className="space-y-6 animate-fade-in">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="font-heading font-bold text-lg text-slate-900">Order Status Control & Fulfillment</h2>
            <p className="text-xs text-slate-500">Track incoming customer orders and update shipping stages.</p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Order ID & Date</th>
                    <th className="p-4">Customer Info</th>
                    <th className="p-4">Items Summary</th>
                    <th className="p-4">Total Amount</th>
                    <th className="p-4">Payment Method</th>
                    <th className="p-4">Fulfillment Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <div className="font-extrabold text-emerald-950">{o.id}</div>
                        <div className="text-[10px] text-slate-400">{o.date}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{o.customer.name}</div>
                        <div className="text-[10px] text-slate-500">{o.customer.phone}</div>
                        <div className="text-[10px] text-slate-400 line-clamp-1">{o.customer.address}</div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-0.5">
                          {o.items.map((it, idx) => (
                            <div key={idx} className="text-[11px] font-semibold text-slate-800">
                              {it.name} <span className="text-slate-400">×{it.qty}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 font-black text-emerald-950">
                        Rs. {o.total_amount.toLocaleString('en-LK', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="p-4 font-bold text-slate-700">{o.payment_method}</td>
                      <td className="p-4">
                        <select
                          value={o.status}
                          onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                          className="bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold rounded-lg p-2 focus:ring-2 focus:ring-emerald-700"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* Modal 1: Add/Edit Product Modal */}
      {isAddProductOpen && (
        <div className="modal-overlay animate-fade-in" onClick={() => setIsAddProductOpen(false)}>
          <div className="modal-content max-w-xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-heading font-bold text-lg text-emerald-950">
                {editingProduct ? 'Edit Herbal Product' : 'Add New Herbal Product'}
              </h3>
              <button onClick={() => setIsAddProductOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProductForm} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={productForm.category_id}
                    onChange={(e) => setProductForm({ ...productForm, category_id: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                  >
                    {categories.filter(c => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">SKU</label>
                  <input
                    type="text"
                    required
                    value={productForm.sku}
                    onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price (Rs.)</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Discount Price (Rs.)</label>
                  <input
                    type="number"
                    value={productForm.discount_price}
                    onChange={(e) => setProductForm({ ...productForm, discount_price: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={productForm.stock_qty}
                    onChange={(e) => setProductForm({ ...productForm, stock_qty: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  value={productForm.image}
                  onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ingredients</label>
                <textarea
                  rows={2}
                  value={productForm.ingredients}
                  onChange={(e) => setProductForm({ ...productForm, ingredients: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Usage Instructions</label>
                <textarea
                  rows={2}
                  value={productForm.usage_info}
                  onChange={(e) => setProductForm({ ...productForm, usage_info: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary px-5 py-2 rounded-lg font-bold">
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Create Discount Campaign Modal */}
      {isAddDiscountOpen && (
        <div className="modal-overlay animate-fade-in" onClick={() => setIsAddDiscountOpen(false)}>
          <div className="modal-content max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-heading font-bold text-lg text-emerald-950">Create New Discount Campaign</h3>
              <button onClick={() => setIsAddDiscountOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveDiscountForm} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Campaign Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Summer Wellness Sale"
                  value={discountForm.name}
                  onChange={(e) => setDiscountForm({ ...discountForm, name: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Discount Type</label>
                  <select
                    value={discountForm.type}
                    onChange={(e) => setDiscountForm({ ...discountForm, type: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (Rs.)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Value</label>
                  <input
                    type="number"
                    required
                    value={discountForm.value}
                    onChange={(e) => setDiscountForm({ ...discountForm, value: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. HERBAL25"
                  value={discountForm.coupon_code}
                  onChange={(e) => setDiscountForm({ ...discountForm, coupon_code: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono font-bold text-emerald-900 uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={discountForm.start_date}
                    onChange={(e) => setDiscountForm({ ...discountForm, start_date: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={discountForm.end_date}
                    onChange={(e) => setDiscountForm({ ...discountForm, end_date: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={discountForm.description}
                  onChange={(e) => setDiscountForm({ ...discountForm, description: e.target.value })}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-medium"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddDiscountOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-accent px-5 py-2 rounded-lg font-bold">
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
