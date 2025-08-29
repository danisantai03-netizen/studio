import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserProfile() {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-12 w-12 border-2 border-primary">
        <AvatarImage src="https://picsum.photos/100" alt="Alex Green" data-ai-hint="person portrait" />
        <AvatarFallback>AG</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm text-muted-foreground">Welcome back,</p>
        <h1 className="text-xl font-bold text-foreground">Alex Green</h1>
      </div>
    </div>
  );
}
