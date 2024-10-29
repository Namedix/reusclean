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
} from '@heroicons/react/24/outline';
import {Await} from '@remix-run/react';
import type {ActionFunctionArgs} from '@remix-run/server-runtime';
import {json} from '@remix-run/server-runtime';
import type {CartQueryDataReturn} from '@shopify/hydrogen';
import {CartForm} from '@shopify/hydrogen';
import {Suspense} from 'react';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import AnimatedPaymentMethods from '~/components/AnimatedPaymentMethods';
import {useRootLoaderData} from '~/root';

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

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      className="relative z-20"
    >
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
  const handleCheckout = () => {
    window.location.href = cart?.checkoutUrl ?? '';
  };

  const freeShippingThreshold = 75; // 75 PLN
  const subtotal = parseFloat(cart?.cost.subtotalAmount.amount || '0');
  const progressPercentage = Math.min(
    (subtotal / freeShippingThreshold) * 100,
    100,
  );

  const isCartEmpty = !cart || cart.lines.nodes.length === 0;

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
          <DialogPanel
            transition
            className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
          >
            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                  <DialogTitle className="text-lg font-medium text-gray-900">
                    Koszyk {!isCartEmpty && `• ${cart?.totalQuantity}`}
                  </DialogTitle>
                  <div className="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                {isCartEmpty ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingBagIcon className="h-16 w-16 text-gray-400 mb-4" />
                    <h2 className="text-lg font-medium text-gray-900 mb-2">
                      Twój koszyk jest pusty
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">
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
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Postęp do darmowej wysyłki
                        </span>
                        <span className="text-sm font-medium text-gray-700">
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
                        <TruckIcon className="h-5 w-5 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-500">
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
                                    {line.merchandise.selectedOptions[0].name}
                                    :&nbsp;
                                    {line.merchandise.title}
                                  </p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <div>
                                    <label
                                      htmlFor={`quantity-${line.id}`}
                                      className="mr-2"
                                    >
                                      Ilość: {line.quantity}
                                    </label>
                                  </div>

                                  <div className="flex">
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

              {!isCartEmpty && (
                <div className="border-t border-gray-200 px-4 pt-4 pb-2 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Suma częściowa</p>
                    <p>{cart?.cost.subtotalAmount.amount}zł</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Koszty wysyłki obliczone przy kasie.
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={handleCheckout}
                      className="w-full flex items-center justify-center rounded-md border border-transparent bg-color-blue px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-color-blue/50 disabled:bg-indigo-300"
                    >
                      Do kasy
                    </button>
                  </div>
                  <div className="my-4 flex justify-center text-center text-sm text-gray-500">
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
      <button
        type="submit"
        className="font-medium text-color-blue hover:text-color-blue/50"
      >
        Usuń
      </button>
    </CartForm>
  );
}
