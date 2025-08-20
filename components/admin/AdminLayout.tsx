"use client";

import { useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  BookOpen,
  Music,
  MessageSquare,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Settings,
  Users,
  BarChart3,
} from "lucide-react";

interface SidebarItem {
  name: string;
  icon: any;
  href: string;
  badge?: string | number;
}

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function AdminLayout({
  children,
  title,
  description,
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const sidebarItems: SidebarItem[] = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
    },
    {
      name: "Books",
      icon: BookOpen,
      href: "/admin/books",
    },
    {
      name: "Songs",
      icon: Music,
      href: "/admin/songs",
    },
    {
      name: "Contacts",
      icon: MessageSquare,
      href: "/admin/contacts",
    },
    // {
    //   name: "Analytics",
    //   icon: BarChart3,
    //   href: "/admin/analytics",
    // },
    // {
    //   name: "Users",
    //   icon: Users,
    //   href: "/admin/users",
    // },
    // {
    //   name: "Settings",
    //   icon: Settings,
    //   href: "/admin/settings",
    // },
  ];

  const handleNavigation = (href: string): void => {
    router.push(href);
    setSidebarOpen(false); // Close mobile sidebar after navigation
  };

  const handleLogout = (): void => {
    // Add your logout logic here
    console.log("Logout clicked");
    // Example implementations:
    // localStorage.removeItem('adminToken');
    // router.push('/admin/login');
    // Or call your logout API
  };

  const isActiveRoute = (href: string): boolean => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname?.startsWith(href) || false;
  };

  return (
    <div
      className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
      suppressHydrationWarning={true}
    >
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 flex z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          ></div>
          <div
            className="relative flex-1 flex flex-col max-w-xs w-full bg-white/95 backdrop-blur-sm shadow-xl"
            suppressHydrationWarning={true}
          >
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setSidebarOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-label="Close sidebar"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <SidebarContent
              sidebarItems={sidebarItems}
              onNavigate={handleNavigation}
              onLogout={handleLogout}
              isActiveRoute={isActiveRoute}
            />
          </div>
        </div>
      )}

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64" suppressHydrationWarning={true}>
          <SidebarContent
            sidebarItems={sidebarItems}
            onNavigate={handleNavigation}
            onLogout={handleLogout}
            isActiveRoute={isActiveRoute}
          />
        </div>
      </div>

      {/* Main content */}
      <div
        className="flex-1 flex flex-col overflow-hidden"
        suppressHydrationWarning={true}
      >
        {/* Mobile header */}
        <div
          className="lg:hidden bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200"
          suppressHydrationWarning={true}
        >
          <div
            className="flex items-center justify-between px-4 py-3"
            suppressHydrationWarning={true}
          >
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 rounded-lg p-1"
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">
              {title || "Admin Panel"}
            </h1>
            <div className="w-8" suppressHydrationWarning={true}></div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto" suppressHydrationWarning={true}>
            {/* Page header (optional) */}
            {(title || description) && (
              <div className="bg-white/50 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div suppressHydrationWarning={true}>
                    {title && (
                      <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                        {title}
                      </h1>
                    )}
                    {description && (
                      <p className="mt-1 text-slate-600">{description}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Page content */}
            <div className="px-6 py-6" suppressHydrationWarning={true}>
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

interface SidebarContentProps {
  sidebarItems: SidebarItem[];
  onNavigate: (href: string) => void;
  onLogout: () => void;
  isActiveRoute: (href: string) => boolean;
}

function SidebarContent({
  sidebarItems,
  onNavigate,
  onLogout,
  isActiveRoute,
}: SidebarContentProps) {
  return (
    <div
      className="flex flex-col h-full bg-white/95 backdrop-blur-sm shadow-xl border-r border-gray-200"
      suppressHydrationWarning={true}
    >
      <div className="flex flex-col h-0 flex-1" suppressHydrationWarning={true}>
        {/* Logo/Brand */}
        <div
          className="flex items-center h-16 flex-shrink-0 px-4 bg-gradient-to-r from-blue-600 to-indigo-600"
          suppressHydrationWarning={true}
        >
          <div className="flex items-center" suppressHydrationWarning={true}>
            <div
              className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3"
              suppressHydrationWarning={true}
            >
              <LayoutDashboard className="h-5 w-5 text-blue-600" />
            </div>
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          </div>
        </div>

        {/* Navigation */}
        <div
          className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto"
          suppressHydrationWarning={true}
        >
          <nav className="mt-2 flex-1 px-2 space-y-1">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = isActiveRoute(item.href);

              return (
                <button
                  key={item.name}
                  onClick={() => onNavigate(item.href)}
                  className={`group flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md transform scale-105"
                      : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 hover:scale-102"
                  }`}
                >
                  <IconComponent
                    className={`mr-3 h-5 w-5 transition-colors ${
                      isActive
                        ? "text-white"
                        : "text-gray-500 group-hover:text-blue-600"
                    }`}
                  />
                  <span className="flex-1 text-left">{item.name}</span>

                  {/* Badge */}
                  {item.badge && (
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-red-100 text-red-600 group-hover:bg-red-200"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Active indicator */}
                  {isActive && (
                    <div
                      className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"
                      suppressHydrationWarning={true}
                    ></div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User section & Logout */}
          <div
            className="px-2 mt-4 pt-4 border-t border-gray-200 space-y-2"
            suppressHydrationWarning={true}
          >
            {/* User info (optional) */}
            <div
              className="flex items-center px-3 py-2 text-sm text-gray-600"
              suppressHydrationWarning={true}
            >
              <div
                className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mr-3"
                suppressHydrationWarning={true}
              >
                <span className="text-white font-medium text-sm">A</span>
              </div>
              <div className="flex-1" suppressHydrationWarning={true}>
                <p className="font-medium text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">admin@portfolio.com</p>
              </div>
            </div>

            {/* Logout button */}
            <button
              onClick={onLogout}
              className="group flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-700 transition-all duration-200"
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-500 group-hover:text-red-600 transition-colors" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Example usage components for different pages:

// Dashboard Page Component
export function DashboardPage() {
  return (
    <AdminLayout
      title="Dashboard"
      description="Welcome to your portfolio management system"
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        suppressHydrationWarning={true}
      >
        {/* Your dashboard content */}
        <div
          className="bg-white rounded-lg shadow p-6"
          suppressHydrationWarning={true}
        >
          <h3 className="text-lg font-semibold">Dashboard Content</h3>
          <p className="text-gray-600">Your dashboard content goes here...</p>
        </div>
      </div>
    </AdminLayout>
  );
}

// Books Page Component
export function BooksPage() {
  return (
    <AdminLayout title="Books" description="Manage your book collection">
      <div
        className="bg-white rounded-lg shadow"
        suppressHydrationWarning={true}
      >
        <div className="p-6" suppressHydrationWarning={true}>
          <h3 className="text-lg font-semibold mb-4">Books Management</h3>
          <p className="text-gray-600">Your books content goes here...</p>
        </div>
      </div>
    </AdminLayout>
  );
}

// Songs Page Component
export function SongsPage() {
  return (
    <AdminLayout title="Songs" description="Manage your music collection">
      <div
        className="bg-white rounded-lg shadow"
        suppressHydrationWarning={true}
      >
        <div className="p-6" suppressHydrationWarning={true}>
          <h3 className="text-lg font-semibold mb-4">Songs Management</h3>
          <p className="text-gray-600">Your songs content goes here...</p>
        </div>
      </div>
    </AdminLayout>
  );
}

// Messages Page Component
export function MessagesPage() {
  return (
    <AdminLayout title="Messages" description="Manage contact messages">
      <div
        className="bg-white rounded-lg shadow"
        suppressHydrationWarning={true}
      >
        <div className="p-6" suppressHydrationWarning={true}>
          <h3 className="text-lg font-semibold mb-4">Messages Management</h3>
          <p className="text-gray-600">Your messages content goes here...</p>
        </div>
      </div>
    </AdminLayout>
  );
}
