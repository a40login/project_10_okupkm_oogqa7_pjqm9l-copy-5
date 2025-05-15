import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Settings, User, Calendar, Book, Folder, LayoutDashboard, Image as ImageIcon } from 'lucide-react'; // Added ImageIcon
import { cn } from '@/lib/utils';

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href: string;
};

const SidebarItem = ({ icon, label, active, href }: SidebarItemProps) => {
  return (
    <Link 
      to={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        active 
          ? "bg-flowhero-orange text-white" 
          : "text-gray-300 hover:text-white hover:bg-flowhero-card"
      )}
    >
      <div className="w-5 h-5 shrink-0">{icon}</div>
      <span className="hidden lg:inline-block">{label}</span>
    </Link>
  );
};

export function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || (path !== "/" && location.pathname.startsWith(path));


  return (
    <div className="w-[60px] lg:w-[240px] h-screen bg-flowhero-darker flex flex-col shrink-0 border-r border-flowhero-card">
      <div className="flex items-center justify-center lg:justify-start h-16 px-3">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold text-flowhero-orange block lg:hidden">F</div>
          <div className="text-2xl font-bold text-white font-heading hidden lg:block">
            FlowHero<span className="text-flowhero-orange">.AI</span>
          </div>
        </Link>
      </div>
      
      <div className="px-2 py-2 flex-1 space-y-1">
        <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active={isActive("/")} href="/" />
        <div className="pt-4"></div>
        <div className="px-3 py-2">
          <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider hidden lg:block">Experten</h3>
        </div>
        <SidebarItem icon={<Book size={20} />} label="Strategie-Experte" active={isActive("/strategy")} href="/strategy" />
        <SidebarItem icon={<Book size={20} />} label="Storytelling-Experte" active={isActive("/storytelling")} href="/storytelling" />
        <SidebarItem icon={<Book size={20} />} label="Funnel-Architekt" active={isActive("/funnel")} href="/funnel" />
        <SidebarItem icon={<Book size={20} />} label="Copywriter" active={isActive("/copywriter")} href="/copywriter" />
        <SidebarItem icon={<Book size={20} />} label="Social-Media-Experte" active={isActive("/social")} href="/social" />
        <SidebarItem icon={<Book size={20} />} label="Marketing Experte" active={isActive("/marketing-experte")} href="/marketing-experte" />
        <SidebarItem icon={<Book size={20} />} label="Vertriebs Experte" active={isActive("/vertriebs-experte")} href="/vertriebs-experte" />
        <SidebarItem icon={<Book size={20} />} label="Produkt Experte" active={isActive("/produkt-experte")} href="/produkt-experte" />
        <SidebarItem icon={<Book size={20} />} label="Innovations Experte" active={isActive("/innovations-experte")} href="/innovations-experte" />
        <SidebarItem icon={<Book size={20} />} label="Finanz Experte" active={isActive("/finanz-experte")} href="/finanz-experte" />
        
        <div className="pt-4"></div>
        <div className="px-3 py-2">
          <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider hidden lg:block">Tools</h3>
        </div>
        <SidebarItem icon={<Calendar size={20} />} label="Kalender" active={isActive("/calendar")} href="/calendar" />
        <SidebarItem icon={<Folder size={20} />} label="Gespeicherte Inhalte" active={isActive("/saved")} href="/saved" />
        <SidebarItem icon={<ImageIcon size={20} />} label="Bild-Generator" active={isActive("/social/image-generator")} href="/social/image-generator" /> {/* New Sidebar Item */}
      </div>
      
      <div className="px-2 py-4 space-y-1">
        <SidebarItem icon={<User size={20} />} label="Mein Profil" active={isActive("/profile")} href="/profile" />
        <SidebarItem icon={<Settings size={20} />} label="Einstellungen" active={isActive("/settings")} href="/settings" />
      </div>
    </div>
  );
}
