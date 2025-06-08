import { useState } from 'react';

interface PaymentFormProps {
  onPaymentSubmit: (paymentDetails: PaymentDetails) => void;
}

export interface PaymentDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolderName: string;
}

export default function PaymentForm({ onPaymentSubmit }: PaymentFormProps) {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 5);
    }

    // Limit CVV to 3 or 4 digits
    if (name === 'cvv') {
      formattedValue = value.slice(0, 4);
    }

    setPaymentDetails(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPaymentSubmit(paymentDetails);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="cardHolderName" className="block text-sm font-medium text-gray-700">
          Card Holder Name
        </label>
        <input
          type="text"
          id="cardHolderName"
          name="cardHolderName"
          value={paymentDetails.cardHolderName}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue sm:text-sm"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={paymentDetails.cardNumber}
          onChange={handleChange}
          required
          maxLength={19}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue sm:text-sm"
          placeholder="1234 5678 9012 3456"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
            Expiry Date
          </label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={paymentDetails.expiryDate}
            onChange={handleChange}
            required
            placeholder="MM/YY"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
            CVV
          </label>
          <input
            type="password"
            id="cvv"
            name="cvv"
            value={paymentDetails.cvv}
            onChange={handleChange}
            required
            maxLength={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue sm:text-sm"
            placeholder="123"
          />
        </div>
      </div>
    </form>
  );
} 