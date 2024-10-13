import {useLoaderData} from '@remix-run/react';
import type {LoaderFunctionArgs} from '@remix-run/server-runtime';
import {getSelectedProductOptions} from '@shopify/hydrogen';
import type {
  ProductVariant,
  SelectedOption,
} from '@shopify/hydrogen/storefront-api-types';
import type {MetaFunction} from '@shopify/remix-oxygen';
import React, {useRef, useState} from 'react';
import {AddToCartButton} from '~/components/AddToCartButton';
import AnimatedTicker from '~/components/AnimatedTicker';
import {PRODUCT_QUERY} from '~/models/networking/ProductQuery';
import {Swiper, SwiperSlide} from 'swiper/react';
import type {Swiper as SwiperType} from 'swiper';
import 'swiper/css';
import '../styles/app.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';
import {EffectCards, Navigation, Pagination} from 'swiper/modules';
import Granties from '~/components/Granties';
import Opinions from '~/components/Opinions';
import {opinions} from '~/models/opinion';
import AnimateOnAppear from '~/components/AnimateOnAppear';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Reus | ${data?.product.title ?? ''}`}];
};

export async function loader({context, request, params}: LoaderFunctionArgs) {
  const {storefront} = context;
  const {handle} = params;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {
        handle,
        selectedOptions: getSelectedProductOptions(request),
      },
    }),
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  const firstVariant = product.variants.nodes[0];
  const firstVariantIsDefault = Boolean(
    firstVariant.selectedOptions.find(
      (option: SelectedOption) =>
        option.name === 'Title' && option.value === 'Default Title',
    ),
  );

  if (firstVariantIsDefault) {
    product.selectedVariant = firstVariant;
  }

  return {
    product,
  };
}

const ProductPage = () => {
  const {product} = useLoaderData<typeof loader>();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
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
    const slideIndex = product.variants.nodes.findIndex(
      (node: ProductVariant) => node === variant,
    );
    if (swiperRef.current) {
      swiperRef.current.slideTo(slideIndex);
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    const newVariant = product.variants.nodes[
      swiper.activeIndex
    ] as ProductVariant;
    setSelectedVariant(newVariant);
  };

  return (
    <div>
      <div className="container mt-4 md:pt-8" id="starter-set">
        <div className="md:grid md:grid-cols-2 gap-12">
          <div className="md:sticky md:top-20 md:self-start animate-fade-in-up">
            <Swiper
              className="rounded-xl custom-swiper md:mt-12"
              modules={[Navigation, Pagination, EffectCards]}
              spaceBetween={0}
              slidesPerView={1}
              navigation={{
                enabled: true,
              }}
              color={'FFFFFF'}
              pagination={{clickable: true}}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={handleSlideChange}
            >
              {product?.images?.edges?.map((edge: any, index: number) => (
                <SwiperSlide key={edge.node.url}>
                  <img src={edge.node.url} alt={`Slide ${index + 1}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex flex-col space-y-2 md:space-y-4 mt-2 md:mt-0">
            <div className="pb-2 border-b-[1px] border-gray-200 animate-fade-in-up-delay-2">
              <h1 className="text-2xl font-semibold">{product?.title}</h1>
            </div>

            <div className="flex items-center space-x-2 animate-fade-in-up-delay-3 text-lg">
              <span className="font-bold">
                {selectedVariant?.price?.amount}zł
              </span>
              {selectedVariant?.compareAtPrice && (
                <span className="text-gray-500 line-through">
                  {selectedVariant.compareAtPrice.amount} zł
                </span>
              )}
            </div>
            <div className="font-semibold text-sm animate-fade-in-up-delay-2">
              {product.options[0].name}
            </div>
            <div className="grid grid-cols-4 gap-2 animate-fade-in-up-delay-2">
              {product?.variants?.nodes?.map((variant: ProductVariant) => (
                <button
                  key={variant.id}
                  className={`group h-12 relative flex cursor-pointer items-center justify-center rounded-md ${
                    selectedVariant === variant
                      ? 'bg-color-blue text-white'
                      : 'bg-white text-color-text border hover:bg-gray-50'
                  } px-4 py-3 text-sm font-medium uppercase shadow-sm focus:outline-none sm:flex-1 sm:py-6`}
                  onClick={() => handleButtonClick(variant as ProductVariant)}
                >
                  {variant.title}
                </button>
              ))}
            </div>
            <div className="mt-4" />
            <AnimateOnAppear>
              <div className="font-semibold text-sm">Opis:</div>
              <div className="mt-2">{product.description}</div>
            </AnimateOnAppear>
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
          </div>
        </div>
      </div>
      <Granties />
      <Opinions opinions={opinions} />
    </div>
  );
};

export default ProductPage;
