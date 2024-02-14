/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

// Correctly wrap the global augmentations
declare global {
  interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    image?: string;
    order_id: string;
    handler: (response: any) => void;
    prefill: {
      name: string;
      email: string;
      contact: string;
    };
    notes: {
      address: string;
    };
    theme: {
      color: string;
    };
  }

  interface Razorpay {
    open(): void;
  }

  // Extend the Window interface
  interface Window {
    Razorpay: new (options: RazorpayOptions) => Razorpay;
  }
}

// This export is needed to ensure the file is treated as a module
export { };
