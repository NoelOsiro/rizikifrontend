
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
import DashBoardCard from "./DashboardCard";
import RecentSipmentsTable from "./RecentSipmentsTable";
import { BarGraph } from "./bar-graph";
import { AreaGraph } from "./area-graph";
import { PieGraph } from "./pie-graph";

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
  const formatPercentage = (value: number) => {
    const isPositive = value > 0;
    return (
      <p
        className={`text-xs ${isPositive ? "text-green-500" : "text-red-500"
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
          <DashBoardCard key={index} formatPercentage={formatPercentage} card={card} />
        ))}
      </div>

      <RecentSipmentsTable shipments={shipments}/>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-4">
                <BarGraph />
              </div>
              <div className="col-span-4 md:col-span-3">
                <PieGraph />
              </div>
              <div className="col-span-4">
                <AreaGraph />
              </div>
              
            </div>
    </main>
  );
}
