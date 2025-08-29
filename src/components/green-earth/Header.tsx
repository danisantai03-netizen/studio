import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, History, Gift } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="px-6 pt-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-white shadow-md">
            <AvatarImage src="https://picsum.photos/48/48" alt="Alex Green" data-ai-hint="profile person" />
            <AvatarFallback>AG</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-lg text-muted-foreground">Welcome back 👋,</p>
            <h1 className="text-2xl font-bold text-foreground">Alex Green</h1>
          </div>
        </div>
        <div className="relative">
          <Button variant="secondary" size="icon" className="rounded-full w-12 h-12 bg-white shadow-sm transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 focus:ring-0">
            <Bell className="h-6 w-6" />
            <span className="sr-only">Notifications</span>
          </Button>
          <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-accent ring-2 ring-background" />
        </div>
      </div>
      <Card className="shadow-lg rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-muted-foreground font-medium">My Points</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-5xl font-bold text-primary">1,250 <span className="text-2xl text-muted-foreground">PTS</span></p>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-full shadow-sm transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 focus:ring-0">
                <History className="mr-2 h-4 w-4" />
                View History
              </Button>
              <Button variant="default" className="bg-accent text-accent-foreground rounded-full shadow-md transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 focus:ring-0">
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
