import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, History, Gift } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm border-b px-4 pt-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src="https://picsum.photos/40/40" alt="Alex Green" data-ai-hint="profile person" />
            <AvatarFallback>AG</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm text-muted-foreground">Welcome back,</p>
            <h1 className="text-xl font-bold text-foreground">Alex Green</h1>
          </div>
        </div>
        <Button variant="secondary" size="icon" className="rounded-full active:opacity-70 focus:ring-0">
          <Bell className="h-6 w-6" />
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>My Points</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-5xl font-bold text-primary">1,250 <span className="text-2xl text-muted-foreground">PTS</span></p>
            <div className="flex gap-2">
              <Button variant="outline" className="active:opacity-70 focus:ring-0">
                <History className="mr-2 h-4 w-4" />
                View History
              </Button>
              <Button variant="default" className="bg-accent hover:bg-accent/90 text-accent-foreground active:opacity-70 focus:ring-0">
                <Gift className="mr-2 h-4 w-4" />
                Redeem
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </header>
  );
}
