export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome to your dashboard
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Total Products</h3>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
          
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Total Reviews</h3>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
          
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold">Active Users</h3>
            <p className="text-3xl font-bold mt-2">1</p>
          </div>
        </div>
      </div>
    </div>
  )
}

