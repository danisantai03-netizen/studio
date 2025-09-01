
'use client';

import * as React from 'react';
import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Bell, Globe, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [notifications, setNotifications] = React.useState(true);

  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Settings" />
      <main className="w-full max-w-full mx-0 py-6 space-y-8">
        <div className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground px-4">General</h2>
            <ul className="divide-y divide-border">
                 <SettingRowSwitch
                    icon={Bell}
                    title="Push Notifications"
                    checked={notifications}
                    onCheckedChange={setNotifications}
                 />
            </ul>
        </div>

        <div className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground px-4">Regional</h2>
            <ul className="divide-y divide-border">
                <SettingRowSelect
                    icon={Globe}
                    title="Language"
                    currentValue="English"
                    options={["English", "Indonesian", "Spanish"]}
                />
            </ul>
        </div>

        <div className="space-y-2">
            <h2 className="text-sm font-semibold text-muted-foreground px-4">About</h2>
            <ul className="divide-y divide-border">
                <SettingRowLink title="Privacy Policy" href="/profile/terms" />
                <SettingRowLink title="Terms of Service" href="/profile/terms" />
            </ul>
        </div>
        
        <div className="pt-4 px-4">
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
    <li className="flex items-center p-4">
      <Icon className="w-5 h-5 mr-3 text-primary" />
      <span className="flex-grow text-sm font-medium">{title}</span>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </li>
  );
}

function SettingRowSelect({ icon: Icon, title, currentValue, options }: SettingRowProps & { currentValue: string; options: string[]; }) {
  return (
    <li className="flex items-center p-4">
      <Icon className="w-5 h-5 mr-3 text-primary" />
      <span className="flex-grow text-sm font-medium">{title}</span>
      <Select defaultValue={currentValue}>
        <SelectTrigger className="w-auto border-none focus:ring-0 text-sm text-muted-foreground bg-transparent">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
        </SelectContent>
      </Select>
    </li>
  );
}

function SettingRowLink({ title, href }: { title: string, href: string }) {
    return (
        <li>
            <Link href={href} className="flex items-center p-4 text-sm font-medium active:bg-muted/50 transition-colors">
                <span className="flex-grow">{title}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
        </li>
    )
}
