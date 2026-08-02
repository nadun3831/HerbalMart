import React, { useState } from 'react';
import { StoreProvider, useStore } from './data/store';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomerStorefront } from './views/CustomerStorefront';
import { CustomerDashboard } from './views/CustomerDashboard';
import { AdminDashboard } from './views/AdminDashboard';
import { LoginPage } from './views/LoginPage';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Toast } from './components/Toast';

const MainContent = () => {
  const { role, customerTab, isLoggedIn } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Show Login Page if not authenticated
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-transparent text-[#e0e3e5]">
        <LoginPage />
        <Toast />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-transparent text-[#e0e3e5] selection:bg-lime-500 selection:text-black">
      <div>
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          {role === 'customer' ? (
            customerTab === 'store' ? (
              <CustomerStorefront searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            ) : (
              <CustomerDashboard />
            )
          ) : (
            <AdminDashboard />
          )}
        </main>
      </div>

      <Footer />

      {/* Global Modals & Notifications */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
