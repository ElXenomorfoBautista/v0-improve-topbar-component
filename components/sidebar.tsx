"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  BarChart3,
  Package,
  ShoppingCart,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface MenuItem {
  id: string
  label: string
  icon: React.ReactNode
  href?: string
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    id: "home",
    label: "Inicio",
    icon: <Home className="h-5 w-5" />,
    href: "/",
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    href: "/dashboard",
  },
  {
    id: "analytics",
    label: "Analíticas",
    icon: <BarChart3 className="h-5 w-5" />,
    children: [
      { id: "reports", label: "Reportes", icon: null, href: "/analytics/reports" },
      { id: "metrics", label: "Métricas", icon: null, href: "/analytics/metrics" },
    ],
  },
  {
    id: "products",
    label: "Productos",
    icon: <Package className="h-5 w-5" />,
    children: [
      { id: "inventory", label: "Inventario", icon: null, href: "/products/inventory" },
      { id: "catalog", label: "Catálogo", icon: null, href: "/products/catalog" },
    ],
  },
  {
    id: "orders",
    label: "Pedidos",
    icon: <ShoppingCart className="h-5 w-5" />,
    href: "/orders",
  },
  {
    id: "users",
    label: "Usuarios",
    icon: <Users className="h-5 w-5" />,
    href: "/users",
  },
  {
    id: "documents",
    label: "Documentos",
    icon: <FileText className="h-5 w-5" />,
    href: "/documents",
  },
  {
    id: "settings",
    label: "Configuración",
    icon: <Settings className="h-5 w-5" />,
    href: "/settings",
  },
]

interface SidebarProps {
  open?: boolean
  onClose?: () => void
}

export function Sidebar({ open = true, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(["analytics"])

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const isActive = (href?: string) => {
    if (!href) return false
    return pathname === href || pathname.startsWith(href + "/")
  }

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.id)
    const active = isActive(item.href)

    if (hasChildren) {
      return (
        <div key={item.id}>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 px-3 py-2 h-auto font-normal",
              level > 0 && "pl-11",
              active && "bg-accent text-accent-foreground",
            )}
            onClick={() => toggleExpanded(item.id)}
          >
            {item.icon}
            <span className="flex-1 text-left">{item.label}</span>
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
          {isExpanded && (
            <div className="mt-1 space-y-1 animate-in slide-in-from-top-2">
              {item.children?.map((child) => renderMenuItem(child, level + 1))}
            </div>
          )}
        </div>
      )
    }

    return (
      <Link key={item.id} href={item.href || "#"}>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 px-3 py-2 h-auto font-normal transition-colors",
            level > 0 && "pl-11",
            active
              ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
              : "hover:bg-accent hover:text-accent-foreground",
          )}
        >
          {item.icon}
          <span className="flex-1 text-left">{item.label}</span>
        </Button>
      </Link>
    )
  }

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden animate-in fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-border bg-background transition-transform duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <ScrollArea className="h-full py-4">
          <nav className="space-y-1 px-3">{menuItems.map((item) => renderMenuItem(item))}</nav>
        </ScrollArea>
      </aside>
    </>
  )
}
