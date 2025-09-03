
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UniversalHeader } from '@/components/green-earth/UniversalHeader';
import { SuccessAnimation } from '@/components/green-earth/SuccessAnimation';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Gift } from 'lucide-react';

const quickAmounts = [10000, 15000, 20000, 30000, 40000, 50000, 100000];

const paymentMethods = [
  { name: 'DANA', logo: '/images/ewallet/dana.png' },
  { name: 'OVO', logo: '/images/ewallet/ovo.png' },
  { name: 'GoPay', logo: '/images/ewallet/gopay.png' },
  { name: 'ShopeePay', logo: '/images/ewallet/shopeepay.png' },
  { name: 'Bank Transfer', logo: '/images/ewallet/bank.png' },
];

const vouchers = [
  { name: 'Coffee Voucher', points: 200 },
  { name: 'PLN Token', points: 1000 },
  { name: 'Free Shipping', points: 500 },
]

export default function WithdrawPage() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].name);
  const [fullName, setFullName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuickAmountClick = (value: number) => {
    setAmount(value.toLocaleString('id-ID'));
  };

  const isFormValid = () => {
    const numericAmount = parseFloat(amount.replace(/\./g, ''));
    return numericAmount > 0 && fullName.length > 2 && accountNumber.length > 8;
  };
  
  const handleConfirm = () => {
      if (!isFormValid()) return;
      setIsProcessing(true);
  }
  
  const onAnimationComplete = () => {
      const withdrawId = `WD-${Date.now()}`;
      router.push(`/withdraw/${withdrawId}`);
  }

  const getAccountNumberLabel = () => {
      if (selectedMethod === 'Bank Transfer') {
          return 'Account Number';
      }
      return 'Phone Number';
  }

  return (
    <div className="bg-background min-h-screen">
      {isProcessing && (
          <SuccessAnimation
            message="Withdraw is being processed..."
            onComplete={onAnimationComplete}
          />
      )}
      <UniversalHeader title="Withdraw" />
      <main className="w-full max-w-full mx-0 px-4 sm:px-6 md:px-8 py-6 space-y-8 pb-24">
        
        {/* Amount Section */}
        <section>
          <Label htmlFor="amount" className="font-semibold text-foreground">Amount</Label>
          <div className="relative mt-2">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground font-semibold">Rp</span>
            <Input
              id="amount"
              type="text"
              className="h-14 pl-10 text-xl font-bold"
              placeholder="0"
              value={amount}
              onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  setAmount(Number(value).toLocaleString('id-ID'));
              }}
            />
          </div>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {quickAmounts.map((val) => (
              <Button key={val} variant="outline" className="h-9" onClick={() => handleQuickAmountClick(val)}>
                {val.toLocaleString('id-ID')}
              </Button>
            ))}
          </div>
        </section>

        {/* Payment Method Section */}
        <section>
          <h2 className="font-semibold text-foreground mb-2">Payment Method</h2>
           <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max space-x-4">
                {paymentMethods.map((method) => (
                    <div
                        key={method.name}
                        onClick={() => setSelectedMethod(method.name)}
                        className={cn(
                            "flex flex-col items-center justify-center text-center group cursor-pointer w-20 h-24 p-2 rounded-xl border-2 transition-all",
                             selectedMethod === method.name ? "border-primary bg-primary/5" : "border-border"
                        )}
                        >
                        <div className="w-12 h-12 flex items-center justify-center">
                            <Image src={method.logo} alt={method.name} width={40} height={40} />
                        </div>
                        <p className="font-medium text-center text-xs text-foreground mt-2 w-full truncate">{method.name}</p>
                    </div>
                ))}
                </div>
                <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>
        </section>

        {/* User Details Section */}
        <section className="space-y-4">
             <div>
                <Label htmlFor="fullName" className="font-semibold text-foreground">Full Name</Label>
                <Input
                id="fullName"
                className="mt-2 h-12"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                />
            </div>
             <div>
                <Label htmlFor="accountNumber" className="font-semibold text-foreground">{getAccountNumberLabel()}</Label>
                <Input
                id="accountNumber"
                className="mt-2 h-12"
                placeholder="e.g. 081234567890"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                />
            </div>
        </section>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
          <Button size="lg" className="w-full h-12 text-base" onClick={handleConfirm} disabled={!isFormValid() || isProcessing}>
            Confirm Withdraw
          </Button>
        </div>

        <Separator />
        
        {/* Voucher Section */}
        <section>
          <h2 className="text-lg font-bold mb-3">Redeem Vouchers</h2>
          <div className="space-y-3">
             {vouchers.map((voucher, index) => (
               <div key={index} className="flex items-center justify-between p-4 rounded-xl border">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg grid place-items-center">
                        <Gift className="w-5 h-5 text-primary"/>
                    </div>
                    <div>
                        <p className="font-semibold text-sm">{voucher.name}</p>
                        <p className="text-xs text-muted-foreground">{voucher.points.toLocaleString('id-ID')} Points</p>
                    </div>
                 </div>
                 <Button size="sm" variant="outline">Redeem</Button>
               </div>
             ))}
          </div>
        </section>

      </main>
    </div>
  );
}
