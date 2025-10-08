import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { 
  Calendar, 
  CheckSquare, 
  Users, 
  PlayCircle, 
  Calculator, 
  FileText, 
  Heart, 
  Gift, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Calendar, path: '/dashboard' },
  { id: 'checklist', label: 'Checklist', icon: CheckSquare, path: '/dashboard?tab=checklist' },
  { id: 'guests', label: 'Guests', icon: Users, path: '/dashboard?tab=guests' },
  { id: 'videos', label: 'Videos & Guides', icon: PlayCircle, path: '/dashboard?tab=videos' },
  { id: 'budget', label: 'Budget', icon: Calculator, path: '/dashboard?tab=budget' },
  { id: 'submissions', label: 'My Submissions', icon: FileText, path: '/dashboard?tab=submissions' },
  { id: 'boards', label: 'Boards', icon: Heart, path: '/dashboard?tab=boards' },
  { id: 'registry', label: 'Registry', icon: Gift, path: '/dashboard?tab=registry' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/dashboard?tab=settings' },
];

interface UserSidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function UserSidebar({ activeTab = 'dashboard', onTabChange, collapsed = false, onToggleCollapse }: UserSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

  const handleItemClick = (item: typeof sidebarItems[0]) => {
    if (item.id === 'dashboard') {
      navigate('/dashboard');
      onTabChange?.('home');
    } else {
      onTabChange?.(item.id);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getActiveItem = () => {
    if (location.pathname === '/dashboard' && !location.search) {
      return 'dashboard';
    }
    return activeTab;
  };

  return (
    <div className={`${collapsed ? 'w-16' : 'w-64'} bg-card border-r border-border h-screen flex flex-col transition-all duration-300`}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!collapsed && <h2 className="font-semibold text-foreground">Dashboard</h2>}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="h-8 w-8 p-0"
        >
          {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = getActiveItem() === item.id;
          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className={`w-full ${collapsed ? 'justify-center p-2' : 'justify-start gap-3'} h-10 text-left`}
              onClick={() => handleItemClick(item)}
              title={collapsed ? item.label : ''}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Button>
          );
        })}
      </div>
      
      <Separator />
      
      {/* <div className="p-4">
        <Button
          variant="ghost"
          className={`w-full ${collapsed ? 'justify-center p-2' : 'justify-start gap-3'} h-10 text-left text-muted-foreground hover:text-destructive`}
          onClick={handleSignOut}
          title={collapsed ? 'Sign Out' : ''}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </Button>
      </div> */}
    </div>
  );
}