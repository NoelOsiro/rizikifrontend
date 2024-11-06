
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

// Define card and shipment data as arrays
const cardData = [
  {
    title: "Total Shipments",
    value: "1,234",
    percentageChange: 20.1,
  },
  {
    title: "Active Shipments",
    value: "56",
    percentageChange: 12.5,
  },
  {
    title: "On-Time Delivery Rate",
    value: "98.2%",
    percentageChange: 2.1,
  },
  {
    title: "Customer Satisfaction",
    value: "4.8/5",
    description: "Based on 1,000+ reviews",
  },
];

const shipments = [
  { id: "SH12345", status: "In Transit", destination: "Nairobi, Kenya" },
  { id: "SH12346", status: "Delivered", destination: "Mombasa, Kenya" },
  { id: "SH12347", status: "Processing", destination: "Kisumu, Kenya" },
];

export function Dashboard() {

  // Function to style percentage change based on positive/negative value
  const formatPercentage = (value:number) => {
    const isPositive = value > 0;
    return (
      <p
        className={`text-xs ${
          isPositive ? "text-green-500" : "text-red-500"
        } font-semibold`}
      >
        {isPositive ? `+${value}%` : `${value}%`} from last period
      </p>
    );
  };

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cardData.map((card, index) => (
          <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              {card.percentageChange !== undefined
                ? formatPercentage(card.percentageChange)
                : null}
              {card.description && (
                <p className="text-xs text-muted-foreground">{card.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle>Recent Shipments</CardTitle>
          <CardDescription>Overview of the latest cargo movements</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Shipment ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((shipment) => (
                <TableRow key={shipment.id}>
                  <TableCell>{shipment.id}</TableCell>
                  <TableCell>{shipment.status}</TableCell>
                  <TableCell>{shipment.destination}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                    >
                      <Link href={`/shipment/${shipment.id}`}>View Details</Link>
                      
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
