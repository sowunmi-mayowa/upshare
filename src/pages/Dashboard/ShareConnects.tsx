import React, { useState } from 'react';
import { useConnects } from '../../context/ConnectsContext';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const ShareConnects: React.FC = () => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [amount, setAmount] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const { shareConnects } = useConnects();
  const { state: { user } } = useAuth();
  
  if (!user) return null;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    // Validation
    if (!recipientEmail.trim()) {
      setError('Recipient email is required');
      return;
    }
    
    if (amount <= 0) {
      setError('Amount must be greater than 0');
      return;
    }
    
    if (amount > user.connects) {
      setError(`You only have ${user.connects} connects available`);
      return;
    }
    
    try {
      setIsSubmitting(true);
      await shareConnects(recipientEmail, amount);
      setSuccess(true);
      setRecipientEmail('');
      setAmount(1);
      toast.success(`Successfully shared ${amount} connects with ${recipientEmail}`);
    } catch (err) {
      setError((err as Error).message);
      toast.error((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <div className="flex items-center mb-6">
        <div className="p-2 bg-primary-50 rounded-full mr-3">
        </div>
        <h2 className="text-xl font-bold text-neutral-800">Share Your Connects</h2>
      </div>
      
      {success && (
        <div className="mb-6 p-4 bg-success-50 text-success-700 rounded-md flex items-start">
          <div>
            <p className="font-medium">Connects shared successfully!</p>
            <p className="text-sm">A confirmation email has been sent to the recipient.</p>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mb-6 p-4 bg-error-50 text-error-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="recipientEmail" className="block text-sm font-medium text-neutral-700 mb-1">
            Recipient Email
          </label>
          <input
            type="email"
            id="recipientEmail"
            placeholder="colleague@example.com"
            className="input"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-neutral-700 mb-1">
            Number of Connects to Share
          </label>
          <div className="flex items-center">
            <input
              type="number"
              id="amount"
              min="1"
              max={user.connects}
              className="input"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value, 10) || 0)}
              disabled={isSubmitting}
            />
            <span className="ml-3 text-neutral-500">
              Available: <span className="font-medium text-primary-600">{user.connects}</span>
            </span>
          </div>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            className="btn btn-primary w-full flex justify-center items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                Processing...
              </>
            ) : (
              <>
                Share Connects
              </>
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-6 p-4 bg-neutral-50 rounded-md text-sm text-neutral-600">
        <p className="font-medium mb-2">How this works:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Connects will be transferred immediately to the recipient's account</li>
          <li>A confirmation email will be sent to both you and the recipient</li>
          <li>Shared connects cannot be refunded or returned</li>
        </ul>
      </div>
    </div>
  );
};

export default ShareConnects;