import {type FetcherWithComponents} from '@remix-run/react';
import {CartForm, type OptimisticCartLineInput} from '@shopify/hydrogen';
import {FaShoppingCart, FaSpinner} from 'react-icons/fa';
import {useState} from 'react';

export function AddToCartButton({
  analytics,
  disabled,
  lines,
  onClick,
  onAddToCartComplete,
}: {
  analytics?: unknown;
  disabled?: boolean;
  lines: Array<OptimisticCartLineInput>;
  onClick?: () => void;
  onAddToCartComplete?: () => void;
}) {
  const [hasHandled, setHasHandled] = useState(false);

  const handleSubmit = () => {
    // Dispatch custom event when item is added
    window.dispatchEvent(new Event('openCart'));
    onClick?.();
    onAddToCartComplete?.();
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
              <img
                src="/assets/foamLeft.png"
                alt=""
                className="absolute left-0 bottom-0 z-0 pointer-events-none -translate-x-10 md:translate-x-0 w-40 opacity-50"
              />
              <img
                src="/assets/foamRight.png"
                alt=""
                className="absolute right-0 top-0 z-0 pointer-events-none w-40 opacity-50 translate-x-10"
              />
              <div className="relative z-10 flex items-center justify-center space-x-4">
                {fetcher.state === 'submitting' ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <>
                    <FaShoppingCart className="text-xl" />
                    <span className="font-semibold">Dodaj do koszyka</span>
                  </>
                )}
              </div>
            </button>
          </>
        );
      }}
    </CartForm>
  );
}
