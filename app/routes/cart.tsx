import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import {
  XMarkIcon,
  TruckIcon,
  ShoppingBagIcon,
  ClipboardDocumentIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import {Await} from '@remix-run/react';
import type {ActionFunctionArgs} from '@remix-run/server-runtime';
import {json} from '@remix-run/server-runtime';
import type {CartQueryDataReturn} from '@shopify/hydrogen';
import {Analytics, CartForm} from '@shopify/hydrogen';
import {Suspense, useState, useEffect} from 'react';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import AnimatedPaymentMethods from '~/components/AnimatedPaymentMethods';
import {useRootLoaderData} from '~/root';
import {type FetcherWithComponents} from '@remix-run/react';
import {FaSpinner} from 'react-icons/fa';
import {FreeShippingPromo} from '~/components/FreeShippingPromo';
import copy from 'copy-to-clipboard';

export async function action({request, context}: ActionFunctionArgs) {
  const {cart} = context;

  const formData = await request.formData();

  const {action, inputs} = CartForm.getFormInput(formData);

  if (!action) {
    throw new Error('No action provided');
  }

  let status = 200;
  let result: CartQueryDataReturn;

  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    case CartForm.ACTIONS.DiscountCodesUpdate: {
      const formDiscountCode = inputs.discountCode;

      // User inputted discount code
      const discountCodes = (
        formDiscountCode ? [formDiscountCode] : []
      ) as string[];

      // Combine discount codes already applied on cart
      discountCodes.push(...inputs.discountCodes);

      result = await cart.updateDiscountCodes(discountCodes);
      break;
    }
    case CartForm.ACTIONS.BuyerIdentityUpdate: {
      result = await cart.updateBuyerIdentity({
        ...inputs.buyerIdentity,
      });
      break;
    }
    default:
      throw new Error(`${action} cart action is not defined`);
  }

  const cartId = result.cart.id;
  const headers = cart.setCartId(result.cart.id);
  const {cart: cartResult, errors} = result;

  const redirectTo = formData.get('redirectTo') ?? null;
  if (typeof redirectTo === 'string') {
    status = 303;
    headers.set('Location', redirectTo);
  }

  headers.append('Set-Cookie', await context.session.commit());

  return json(
    {
      cart: cartResult,
      errors,
      analytics: {
        cartId,
      },
    },
    {status, headers},
  );
}

interface CartProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Cart({open, setOpen}: CartProps) {
  const rootData = useRootLoaderData();
  const cartPromise = rootData.cart;

  const handleClose = () => {
    setOpen(false);
    window.dispatchEvent(
      new CustomEvent('cartToggled', {
        detail: {isOpen: false},
      }),
    );
  };

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('cartToggled', {
        detail: {isOpen: open},
      }),
    );
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-20">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await
          resolve={cartPromise}
          errorElement={<div>An error occurred</div>}
        >
          {(cart) => {
            return <CartContent cart={cart} setOpen={setOpen} />;
          }}
        </Await>
      </Suspense>
    </Dialog>
  );
}

interface CartContentProps {
  cart: CartApiQueryFragment | null;
  setOpen: (open: boolean) => void;
}

const CartContent = ({cart, setOpen}: CartContentProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCheckout = () => {
    window.location.href = cart?.checkoutUrl ?? '';
  };

  const freeShippingThreshold = 79;
  const subtotal = parseFloat(cart?.cost.subtotalAmount.amount || '0');
  const progressPercentage = Math.min(
    (subtotal / freeShippingThreshold) * 100,
    100,
  );

  const isCartEmpty = !cart || cart.lines.nodes.length === 0;

  const handleCopyToClipboard = () => {
    copy('DARMOWYSTYCZEN');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
          <DialogPanel
            transition
            className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
          >
            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
              <div className="flex-1 overflow-x-hidden px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                  <DialogTitle className="text-lg font-medium text-color-text">
                    Koszyk {!isCartEmpty && `• ${cart?.totalQuantity}`}
                  </DialogTitle>
                  <div className="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="relative -m-2 p-2 text-color-textLight hover:text-gray-500"
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                {isCartEmpty ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBagIcon className="h-16 w-16 text-color-textLight mb-4" />
                    <h2 className="text-lg font-medium text-gray-900 mb-2">
                      Twój koszyk jest pusty
                    </h2>
                    <p className="text-sm text-color-textLight mb-6">
                      Wygląda na to, że nie dodałeś jeszcze żadnych produktów do
                      koszyka.
                    </p>
                    <button
                      onClick={() => setOpen(false)}
                      className="rounded-md bg-color-blue px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-color-blue/50"
                    >
                      Kontynuuj zakupy
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="checkout-ticker-container rounded-md flex items-center mt-4 max-w-full">
                      <div className="checkout-ticker-content flex items-center space-x-4">
                        <span className="text-color-blue">
                          Ekspresowa wysyłka
                        </span>
                        <span className="text-color-blue">
                          Ekspresowa wysyłka
                        </span>
                        <span className="text-color-blue">
                          Ekspresowa wysyłka
                        </span>
                        <span className="text-color-blue">
                          Ekspresowa wysyłka
                        </span>
                        <span className="text-color-blue">
                          Ekspresowa wysyłka
                        </span>
                        <span className="text-color-blue">
                          Ekspresowa wysyłka
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 relative">
                      <FreeShippingPromo className="pr-16" />
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-color-text">
                          Postęp do darmowej wysyłki
                        </span>
                        <span className="text-sm font-medium text-color-text">
                          {subtotal.toFixed(2)} / {freeShippingThreshold} PLN
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-color-blue h-2.5 rounded-full"
                          style={{width: `${progressPercentage}%`}}
                        ></div>
                      </div>
                      <div className="flex items-center justify-end mt-2">
                        <TruckIcon className="h-5 w-5 text-color-textLight mr-1" />
                        <span className="text-sm text-color-textLight">
                          {subtotal >= freeShippingThreshold
                            ? 'Darmowa wysyłka!'
                            : `Dodaj jeszcze ${(
                                freeShippingThreshold - subtotal
                              ).toFixed(2)} PLN dla darmowej wysyłki`}
                        </span>
                      </div>
                    </div>
                    <div className="mt-8">
                      <div className="flow-root">
                        <ul className="-my-6 divide-y divide-gray-200">
                          {cart?.lines.nodes.map((line) => (
                            <li key={line.id} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={line.merchandise.image?.url}
                                  alt={line.merchandise.product?.title}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>{line.merchandise.product?.title}</h3>
                                    <p className="ml-4">
                                      {(
                                        Number(line.merchandise.price.amount) *
                                        line.quantity
                                      ).toFixed(2)}{' '}
                                      PLN
                                    </p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">
                                    {line.merchandise.selectedOptions[0]
                                      .name !== 'Title' && (
                                      <>
                                        {
                                          line.merchandise.selectedOptions[0]
                                            .name
                                        }
                                        :&nbsp;
                                        {line.merchandise.title}
                                      </>
                                    )}
                                  </p>
                                </div>
                                <div className="flex flex-1 items-center justify-between text-s mt-4">
                                  <div className="flex items-center">
                                    <div className="flex items-center space-x-2">
                                      <CartLineUpdateButton
                                        lineId={line.id}
                                        quantity={line.quantity - 1}
                                      >
                                        -
                                      </CartLineUpdateButton>
                                      <span className="w-4 text-center">
                                        {line.quantity}
                                      </span>
                                      <CartLineUpdateButton
                                        lineId={line.id}
                                        quantity={line.quantity + 1}
                                      >
                                        +
                                      </CartLineUpdateButton>
                                    </div>
                                  </div>

                                  <div className="flex items-center">
                                    <CartLineDeleteButton lineIds={[line.id]} />
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="relative p-3 bg-red-500 m-2">
                <div className="absolute -left-1 -top-1 w-8 h-4 bg-gray-300/30 rotate-[5deg]"></div>
                <div className="absolute -right-1 -top-1 w-8 h-4 bg-gray-300/30 -rotate-[5deg]"></div>
                <div className="absolute -left-1 -bottom-1 w-8 h-4 bg-gray-300/30 -rotate-[5deg]"></div>
                <div className="absolute -right-1 -bottom-1 w-8 h-4 bg-gray-300/30 rotate-[5deg]"></div>

                <div className="flex gap-2 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TruckIcon className="h-5 w-5 text-white" />
                    <p className="text-xs md:text-sm text-white font-medium">
                      Darmowa dostawa z kodem:
                    </p>
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-2 bg-white px-2 py-1.5 rounded-md border cursor-pointer hover:bg-gray-50"
                    onClick={handleCopyToClipboard}
                  >
                    <span className="text-xs text-color-text">
                      DARMOWYSTYCZEN
                    </span>
                    {isCopied ? (
                      <CheckIcon className="h-4 w-4 text-green-500" />
                    ) : (
                      <ClipboardDocumentIcon className="h-4 w-4 text-color-textLight" />
                    )}
                  </button>
                </div>
              </div>
              {!isCartEmpty && (
                <div className="border-t border-gray-200 px-4 pt-4 pb-2 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-color-text">
                    <p>Suma częściowa</p>
                    <p>
                      {Number(cart?.cost.subtotalAmount.amount).toFixed(2)}zł
                    </p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Koszty wysyłki oraz kody rabatowe przy kasie.
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={handleCheckout}
                      className="w-full flex items-center justify-center rounded-md border border-transparent bg-color-blue px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-color-blue/50 disabled:bg-indigo-300"
                    >
                      Do kasy
                    </button>
                  </div>
                  <div className="my-4 flex justify-center text-center text-sm text-color-textLight">
                    <p>
                      lub{' '}
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-medium text-color-blue hover:text-color-blue/50"
                      >
                        Kontynuj zakupy
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                  <AnimatedPaymentMethods />
                </div>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
      <Analytics.CartView />
    </div>
  );
};

function CartLineDeleteButton({lineIds}: {lineIds: string[]}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      {(fetcher: FetcherWithComponents<any>) => (
        <button
          type="submit"
          className="font-medium text-sm text-color-blue hover:text-color-blue/50"
          disabled={fetcher.state !== 'idle'}
        >
          {fetcher.state === 'submitting' ? (
            <FaSpinner className="animate-spin h-4 w-4" />
          ) : (
            'Usuń'
          )}
        </button>
      )}
    </CartForm>
  );
}

function CartLineUpdateButton({
  lineId,
  quantity,
  children,
}: {
  lineId: string;
  quantity: number;
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{
        lines: [{id: lineId, quantity}],
      }}
    >
      {(fetcher: FetcherWithComponents<any>) => (
        <button
          type="submit"
          className="p-2 w-8 h-8 hover:bg-gray-100 rounded font-medium text-color-blue hover:text-color-blue/50 flex items-center justify-center"
          disabled={quantity < 1 || fetcher.state !== 'idle'}
        >
          {fetcher.state === 'submitting' ? (
            <FaSpinner className="animate-spin h-4 w-4" />
          ) : (
            children
          )}
        </button>
      )}
    </CartForm>
  );
}
