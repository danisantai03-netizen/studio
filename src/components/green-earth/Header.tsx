import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { History, Gift } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Notifications } from "./Notifications";

export function Header() {
  return (
    <header className="px-4 pt-4 pb-6 bg-background">
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
      <Card className="shadow-lg rounded-2xl bg-primary text-primary-foreground w-full max-w-md mx-auto">
        <CardContent className="p-4 flex flex-col items-center text-center">
          <p className="text-xs text-primary-foreground/80 self-start">My Points</p>
          <div className="my-2">
            <p className="text-4xl font-bold leading-none">1,250</p>
            <p className="text-sm font-semibold tracking-widest">PTS</p>
          </div>
          <div className="flex w-full gap-3 mt-3">
            <Button variant="ghost" size="sm" className="flex-1 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 focus:ring-0">
              <History className="mr-1.5 h-4 w-4" />
              History
            </Button>
            <Button variant="secondary" size="sm" className="flex-1 bg-accent text-accent-foreground rounded-full shadow-md transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 focus:ring-0">
              <Gift className="mr-1.5 h-4 w-4" />
              Redeem
            </Button>
          </div>
        </CardContent>
      </Card>
    </header>
  );
}
