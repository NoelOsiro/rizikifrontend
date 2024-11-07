import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

interface CardProps {
    title: string ;
    value: string ;
    percentageChange?: number;
    description?: string ;
}

interface DashBoardCardProps {
    card: CardProps;
    formatPercentage: (value:number) =>  JSX.Element;
}

export default function DashBoardCard(props: DashBoardCardProps) {
    return (
        <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{props.card.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{props.card.value}</div>
                {props.card.percentageChange !== undefined ? props.formatPercentage(props.card.percentageChange) : null}
                {props.card.description && <p className="text-xs text-muted-foreground">{props.card.description}</p>}
            </CardContent>
        </Card>
    );
}