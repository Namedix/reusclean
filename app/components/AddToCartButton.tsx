import {type FetcherWithComponents} from '@remix-run/react';
import {CartForm, type OptimisticCartLineInput} from '@shopify/hydrogen';
import {FaShoppingCart, FaSpinner} from 'react-icons/fa';

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
  return (
    <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher: FetcherWithComponents<any>) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <button
            className="w-full py-4 px-4 h-14 bg-color-blue text-white text-sm rounded-lg shadow-lg shadow-color-blue/20 flex items-center justify-center space-x-4 relative overflow-hidden"
            type="submit"
            onClick={onClick}
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
      )}
    </CartForm>
  );
}
