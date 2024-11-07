
import Link from "next/link";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "../ui/table";
import { Button } from "../ui/button";

interface Shipment {
    id: string;
    status: string;
    destination: string;
    }
type Props = {
    shipments: Shipment[];
    }

export default function RecentSipmentsTable(props: Props) {
    return (<Card className="my-6 shadow-lg hover:shadow-xl transition-shadow">
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
            {props.shipments.map(shipment => <TableRow key={shipment.id}>
              <TableCell>{shipment.id}</TableCell>
              <TableCell>{shipment.status}</TableCell>
              <TableCell>{shipment.destination}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/shipment/${shipment.id}`}>View Details</Link>
  
                </Button>
              </TableCell>
            </TableRow>)}
          </TableBody>
        </Table>
      </CardContent>
    </Card>);
  }