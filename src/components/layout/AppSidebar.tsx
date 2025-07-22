import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  User,
  Upload,
  DollarSign,
  MessageCircle,
  TrendingUp,
  Settings,
  Crown,
  Users,
  Link,
  Heart,
  Calendar,
  BarChart3,
  Shield,
  Star,
  Zap
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const creatorNavItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Profile', url: '/profile', icon: User },
  { title: 'Content', url: '/content', icon: Upload },
  { title: 'Earnings', url: '/earnings', icon: DollarSign },
  { title: 'Messages', url: '/messages', icon: MessageCircle },
  { title: 'Analytics', url: '/analytics', icon: TrendingUp },
  { title: 'Subscribers', url: '/subscribers', icon: Users },
  { title: 'Link Tracking', url: '/links', icon: Link },
];

const fanNavItems = [
  { title: 'Feed', url: '/feed', icon: Home },
  { title: 'Discover', url: '/discover', icon: Star },
  { title: 'Following', url: '/following', icon: Heart },
  { title: 'Messages', url: '/messages', icon: MessageCircle },
  { title: 'Subscriptions', url: '/subscriptions', icon: Crown },
  { title: 'Calendar', url: '/calendar', icon: Calendar },
];

const adminNavItems = [
  { title: 'Admin Panel', url: '/admin', icon: Shield },
  { title: 'Platform Stats', url: '/admin/stats', icon: BarChart3 },
  { title: 'User Management', url: '/admin/users', icon: Users },
  { title: 'Content Moderation', url: '/admin/moderation', icon: Zap },
];

export function AppSidebar() {
  const { user } = useAuth();
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'bg-sidebar-accent text-sidebar-primary font-medium' : 'hover:bg-sidebar-accent/50';

  // Mock user role - in production this would come from your user profile
  const userRole = 'creator' as 'creator' | 'fan' | 'admin';

  const getNavigationItems = () => {
    switch (userRole) {
      case 'admin':
        return [...creatorNavItems, ...adminNavItems];
      case 'creator':
        return creatorNavItems;
      case 'fan':
        return fanNavItems;
      default:
        return fanNavItems;
    }
  };

  return (
    <Sidebar className={state === 'collapsed' ? 'w-16' : 'w-64'} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          {state !== 'collapsed' && (
            <>
              <div className="text-gradient text-2xl font-bold">Cabana</div>
              <div className="ml-auto">
                <Crown className="h-6 w-6 text-primary" />
              </div>
            </>
          )}
          {state === 'collapsed' && <Crown className="h-8 w-8 text-primary mx-auto" />}
        </div>
      </SidebarHeader>

      <SidebarContent className="flex flex-col h-full">
        {/* User Profile Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <div className={`flex items-center gap-3 p-3 ${state === 'collapsed' ? 'justify-center' : ''}`}>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>
                      {user?.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  {state !== 'collapsed' && (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-sidebar-foreground truncate">
                        {user?.email?.split('@')[0] || 'User'}
                      </p>
                      <p className="text-xs text-sidebar-foreground/60 capitalize">
                        {userRole}
                      </p>
                    </div>
                  )}
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Main Navigation */}
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className={state === 'collapsed' ? 'sr-only' : ''}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {getNavigationItems().map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavCls}
                      title={state === 'collapsed' ? item.title : undefined}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {state !== 'collapsed' && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/settings" 
                    className={getNavCls}
                    title={state === 'collapsed' ? 'Settings' : undefined}
                  >
                    <Settings className="h-5 w-5 flex-shrink-0" />
                    {state !== 'collapsed' && <span className="ml-3">Settings</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}