"use client"

import { useState } from "react"
import { X, Check, Clock, AlertCircle, Info, CheckCircle, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "info" | "success" | "warning" | "error"
  title: string
  message: string
  timestamp: Date
  read: boolean
}

interface NotificationPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onMarkAllRead: () => void
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    title: "Tarea completada",
    message: "El reporte mensual ha sido generado exitosamente",
    timestamp: new Date(Date.now() - 5 * 60000),
    read: false,
  },
  {
    id: "2",
    type: "warning",
    title: "Acción requerida",
    message: "Tienes 3 documentos pendientes de aprobación",
    timestamp: new Date(Date.now() - 30 * 60000),
    read: false,
  },
  {
    id: "3",
    type: "info",
    title: "Actualización del sistema",
    message: "Nueva versión disponible. Actualiza para obtener las últimas mejoras",
    timestamp: new Date(Date.now() - 2 * 60 * 60000),
    read: false,
  },
]

export function NotificationPanel({ open, onOpenChange, onMarkAllRead }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState(mockNotifications)

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-destructive" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    if (seconds < 60) return "Ahora"
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `Hace ${minutes}m`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `Hace ${hours}h`
    const days = Math.floor(hours / 24)
    return `Hace ${days}d`
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    onMarkAllRead()
  }

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm animate-in fade-in"
        onClick={() => onOpenChange(false)}
      />

      {/* Panel */}
      <div className="fixed right-0 top-16 z-50 h-[calc(100vh-4rem)] w-full sm:w-96 border-l border-border bg-background shadow-lg animate-in slide-in-from-right">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <h2 className="text-lg font-semibold">Notificaciones</h2>
              <p className="text-xs text-muted-foreground">{notifications.filter((n) => !n.read).length} sin leer</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} aria-label="Close notifications">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Actions */}
          {notifications.some((n) => !n.read) && (
            <div className="border-b border-border px-4 py-2">
              <Button variant="ghost" size="sm" onClick={handleMarkAllRead} className="h-8 text-xs">
                <Check className="mr-2 h-3 w-3" />
                Marcar todas como leídas
              </Button>
            </div>
          )}

          {/* Notifications list */}
          <ScrollArea className="flex-1">
            <div className="divide-y divide-border">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Bell className="h-12 w-12 text-muted-foreground/50 mb-3" />
                  <p className="text-sm text-muted-foreground">No tienes notificaciones</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "group relative px-4 py-3 transition-colors hover:bg-accent cursor-pointer",
                      !notification.read && "bg-accent/50",
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex gap-3">
                      <div className="mt-0.5">{getIcon(notification.type)}</div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium leading-none">{notification.title}</p>
                          {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground leading-snug">{notification.message}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {getTimeAgo(notification.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </>
  )
}
