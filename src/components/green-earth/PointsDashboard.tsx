import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { History, Gift } from "lucide-react";

export function PointsDashboard() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>My Points</CardTitle>
        <CardDescription>Keep up the great work!</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-5xl font-bold text-primary">1,250 <span className="text-2xl text-muted-foreground">PTS</span></p>
          <div className="flex gap-2">
            <Button variant="outline">
              <History className="mr-2 h-4 w-4" />
              View History
            </Button>
            <Button variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Gift className="mr-2 h-4 w-4" />
              Redeem
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
