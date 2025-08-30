
'use client';

import * as React from 'react';
import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Bell, Globe, ChevronRight } from 'lucide-react';

export default function SettingsPage() {
  const [notifications, setNotifications] = React.useState(true);

  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Settings" showBackButton={true} />
      <main className="p-4 space-y-6">
        <div className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground px-2">General</h2>
            <div className="bg-card rounded-xl shadow-sm">
                 <SettingRowSwitch
                    icon={Bell}
                    title="Push Notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                 />
            </div>
        </div>

        <div className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground px-2">Regional</h2>
            <div className="bg-card rounded-xl shadow-sm">
                <SettingRowSelect
                    icon={Globe}
                    title="Language"
                    currentValue="English"
                    options={["English", "Indonesian", "Spanish"]}
                />
            </div>
        </div>

        <div className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground px-2">About</h2>
            <div className="bg-card rounded-xl shadow-sm">
                <SettingRowLink title="Privacy Policy" href="/profile/terms" />
                <div className="h-px bg-border mx-4" />
                <SettingRowLink title="Terms of Service" href="/profile/terms" />
            </div>
        </div>
        
        <div className="pt-4">
            <Button variant="destructive" className="w-full">Delete Account</Button>
        </div>
      </main>
    </div>
  );
}


interface SettingRowProps {
  icon: React.ElementType;
  title: string;
}

function SettingRowSwitch({ icon: Icon, title, checked, onCheckedChange }: SettingRowProps & { checked: boolean; onCheckedChange: (checked: boolean) => void; }) {
  return (
    <div className="flex items-center p-4">
      <Icon className="w-5 h-5 mr-3 text-primary" />
      <span className="flex-grow text-sm font-medium">{title}</span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

function SettingRowSelect({ icon: Icon, title, currentValue, options }: SettingRowProps & { currentValue: string; options: string[]; }) {
  return (
    <div className="flex items-center p-4">
      <Icon className="w-5 h-5 mr-3 text-primary" />
      <span className="flex-grow text-sm font-medium">{title}</span>
      <Select defaultValue={currentValue}>
        <SelectTrigger className="w-auto border-none focus:ring-0 text-sm text-muted-foreground">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}

function SettingRowLink({ title, href }: { title: string, href: string }) {
    return (
        <a href={href} className="flex items-center p-4 text-sm font-medium active:bg-gray-50 transition-colors">
            <span className="flex-grow">{title}</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </a>
    )
}
