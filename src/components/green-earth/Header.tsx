import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { History, Gift } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Notifications } from "./Notifications";

export function Header() {
  return (
    <header className="px-4 pt-4 pb-6 bg-white rounded-b-3xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
            <AvatarImage src="https://picsum.photos/48/48" alt="Alex Green" data-ai-hint="profile person" />
            <AvatarFallback>AG</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-base font-bold text-foreground">Alex Green</h1>
            <p className="text-sm text-muted-foreground">Welcome back 👋</p>
          </div>
        </div>
        <Notifications />
      </div>
      <Card className="shadow-lg rounded-2xl bg-primary text-primary-foreground">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-primary-foreground/80">My Points</p>
              <p className="text-3xl font-bold">1,250 <span className="text-lg">PTS</span></p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 focus:ring-0">
                <History className="mr-1.5 h-4 w-4" />
                History
              </Button>
              <Button variant="secondary" size="sm" className="bg-accent text-accent-foreground rounded-full shadow-md transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 focus:ring-0">
                <Gift className="mr-1.5 h-4 w-4" />
                Redeem
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </header>
  );
}
