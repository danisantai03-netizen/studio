
export interface TransactionDetails {
    transactionId: string;
    itemPhotoUrl: string;
    category: string;
    weight: number;
    pricePerKg: number;
    pickupDate: string; // ISO String
    driver: {
      name: string;
      vehicle: string;
      plate: string;
    };
  }
  