import {useLoaderData} from '@remix-run/react';
import type {LoaderFunctionArgs} from '@remix-run/server-runtime';
import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types';
import type {MetaFunction} from '@shopify/remix-oxygen';
import React, {useRef, useState} from 'react';
import {AddToCartButton} from '~/components/AddToCartButton';
import {PRODUCT_WITH_COLLECTION_QUERY} from '~/models/networking/ProductQuery';
import {Swiper, SwiperSlide} from 'swiper/react';
import type {Swiper as SwiperType} from 'swiper';
import 'swiper/css';
import '../styles/app.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import {EffectCards, Navigation} from 'swiper/modules';
import Granties from '~/components/Granties';
import Opinions from '~/components/Opinions';
import {opinions} from '~/models/opinion';
import AnimateOnAppear from '~/components/AnimateOnAppear';
import Products from '~/components/Products';
import type {ProductCardFragment} from 'storefrontapi.generated';
import {FaBox, FaChevronLeft, FaChevronRight, FaList} from 'react-icons/fa';
import ExpandableCard from '~/components/ExpandableCard';
import {Analytics, RichText} from '@shopify/hydrogen';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Reus | ${data?.product.title ?? ''}`}];
};

export async function loader({context, params}: LoaderFunctionArgs) {
  const {storefront} = context;
  const {handle} = params;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_WITH_COLLECTION_QUERY, {
      variables: {
        handle,
      },
    }),
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  return {
    product,
  };
}

const ProductPage = () => {
  const {product} = useLoaderData<typeof loader>();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | any>(
    () => {
      if (product?.variants?.nodes?.length > 0) {
        return product.variants.nodes[0] as ProductVariant;
      }
      return null;
    },
  );
  const swiperRef = useRef<SwiperType | null>(null);

  const handleButtonClick = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    const slideIndex = product?.images?.edges?.findIndex(
      (edge: {node: {url: string}}) => edge.node.url === variant.image?.url,
    );
    if (swiperRef.current && slideIndex !== -1) {
      swiperRef.current.slideTo(slideIndex);
    }
  };

  return (
    <div>
      <div className="container mt-4 md:pt-12" id="starter-set">
        <div className="md:grid md:grid-cols-2 gap-12">
          <div className="md:sticky md:top-20 md:self-start animate-fade-in-up">
            <Swiper
              className="rounded-xl custom-swiper md:mt-12"
              modules={[Navigation, EffectCards]}
              spaceBetween={0}
              slidesPerView={1}
              navigation={{
                nextEl: '.custom-swiper-button-next',
                prevEl: '.custom-swiper-button-prev',
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);

                // Find the variant that matches the current slide's image
                const currentSlideImage =
                  product?.images?.edges[swiper.activeIndex]?.node.url;
                const matchingVariant = product?.variants?.nodes.find(
                  (variant: ProductVariant) =>
                    variant.image?.url === currentSlideImage,
                );

                // Update the selected variant if a match is found
                if (matchingVariant) {
                  setSelectedVariant(matchingVariant);
                }
              }}
            >
              {product?.images?.edges?.map(
                (edge: {node: {id: string; url: string}}, index: number) => (
                  <SwiperSlide key={edge.node.id}>
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={edge.node.url}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ),
              )}
              <div
                className={`custom-swiper-button-prev ${
                  isBeginning ? 'opacity-30' : 'opacity-100'
                }`}
              >
                <FaChevronLeft />
              </div>
              <div
                className={`custom-swiper-button-next ${
                  isEnd ? 'opacity-30' : 'opacity-100'
                }`}
              >
                <FaChevronRight />
              </div>
            </Swiper>
          </div>
          <div className="flex flex-col space-y-2 md:space-y-4 mt-2 md:mt-0">
            <div className="pb-2 border-b-[1px] border-gray-200 animate-fade-in-up-delay-2">
              <h1 className="text-2xl font-semibold">{product?.title}</h1>
            </div>

            <div className="flex flex-col space-y-2 animate-fade-in-up-delay-3">
              <div className="flex items-center space-x-2 text-lg">
                <span>Razem: </span>
                <span className="font-bold">
                  {Number(selectedVariant?.price?.amount).toFixed(2)}zł
                </span>
                {selectedVariant?.compareAtPrice && (
                  <span className="text-gray-500 line-through">
                    {Number(selectedVariant.compareAtPrice.amount).toFixed(2)}zł
                  </span>
                )}
                {product.options[0].name.toLowerCase() === 'ilość' &&
                  selectedVariant && (
                    <span className="text-green-600">
                      {(() => {
                        const baseVariant = product.variants
                          .nodes[0] as ProductVariant;
                        const basePrice = Number(baseVariant.price.amount);
                        const currentPrice = Number(
                          selectedVariant.price.amount,
                        );
                        const quantity = Number(selectedVariant.title);

                        if (quantity > 1) {
                          const pricePerUnit = currentPrice / quantity;
                          const discount =
                            ((basePrice - pricePerUnit) / basePrice) * 100;
                          return `(${discount.toFixed(0)}% zniżki)`;
                        }
                        return null;
                      })()}
                    </span>
                  )}
              </div>
              {product.options[0].name.toLowerCase() === 'ilość' && (
                <div className="text-lg">
                  Cena za sztukę:{' '}
                  {(
                    Number(selectedVariant?.price?.amount) /
                    Number(selectedVariant?.title)
                  ).toFixed(2)}
                  zł
                </div>
              )}
            </div>
            {product.variants?.nodes?.length > 1 && (
              <>
                <div className="font-semibold text-sm animate-fade-in-up-delay-2">
                  {product.options[0].name}
                </div>
                <div className="grid grid-cols-4 gap-2 animate-fade-in-up-delay-2">
                  {product.variants.nodes.map((variant) => (
                    <button
                      key={variant.id}
                      className={`group h-12 relative flex cursor-pointer items-center justify-center rounded-md ${
                        selectedVariant === variant
                          ? 'bg-color-blue text-white'
                          : 'bg-white text-color-text border hover:bg-gray-50'
                      } px-4 py-3 text-sm font-medium uppercase shadow-sm focus:outline-none sm:flex-1 sm:py-6`}
                      onClick={() => handleButtonClick(variant)}
                    >
                      {variant.title}
                    </button>
                  ))}
                </div>
              </>
            )}
            <div className="mt-4" />
            <div className="font-semibold text-sm animate-fade-in-up-delay-4">
              Opis:
            </div>
            <div
              className="mt-2 animate-fade-in-up-delay-4"
              dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
            />
            <div className="pt-4 animate-fade-in-up-delay-5">
              <AddToCartButton
                lines={
                  selectedVariant
                    ? [
                        {
                          merchandiseId: selectedVariant.id,
                          quantity: 1,
                        },
                      ]
                    : []
                }
              />
            </div>
            <div>
              {product?.metafields?.some(
                (metafield) => metafield?.key === 'composition',
              ) && (
                <ExpandableCard
                  className="animate-fade-in-up-delay-4 mt-4"
                  title="Skład"
                  icon={<FaList />}
                >
                  <RichText
                    className="px-2"
                    data={
                      product?.metafields?.find(
                        (metafield) => metafield?.key === 'composition',
                      )?.value ?? ''
                    }
                  />
                </ExpandableCard>
              )}
              {selectedVariant?.metafields?.some(
                (metafield) => metafield?.key === 'package_description',
              ) && (
                <ExpandableCard
                  className="animate-fade-in-up-delay-5 mt-4"
                  title="Zestaw zawiera"
                  icon={<FaBox />}
                >
                  <RichText
                    className="px-2"
                    data={
                      selectedVariant?.metafields?.find(
                        (metafield) => metafield?.key === 'package_description',
                      )?.value ?? ''
                    }
                  />
                </ExpandableCard>
              )}
            </div>
          </div>
        </div>
      </div>
      <Granties />
      <Opinions opinions={opinions} />
      <AnimateOnAppear>
        <div className="text-2xl font-semibold container mt-8">
          Klienci kupili również
        </div>
      </AnimateOnAppear>
      {product.collections?.nodes?.[0] && (
        <Products
          colCount={4}
          products={product.collections.nodes[0].products.edges
            .map((edge: any) => edge.node)
            .filter((node: ProductCardFragment) => node.id !== product.id)}
        />
      )}
      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price?.amount || '0',
              vendor: product.vendor || '',
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </div>
  );
};

export default ProductPage;
