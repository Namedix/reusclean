import {useLoaderData} from '@remix-run/react';
import type {LoaderFunctionArgs} from '@remix-run/server-runtime';
import {getSelectedProductOptions} from '@shopify/hydrogen';
import type {
  ProductVariant,
  SelectedOption,
} from '@shopify/hydrogen/storefront-api-types';
import type {MetaFunction} from '@shopify/remix-oxygen';
import React, {useRef} from 'react';
import {FaShieldAlt, FaList, FaTruck} from 'react-icons/fa';
import {AddToCartButton} from '~/components/AddToCartButton';
import AnimatedPaymentMethods from '~/components/AnimatedPaymentMethods';
import AnimatedTicker from '~/components/AnimatedTicker';
import CheckmarkText from '~/components/CheckmarkText';
import CommentSection from '~/components/CommentSection';
import ExpandableCard from '~/components/ExpandableCard';
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

export const meta: MetaFunction = () => {
  return [{title: 'Reus | Zestaw startowy'}];
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
  const swiperRef = useRef<SwiperType | null>(null);

  const handleButtonClick = (variant: ProductVariant) => {
    // setSelectedVariant(variant);
    const slideIndex = product.variants.nodes.findIndex(
      (node) => node === variant,
    );
    if (swiperRef.current) {
      swiperRef.current.slideTo(slideIndex);
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    const newVariant = product.variants.nodes[swiper.activeIndex];
    // setSelectedVariant(newVariant);
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
              {product?.images?.edges?.map((edge, index) => (
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

            <div className="flex items-center space-x-2 animate-fade-in-up-delay-3">
              <span className="font-bold">
                {product?.selectedVariant?.price.amount}zł
              </span>
              <span className="text-gray-500 line-through">
                {product?.selectedVariant?.compareAtPrice?.amount} zł
              </span>
              <AnimatedTicker />
            </div>
            <div className="mt-2" />
            <div className="grid grid-cols-4 gap-2 animate-fade-in-up-delay-2">
              {product?.variants?.nodes?.map((variant) => (
                <button
                  key={variant.id}
                  // className={getButtonStyle(variant)}
                  // onClick={() => handleButtonClick(variant)}
                >
                  {variant.title}
                </button>
              ))}
            </div>
            <div className="mt-4" />

            <div className="mt-8 space-y-4">
              <CheckmarkText
                className="animate-fade-in-up-delay-4"
                text={`Brak jednorazowego plastiku gdy re-używasz!`}
              />
              <CheckmarkText
                className="animate-fade-in-up-delay-4.5"
                text={`Działa! Sprawdziliśmy to z największymi konkurentami.`}
              />
              <CheckmarkText
                className="animate-fade-in-up-delay-5"
                text={`Nasze produkty powstają ze składników roślinnych.`}
              />
            </div>
            <div className="pt-4 animate-fade-in-up-delay-5">
              <AddToCartButton
                lines={
                  product?.selectedVariant
                    ? [
                        {
                          merchandiseId: product?.selectedVariant.id,
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
