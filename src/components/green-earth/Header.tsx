import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, History, Gift } from "lucide-react";

export function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm border-b">
      <div className="px-4 pt-4">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm text-muted-foreground">Welcome back,</p>
            <h1 className="text-xl font-bold text-foreground">Alex Green</h1>
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-6 w-6" />
            <span className="sr-only">Notifications</span>
          </Button>
        </div>
        <Card className="shadow-lg mb-4">
          <CardHeader>
            <CardTitle>My Points</CardTitle>
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
      </div>
    </header>
  );
}
