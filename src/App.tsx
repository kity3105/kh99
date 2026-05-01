import { NavLink, Outlet } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

function NavItem({ to, label, icon: Icon }: { to: string; label: string; icon?: React.ElementType }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={({ isActive }: { isActive: boolean }) =>
        `flex-1 flex flex-col items-center justify-center gap-1 py-2 text-xs transition-colors ` +
        (isActive ? 'text-fuchsia-300' : 'text-white/50 hover:text-white')
      }
    >
      {Icon && <Icon size={18} className={({ isActive }: { isActive: boolean }) => isActive ? 'animate-pulse' : ''} />}
      <span>{label}</span>
    </NavLink>
  )
}

export default function App() {
  return (
    <>
      {/* --- 1. 星空背景层 --- */}
      <div className="fixed inset-0 -z-10 bg-stars starfield bg-cover" />

      <div className="relative z-10 min-h-dvh flex flex-col">
        {/* --- 3. 主要内容区 --- */}
        <main className="flex-1 pb-28">
          <div className="section-container">
            <Outlet />
          </div>
        </main>

        {/* --- 2. 悬浮导航栏 --- */}
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full px-4 max-w-md">
          <div className="backdrop-blur-xl bg-black/40 flex rounded-2xl overflow-hidden border border-white/10 shadow-lg">
            <NavItem to="/" label="须知" />
            <NavItem to="/timeline" label="时间线" />
            <NavItem to="/materials" label="物料" />
            <NavItem to="/must-eat" label="必吃榜" />
            <NavItem to="/profiles" label="个人" />
            <NavItem to="/messages" label="留言" />
          </div>
        </nav>
      </div>
    </>
  )
}
