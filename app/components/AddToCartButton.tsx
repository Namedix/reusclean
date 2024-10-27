import {type FetcherWithComponents} from '@remix-run/react';
import {CartForm, type OptimisticCartLineInput} from '@shopify/hydrogen';
import {FaShoppingCart, FaSpinner} from 'react-icons/fa';
import {useState} from 'react';

export function AddToCartButton({
  analytics,
  disabled,
  lines,
  onClick,
}: {
  analytics?: unknown;
  disabled?: boolean;
  lines: Array<OptimisticCartLineInput>;
  onClick?: () => void;
}) {
  const [hasHandled, setHasHandled] = useState(false);

  const handleSubmit = () => {
    // Dispatch custom event when item is added
    window.dispatchEvent(new Event('openCart'));
    onClick?.();
    setHasHandled(true);
  };

  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher: FetcherWithComponents<any>) => {
        // Only handle submit once when request completes
        if (fetcher.state === 'idle' && fetcher.data && !hasHandled) {
          handleSubmit();
        }

        // Reset handled state when starting new submission
        if (fetcher.state === 'submitting') {
          setHasHandled(false);
        }

        return (
          <>
            <input
              name="analytics"
              type="hidden"
              value={JSON.stringify(analytics)}
            />
            <button
              className="w-full py-4 px-4 h-14 bg-color-blue text-white text-sm rounded-lg shadow-lg shadow-color-blue/20 flex items-center justify-center space-x-4 relative overflow-hidden"
              type="submit"
              disabled={disabled ?? fetcher.state !== 'idle'}
            >
              {fetcher.state === 'submitting' ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <>
                  <FaShoppingCart className="text-xl" />
                  <span className="font-semibold">Dodaj do koszyka</span>
                </>
              )}
            </button>
          </>
        );
      }}
    </CartForm>
  );
}
