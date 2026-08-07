import React, { useState } from 'react';
import { useStore } from '../data/store';
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3, Package, Tag, ShoppingBag, Plus, Edit, Trash2, ShieldAlert, TrendingUp, DollarSign, AlertTriangle, Upload, Link as LinkIcon, Image as ImageIcon, Check } from 'lucide-react';

export const AdminDashboard = () => {
  const { products, salesAnalytics, orders, activeDiscounts, adminTab, setAdminTab, addProduct, updateProduct, deleteProduct, updateOrderStatus, addDiscount, toggleDiscountStatus } = useStore();

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [imageInputMode, setImageInputMode] = useState('url'); // 'url' | 'file'
  const [dragActive, setDragActive] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Herbal Oils',
    price: '',
    discountPrice: '',
    stock: '',
    shortDescription: '',
    ingredients: '',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80'
  });

  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [discountForm, setDiscountForm] = useState({
    code: '',
    percentage: '',
    title: '',
    description: '',
    validTill: '2026-12-31'
  });

  // Calculate KPIs (guard against missing or differently-shaped data)
  const revenueData = salesAnalytics?.revenueData || [];
  const categoryBreakdown = salesAnalytics?.categoryBreakdown || [];
  const totalRevenue = salesAnalytics?.total_revenue || revenueData.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrdersCount = salesAnalytics?.total_orders || orders.length;
  const lowStockCount = salesAnalytics?.low_stock_count || products.filter((p) => p.stock <= 5).length;
  const activeCampaignsCount = salesAnalytics?.active_discounts || activeDiscounts.filter((d) => d.active).length;

  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      category: 'Herbal Oils',
      price: '',
      discountPrice: '',
      stock: '10',
      shortDescription: '',
      ingredients: '',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80'
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      discountPrice: prod.discountPrice || prod.discount_price || '',
      stock: prod.stock,
      shortDescription: prod.shortDescription || prod.short_description || '',
      ingredients: Array.isArray(prod.ingredients) ? prod.ingredients.join(', ') : prod.ingredients || '',
      image: prod.image || ''
    });
    setIsProductModalOpen(true);
  };

  // Handle File Upload (Drag & Drop or File Select)
  const handleFileUpload = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setProductForm((prev) => ({ ...prev, image: e.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const payload = {
      ...productForm,
      price: parseFloat(productForm.price),
      discountPrice: productForm.discountPrice ? parseFloat(productForm.discountPrice) : null,
      stock: parseInt(productForm.stock, 10),
      ingredients: productForm.ingredients ? productForm.ingredients.split(',').map((i) => i.trim()) : [],
      rating: editingProduct ? editingProduct.rating : 4.8,
      reviewsCount: editingProduct ? editingProduct.reviewsCount : 12,
      status: 'active'
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
    } else {
      addProduct(payload);
    }

    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleSaveDiscount = (e) => {
    e.preventDefault();
    addDiscount({
      ...discountForm,
      percentage: parseInt(discountForm.percentage, 10),
      active: true
    });
    setIsDiscountModalOpen(false);
    setDiscountForm({ code: '', percentage: '', title: '', description: '', validTill: '2026-12-31' });
  };

  const COLORS = ['#84cc16', '#95d3ba', '#365314', '#e9c46a', '#e76f51'];

  return (
    <div className="space-y-10 pb-16">
      
      {/* Admin Header & Navigation Tabs */}
      <div className="glass-card p-6 rounded-3xl border border-white/15 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-lime-400 bg-lime-500/10 px-3 py-1 rounded-full border border-lime-500/20">
            <ShieldAlert size={14} /> HERBALMART ADMIN CONTROL PORTAL
          </div>
          <h1 className="text-2xl font-bold text-white">Operations & Storefront Management</h1>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-[#101415] p-1.5 rounded-2xl border border-white/10 overflow-x-auto w-full md:w-auto">
          <button
            onClick={() => setAdminTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              adminTab === 'analytics' ? 'bg-lime-500 text-emerald-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 size={15} /> Analytics
          </button>
          <button
            onClick={() => setAdminTab('products')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              adminTab === 'products' ? 'bg-lime-500 text-emerald-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Package size={15} /> Products ({products.length})
          </button>
          <button
            onClick={() => setAdminTab('discounts')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              adminTab === 'discounts' ? 'bg-lime-500 text-emerald-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tag size={15} /> Discounts Engine
          </button>
          <button
            onClick={() => setAdminTab('orders')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              adminTab === 'orders' ? 'bg-lime-500 text-emerald-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag size={15} /> Orders ({orders.length})
          </button>
        </div>
      </div>

      {/* TAB 1: ANALYTICS */}
      {adminTab === 'analytics' && (
        <div className="space-y-8">
          {/* KPI Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-2xl border border-lime-500/30 space-y-2">
              <div className="flex justify-between items-center text-slate-400 text-xs">
                <span>Total Store Revenue</span>
                <DollarSign size={18} className="text-lime-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-white">Rs. {totalRevenue.toLocaleString()}</div>
              <div className="text-[11px] text-lime-400 font-semibold flex items-center gap-1">
                <TrendingUp size={12} /> +18.4% growth this month
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-slate-400 text-xs">
                <span>Total Orders Placed</span>
                <ShoppingBag size={18} className="text-lime-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-white">{totalOrdersCount}</div>
              <div className="text-[11px] text-slate-400">Avg. Rs. 4,200 per order</div>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-slate-400 text-xs">
                <span>Low Stock Warning</span>
                <AlertTriangle size={18} className="text-amber-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-amber-400">{lowStockCount} Products</div>
              <div className="text-[11px] text-slate-400">Stock ≤ 5 units left</div>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-slate-400 text-xs">
                <span>Active Discount Campaigns</span>
                <Tag size={18} className="text-lime-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-white">{activeCampaignsCount} Active</div>
              <div className="text-[11px] text-lime-400">Promotional coupons live</div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 glass-card p-6 rounded-2xl space-y-4">
              <h3 className="font-bold text-white text-base">Monthly Sales Revenue Trend</h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#84cc16" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#84cc16" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#101415', borderColor: '#84cc16', color: '#fff' }} />
                    <Area type="monotone" dataKey="revenue" stroke="#84cc16" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="lg:col-span-4 glass-card p-6 rounded-2xl space-y-4">
              <h3 className="font-bold text-white text-base">Category Sales Breakdown</h3>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70}>
                      {categoryBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#101415', borderColor: '#84cc16', color: '#fff' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-1.5 text-xs">
                {categoryBreakdown.map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                      {cat.name}
                    </span>
                    <span className="font-mono font-bold text-white">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCT MANAGEMENT */}
      {adminTab === 'products' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Herbal Product Inventory & Catalog</h2>
            <button
              onClick={handleOpenAddProduct}
              className="btn-primary text-xs"
            >
              <Plus size={16} /> Add New Herbal Product
            </button>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#101415] text-slate-400 uppercase font-mono border-b border-white/10">
                  <tr>
                    <th className="p-4">Product Info</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Regular Price</th>
                    <th className="p-4">Discount Price</th>
                    <th className="p-4">Stock Level</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-emerald-950" />
                        <div>
                          <div className="font-bold text-white">{p.name}</div>
                          <div className="text-[11px] text-slate-400 line-clamp-1">{p.shortDescription || p.short_description}</div>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-lime-400">{p.category}</td>
                      <td className="p-4 font-mono text-slate-300">Rs. {Number(p.price).toLocaleString()}</td>
                      <td className="p-4 font-mono text-lime-400 font-bold">
                        {(p.discountPrice || p.discount_price) ? `Rs. ${Number(p.discountPrice || p.discount_price).toLocaleString()}` : '-'}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
                          p.stock <= 5 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-lime-500/20 text-lime-400 border border-lime-500/30'
                        }`}>
                          {p.stock} in stock
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button onClick={() => handleOpenEditProduct(p)} className="p-1.5 bg-white/10 hover:bg-lime-500 hover:text-emerald-950 text-slate-300 rounded-lg transition-colors">
                          <Edit size={14} />
                        </button>
                        <button onClick={() => deleteProduct(p.id)} className="p-1.5 bg-rose-500/20 hover:bg-rose-500 text-rose-400 hover:text-white rounded-lg transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DISCOUNT ENGINE */}
      {adminTab === 'discounts' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Promotional Discount Engine</h2>
            <button onClick={() => setIsDiscountModalOpen(true)} className="btn-primary text-xs">
              <Plus size={16} /> Create New Discount Campaign
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeDiscounts.map((discount) => (
              <div key={discount.id} className="glass-card p-6 rounded-2xl border border-lime-500/30 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-mono text-xs text-lime-400 font-bold uppercase">{discount.code}</span>
                    <h3 className="font-bold text-white text-lg">{discount.title}</h3>
                  </div>
                  <button
                    onClick={() => toggleDiscountStatus(discount.id)}
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      discount.active ? 'bg-lime-500 text-emerald-950' : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {discount.active ? 'Active' : 'Disabled'}
                  </button>
                </div>
                <p className="text-xs text-slate-300">{discount.description}</p>
                <div className="flex justify-between text-xs text-slate-400 pt-2 border-t border-white/10 font-mono">
                  <span>Discount: {discount.percentage}% OFF</span>
                  <span>Valid till: {discount.validTill || discount.valid_till}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ORDERS */}
      {adminTab === 'orders' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Live Customer Orders & Status Fulfillment</h2>
          
          <div className="glass-card rounded-2xl overflow-hidden border border-white/10">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#101415] text-slate-400 uppercase font-mono border-b border-white/10">
                <tr>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer Name</th>
                  <th className="p-4">Items Count</th>
                  <th className="p-4">Total Amount</th>
                  <th className="p-4">Order Status</th>
                  <th className="p-4 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono font-bold text-white">{o.id}</td>
                    <td className="p-4 text-slate-200">{o.customerName || o.customer_name}</td>
                    <td className="p-4">{(o.items || []).length} items</td>
                    <td className="p-4 font-mono text-lime-400 font-bold">Rs. {Number(o.total || o.total_amount || 0).toLocaleString()}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-lime-500/20 text-lime-400 border border-lime-500/30">
                        {o.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <select
                        value={o.status}
                        onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                        className="bg-[#101415] text-white border border-white/20 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-lime-500 cursor-pointer"
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
      )}

      {/* Product Add/Edit Modal */}
      {isProductModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content p-6 space-y-6 max-w-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold text-white">
                {editingProduct ? 'Edit Herbal Product' : 'Add New Herbal Product'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              
              {/* Product Photo Upload Section (URL link vs Drag & Drop File) */}
              <div className="space-y-2 bg-[#101415] p-4 rounded-2xl border border-white/10">
                <div className="flex justify-between items-center">
                  <label className="text-slate-200 font-bold flex items-center gap-1.5 text-xs">
                    <ImageIcon size={16} className="text-lime-400" /> Product Image / Photo
                  </label>
                  <div className="flex items-center gap-1 bg-[#1d2022] p-1 rounded-xl border border-white/10">
                    <button
                      type="button"
                      onClick={() => setImageInputMode('url')}
                      className={`px-3 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-all ${
                        imageInputMode === 'url' ? 'bg-lime-500 text-emerald-950 font-bold' : 'text-slate-400'
                      }`}
                    >
                      <LinkIcon size={12} /> Image URL Link
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageInputMode('file')}
                      className={`px-3 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 transition-all ${
                        imageInputMode === 'file' ? 'bg-lime-500 text-emerald-950 font-bold' : 'text-slate-400'
                      }`}
                    >
                      <Upload size={12} /> Upload Photo File
                    </button>
                  </div>
                </div>

                {imageInputMode === 'url' ? (
                  <div className="space-y-2">
                    <input
                      type="url"
                      placeholder="Paste image URL (e.g. https://images.unsplash.com/...)"
                      value={productForm.image}
                      onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                      className="w-full bg-[#1d2022] text-white p-3 rounded-xl border border-white/15 focus:outline-none focus:border-lime-500 font-mono"
                    />
                  </div>
                ) : (
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer ${
                      dragActive ? 'border-lime-500 bg-lime-500/10' : 'border-white/20 bg-[#1d2022] hover:border-lime-500/50'
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload size={28} className="mx-auto text-lime-400 mb-2" />
                    <p className="font-bold text-white">Drag & drop your photo file here</p>
                    <p className="text-[11px] text-slate-400 mt-1">or click to browse local image (PNG, JPG, WEBP)</p>
                  </div>
                )}

                {/* Live Image Preview */}
                {productForm.image && (
                  <div className="flex items-center gap-4 pt-2 border-t border-white/10">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-emerald-950 shrink-0 border border-lime-500/40">
                      <img src={productForm.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-[11px] text-slate-300 space-y-0.5">
                      <p className="font-semibold text-lime-400 flex items-center gap-1">
                        <Check size={12} /> Image Preview Loaded
                      </p>
                      <p className="text-slate-500 line-clamp-1 font-mono">{productForm.image.substring(0, 60)}...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Name & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Product Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Organic Gotukola Extract"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full bg-[#101415] text-white p-3 rounded-xl border border-white/15 focus:outline-none focus:border-lime-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-[#101415] text-white p-3 rounded-xl border border-white/15 focus:outline-none focus:border-lime-500 cursor-pointer"
                  >
                    <option value="Herbal Oils">Herbal Oils</option>
                    <option value="Ayurvedic Teas">Ayurvedic Teas</option>
                    <option value="Organic Powders">Organic Powders</option>
                    <option value="Wellness Capsules">Wellness Capsules</option>
                    <option value="Skincare">Skincare</option>
                  </select>
                </div>
              </div>

              {/* Price, Discount Price, Stock */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Regular Price (Rs.)</label>
                  <input
                    type="number"
                    required
                    placeholder="2500"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="w-full bg-[#101415] text-white p-3 rounded-xl border border-white/15 focus:outline-none focus:border-lime-500 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Discount Price (Rs.)</label>
                  <input
                    type="number"
                    placeholder="1950 (Optional)"
                    value={productForm.discountPrice}
                    onChange={(e) => setProductForm({ ...productForm, discountPrice: e.target.value })}
                    className="w-full bg-[#101415] text-white p-3 rounded-xl border border-white/15 focus:outline-none focus:border-lime-500 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300 font-medium">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    placeholder="15"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                    className="w-full bg-[#101415] text-white p-3 rounded-xl border border-white/15 focus:outline-none focus:border-lime-500 font-mono"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Short Description</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Pure organic botanical formula..."
                  value={productForm.shortDescription}
                  onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                  className="w-full bg-[#101415] text-white p-3 rounded-xl border border-white/15 focus:outline-none focus:border-lime-500"
                />
              </div>

              {/* Ingredients */}
              <div className="space-y-1">
                <label className="text-slate-300 font-medium">Ingredients (comma separated)</label>
                <input
                  type="text"
                  required
                  placeholder="Gotukola, Sesame Oil, Vetiver"
                  value={productForm.ingredients}
                  onChange={(e) => setProductForm({ ...productForm, ingredients: e.target.value })}
                  className="w-full bg-[#101415] text-white p-3 rounded-xl border border-white/15 focus:outline-none focus:border-lime-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsProductModalOpen(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary font-bold">
                  {editingProduct ? 'Update Product' : 'Add Product to Store'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Discount Campaign Modal */}
      {isDiscountModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content p-6 space-y-6">
            <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4">
              Create Promotional Discount Campaign
            </h3>

            <form onSubmit={handleSaveDiscount} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300">Coupon Code (e.g. HERBAL30)</label>
                  <input
                    type="text"
                    required
                    value={discountForm.code}
                    onChange={(e) => setDiscountForm({ ...discountForm, code: e.target.value.toUpperCase() })}
                    className="w-full bg-[#101415] text-white p-3 rounded-xl border border-white/15 uppercase font-mono font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-300">Discount Percentage (%)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="100"
                    value={discountForm.percentage}
                    onChange={(e) => setDiscountForm({ ...discountForm, percentage: e.target.value })}
                    className="w-full bg-[#101415] text-white p-3 rounded-xl border border-white/15 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300">Campaign Title</label>
                <input
                  type="text"
                  required
                  value={discountForm.title}
                  onChange={(e) => setDiscountForm({ ...discountForm, title: e.target.value })}
                  className="w-full bg-[#101415] text-white p-3 rounded-xl border border-white/15"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300">Description</label>
                <textarea
                  required
                  rows={2}
                  value={discountForm.description}
                  onChange={(e) => setDiscountForm({ ...discountForm, description: e.target.value })}
                  className="w-full bg-[#101415] text-white p-3 rounded-xl border border-white/15"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsDiscountModalOpen(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
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
