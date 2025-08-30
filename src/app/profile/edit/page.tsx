
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import useUserStore from '@/hooks/useUserStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, AlertCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { UniversalHeader } from '@/components/green-earth/UniversalHeader';

const addressData: any = {
  "JAWA BARAT": {
    "KOTA BANDUNG": {
      "BANDUNG KIDUL": ["BATUNUNGGAL", "MENGGER"],
      "COBLONG": ["DAGO", "SEKELOA"],
    },
    "KAB. BANDUNG": {
        "CILEUNYI": ["CIBIRU WETAN", "CINUNUK"],
        "MARGAASIH": ["LAGADAR", "NANJUNG"],
    }
  },
  "DKI JAKARTA": {
    "JAKARTA SELATAN": {
      "KEBAYORAN BARU": ["SELAPAN", "GUNUNG"],
      "TEBET": ["TEBET TIMUR", "TEBET BARAT"],
    },
    "JAKARTA PUSAT": {
        "GAMBIR": ["GAMBIR", "CIDENG"],
        "MENTENG": ["MENTENG", "PEGANGSAAN"],
    }
  },
};

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^[0-9]{9,12}$/, "Invalid phone number"),
  province: z.string().min(1, "Province is required"),
  city: z.string().min(1, "City is required"),
  subdistrict: z.string().min(1, "Sub-district is required"),
  village: z.string().min(1, "Village is required"),
  fullAddress: z.string().min(10, "Full address must be at least 10 characters"),
});

export default function EditProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const { name, avatarUrl, email, phone, address, setName, setAvatarUrl, setPhone, setAddress } = useUserStore();
  const [previewAvatar, setPreviewAvatar] = React.useState<string>(avatarUrl);

  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: name,
      phone: phone,
      province: address.province || '',
      city: address.city || '',
      subdistrict: address.subdistrict || '',
      village: address.village || '',
      fullAddress: address.fullAddress || ''
    }
  });

  const watchProvince = watch("province");
  const watchCity = watch("city");
  const watchSubdistrict = watch("subdistrict");

  React.useEffect(() => {
    setValue("city", "");
    setValue("subdistrict", "");
    setValue("village", "");
  }, [watchProvince, setValue]);

  React.useEffect(() => {
    setValue("subdistrict", "");
    setValue("village", "");
  }, [watchCity, setValue]);

  React.useEffect(() => {
     setValue("village", "");
  }, [watchSubdistrict, setValue]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: z.infer<typeof profileSchema>) => {
    setName(data.name);
    setPhone(data.phone);
    setAddress({
      province: data.province,
      city: data.city,
      subdistrict: data.subdistrict,
      village: data.village,
      fullAddress: data.fullAddress,
    });
    setAvatarUrl(previewAvatar);

    toast({
        title: "Profile Updated",
        description: "Your information has been saved successfully.",
    });

    router.push('/profile');
  };

  const cities = watchProvince ? Object.keys(addressData[watchProvince]) : [];
  const subdistricts = watchProvince && watchCity ? Object.keys(addressData[watchProvince][watchCity]) : [];
  const villages = watchProvince && watchCity && watchSubdistrict ? addressData[watchProvince][watchCity][watchSubdistrict] : [];

  return (
    <div className="bg-background min-h-screen">
      <UniversalHeader title="Edit Profile" showBackButton={true} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <main className="p-4 space-y-6 pb-24">
          <div className="flex flex-col items-center gap-2 py-4">
            <div className="relative w-24 h-24 rounded-full overflow-hidden">
              <Image
                src={previewAvatar}
                alt="Profile photo"
                fill
                className="object-cover"
              />
              <label htmlFor="photo-upload" className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1.5 rounded-full cursor-pointer hover:bg-primary/90">
                <Camera className="w-4 h-4" />
              </label>
              <Input id="photo-upload" type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
            </div>
          </div>
          
          <div className="space-y-6">
             <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => <Input id="name" {...field} />}
                />
                {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
             </div>

             <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={email} disabled />
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                    <AlertCircle className="w-3.5 h-3.5"/>
                    <span>Email changes require 2FA</span>
                </div>
             </div>
             
             <div className="grid w-full items-center gap-1.5">
                 <Label htmlFor="phone">Phone Number</Label>
                 <div className="flex items-center">
                    <span className="inline-flex items-center px-3 h-12 rounded-l-md border border-r-0 border-input bg-gray-100 text-sm">+62</span>
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) =>  <Input id="phone" type="tel" className="rounded-l-none" {...field} />}
                    />
                 </div>
                 {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                    <AlertCircle className="w-3.5 h-3.5"/>
                    <span>Phone number changes require 2FA verification</span>
                </div>
             </div>
             
             <div className="space-y-4">
                 <div className="grid w-full items-center gap-1.5">
                   <Label>Address</Label>
                   <Controller
                      name="province"
                      control={control}
                      render={({ field }) => (
                           <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger><SelectValue placeholder="Select Province" /></SelectTrigger>
                              <SelectContent>
                                  {Object.keys(addressData).map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                              </SelectContent>
                           </Select>
                      )}
                   />
                   {errors.province && <p className="text-destructive text-xs mt-1">{errors.province.message}</p>}
                 </div>
                 <div className="grid w-full items-center gap-1.5">
                   <Controller
                      name="city"
                      control={control}
                      render={({ field }) => (
                           <Select onValueChange={field.onChange} value={field.value} disabled={!watchProvince}>
                              <SelectTrigger><SelectValue placeholder="Select City/Regency" /></SelectTrigger>
                              <SelectContent>
                                  {cities.map((c: string) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                              </SelectContent>
                           </Select>
                      )}
                   />
                    {errors.city && <p className="text-destructive text-xs mt-1">{errors.city.message}</p>}
                 </div>
                 <div className="grid w-full items-center gap-1.5">
                   <Controller
                      name="subdistrict"
                      control={control}
                      render={({ field }) => (
                           <Select onValueChange={field.onChange} value={field.value} disabled={!watchCity}>
                              <SelectTrigger><SelectValue placeholder="Select Sub-district" /></SelectTrigger>
                              <SelectContent>
                                  {subdistricts.map((s: string) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                              </SelectContent>
                           </Select>
                      )}
                   />
                   {errors.subdistrict && <p className="text-destructive text-xs mt-1">{errors.subdistrict.message}</p>}
                 </div>
                 <div className="grid w-full items-center gap-1.5">
                   <Controller
                      name="village"
                      control={control}
                      render={({ field }) => (
                           <Select onValueChange={field.onChange} value={field.value} disabled={!watchSubdistrict}>
                              <SelectTrigger><SelectValue placeholder="Select Village" /></SelectTrigger>
                              <SelectContent>
                                 {villages.map((v: string) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                              </SelectContent>
                           </Select>
                      )}
                   />
                   {errors.village && <p className="text-destructive text-xs mt-1">{errors.village.message}</p>}
                 </div>

                 <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="fullAddress">Full Address</Label>
                   <Controller
                      name="fullAddress"
                      control={control}
                      render={({ field }) => <Textarea id="fullAddress" placeholder="Enter street name, building, house number" {...field} />}
                   />
                   {errors.fullAddress && <p className="text-destructive text-xs mt-1">{errors.fullAddress.message}</p>}
                 </div>
             </div>
             
             <div className="pt-4">
                <Button type="submit" size="lg" className="w-full h-12">Save Changes</Button>
             </div>
          </div>
        </main>
      </form>
    </div>
  );
}
