import React from 'react';
import { Menu, Search, Bell, User } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="bg-white shadow relative z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center min-w-0 flex-1">
          <button className="text-gray-500 hover:text-gray-700 md:hidden mr-4">
            <Menu className="w-6 h-6" />
          </button>
          <div className="relative w-full max-w-md hidden sm:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
              placeholder="Buscar..."
            />
          </div>
        </div>
        <div className="ml-4 flex items-center shrink-0">
          <button className="p-2 text-gray-400 hover:text-gray-500 relative">
            <span className="absolute top-1.5 right-1.5 block w-2 h-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            <Bell className="w-6 h-6" />
          </button>
          <div className="ml-3 relative">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 border border-blue-200">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
