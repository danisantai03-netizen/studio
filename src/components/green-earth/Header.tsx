import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { History, Gift } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Notifications } from "./Notifications";

export function Header() {
  return (
    <header className="relative bg-background">
      <div className="absolute top-0 left-0 right-0 h-32 bg-primary/90 rounded-b-3xl -z-0" />
      <div className="relative z-10 px-4 pt-4 pb-2">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
              <AvatarImage src="https://picsum.photos/48/48" alt="Alex Green" data-ai-hint="profile person" />
              <AvatarFallback>AG</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-base font-bold text-white">Alex Green</h1>
              <p className="text-sm text-white/80">Welcome back 👋</p>
            </div>
          </div>
          <Notifications />
        </div>
        <Card className="shadow-lg rounded-2xl bg-primary text-primary-foreground w-full max-w-md mx-auto">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs text-primary-foreground/80">My Points</p>
              <div className="mt-1">
                <p className="text-3xl font-bold leading-none">1,250</p>
                <p className="text-sm font-semibold tracking-widest text-primary-foreground/90">PTS</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Button variant="secondary" size="sm" className="w-full bg-accent text-accent-foreground rounded-full shadow-md transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 focus:ring-0">
                <Gift className="mr-1.5 h-4 w-4" />
                Redeem
              </Button>
               <Button variant="ghost" size="sm" className="w-full rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95 focus:ring-0">
                <History className="mr-1.5 h-4 w-4" />
                History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </header>
  );
}
