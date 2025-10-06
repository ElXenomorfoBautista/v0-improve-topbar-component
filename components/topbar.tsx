"use client"

import { useState } from "react"
import { Bell, Menu, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { NotificationPanel } from "./notification-panel"

interface TopbarProps {
  onMenuToggle?: () => void
  companyName?: string
  companyLogo?: string
  userName?: string
  userEmail?: string
  userAvatar?: string
}

export function Topbar({
  onMenuToggle,
  companyName = "Mi Empresa",
  companyLogo,
  userName = "Usuario",
  userEmail = "usuario@empresa.com",
  userAvatar,
}: TopbarProps) {
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(3)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left section: Menu toggle + Logo */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuToggle} aria-label="Toggle menu">
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-3">
            {companyLogo ? (
              <img
                src={companyLogo || "/placeholder.svg"}
                alt={companyName}
                className="h-8 w-8 rounded-md object-contain"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-semibold text-sm">
                {companyName.charAt(0)}
              </div>
            )}
            <div className="hidden sm:block">
              <h1 className="text-base font-semibold leading-none tracking-tight">{companyName}</h1>
            </div>
          </div>
        </div>

        {/* Right section: Notifications + User menu */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setNotificationOpen(!notificationOpen)}
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-semibold text-destructive-foreground animate-in fade-in zoom-in">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Button>
            <NotificationPanel
              open={notificationOpen}
              onOpenChange={setNotificationOpen}
              onMarkAllRead={() => setUnreadCount(0)}
            />
          </div>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-accent">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatar || "/placeholder.svg"} alt={userName} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:flex md:flex-col md:items-start md:text-left">
                  <span className="text-sm font-medium leading-none">{userName}</span>
                  <span className="text-xs text-muted-foreground leading-none mt-1">{userEmail}</span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem>Configuración</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">Cerrar sesión</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
