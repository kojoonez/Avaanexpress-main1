import { useState } from 'react';

interface DeliveryAddressFormProps {
  onAddressSubmit: (address: DeliveryAddress) => void;
  initialAddress?: DeliveryAddress;
}

export interface DeliveryAddress {
  streetAddress: string;
  apartment: string;
  city: string;
  postalCode: string;
  instructions: string;
}

export default function DeliveryAddressForm({ onAddressSubmit, initialAddress }: DeliveryAddressFormProps) {
  const [address, setAddress] = useState<DeliveryAddress>(initialAddress || {
    streetAddress: '',
    apartment: '',
    city: '',
    postalCode: '',
    instructions: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddressSubmit(address);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
          Street Address
        </label>
        <input
          type="text"
          id="streetAddress"
          name="streetAddress"
          value={address.streetAddress}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="apartment" className="block text-sm font-medium text-gray-700">
          Apartment / Suite (Optional)
        </label>
        <input
          type="text"
          id="apartment"
          name="apartment"
          value={address.apartment}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue sm:text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={address.city}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={address.postalCode}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
          Delivery Instructions (Optional)
        </label>
        <textarea
          id="instructions"
          name="instructions"
          value={address.instructions}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-blue focus:ring-primary-blue sm:text-sm"
        />
      </div>
    </form>
  );
} 