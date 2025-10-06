"use client"

import { useState } from "react"
import { Topbar } from "@/components/topbar"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, ShoppingCart, TrendingUp } from "lucide-react"

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const stats = [
    {
      title: "Ventas Totales",
      value: "$45,231",
      change: "+20.1%",
      icon: <ShoppingCart className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Usuarios Activos",
      value: "2,345",
      change: "+12.5%",
      icon: <Users className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Tasa de Conversión",
      value: "3.24%",
      change: "+4.3%",
      icon: <TrendingUp className="h-5 w-5 text-muted-foreground" />,
    },
    {
      title: "Ingresos",
      value: "$12,234",
      change: "+8.2%",
      icon: <BarChart3 className="h-5 w-5 text-muted-foreground" />,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Topbar
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        companyName="Mi Empresa"
        userName="Juan Pérez"
        userEmail="juan@empresa.com"
      />

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="lg:pl-64 pt-16">
        <div className="container mx-auto p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-2">Bienvenido de vuelta. Aquí está un resumen de tu negocio.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className="transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  {stat.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-600 font-medium">{stat.change}</span> desde el mes pasado
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Resumen</CardTitle>
                <CardDescription>Actividad reciente de tu negocio</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
                Aquí irían tus gráficos y visualizaciones
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>Últimas acciones en el sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-9 w-9 rounded-full bg-accent flex items-center justify-center">
                        <Users className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">Nuevo usuario registrado</p>
                        <p className="text-xs text-muted-foreground">
                          Hace {i} hora{i > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
