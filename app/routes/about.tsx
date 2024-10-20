import type {LoaderFunctionArgs, MetaFunction} from '@shopify/remix-oxygen';
import {ARTICLE_QUERY} from './blogs.$blogHandle.$articleHandle';
import {Link, useLoaderData} from '@remix-run/react';
import {BlogItem, BLOGS_QUERY} from './blogs._index';
import {getPaginationVariables} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';

export const meta: MetaFunction<typeof loader> = () => {
  return [{title: `Reus | O nas`}];
};

export async function loader(args: LoaderFunctionArgs) {
  const {context, request} = args;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 3,
  });
  const [{blog}] = await Promise.all([
    context.storefront.query(BLOGS_QUERY, {
      variables: {
        blogHandle: 'aktualnosci',
        ...paginationVariables,
      },
    }),
  ]);

  if (!blog?.articles) {
    throw new Response('Not found', {status: 404});
  }

  return {blog};
}

export default function About() {
  const {blog} = useLoaderData<typeof loader>();
  const {articles} = blog;

  return (
    <section className="container animate-fade-in-up mt-4">
      <div className="gap-16 items-center py-8 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-color-textLight sm:text-lg">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-color-text">
            We didnt reinvent the wheel
          </h2>
          <p className="mb-4">
            We are strategists, designers and developers. Innovators and problem
            solvers. Small enough to be simple and quick, but big enough to
            deliver the scope you want at the pace you need. Small enough to be
            simple and quick, but big enough to deliver the scope you want at
            the pace you need.
          </p>
          <p>
            We are strategists, designers and developers. Innovators and problem
            solvers. Small enough to be simple and quick.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <img
            className="w-full rounded-lg"
            src="/assets/kitchen.jpeg"
            alt="office content 1"
          />
          <img
            className="mt-4 w-full lg:mt-10 rounded-lg"
            src="/assets/bathroom.jpeg"
            alt="office content 2"
          />
        </div>
      </div>
      <div className="bg-white py-12 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-color-textLight">
                Transactions every 24 hours
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-color-text sm:text-5xl">
                44 million
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-color-textLight">
                Assets under holding
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-color-text sm:text-5xl">
                $119 trillion
              </dd>
            </div>
            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base leading-7 text-color-textLight">
                New users annually
              </dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-color-text sm:text-5xl">
                46,000
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="relative isolate overflow-hiddenpx-6 py-12 sm:py-32 lg:overflow-visible lg:px-0">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <svg
            className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                width="200"
                height="200"
                x="50%"
                y="-1"
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <svg x="50%" y="-1" className="overflow-visible fill-gray-50">
              <path
                d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                strokeWidth="0"
              />
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth="0"
              fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
            />
          </svg>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="lg:max-w-lg">
                <p className="text-base font-semibold leading-7 text-color-blue">
                  Deploy faster
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-color-text sm:text-4xl">
                  A better workflow
                </h1>
                <p className="mt-6 text-xl leading-8 text-color-textLight">
                  Aliquet nec orci mattis amet quisque ullamcorper neque, nibh
                  sem. At arcu, sit dui mi, nibh dui, diam eget aliquam. Quisque
                  id at vitae feugiat egestas.
                </p>
              </div>
            </div>
          </div>
          <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
            <img
              className="w-[32rem] h-[32rem] aspect-square max-w-none rounded-xl bg-color-text shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              src="/assets/allProducts.jpeg"
              alt=""
            />
          </div>
          <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:pr-4">
              <div className="max-w-xl text-base leading-7 text-color-textLight lg:max-w-lg">
                <p>
                  Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget
                  risus enim. Mattis mauris semper sed amet vitae sed turpis id.
                  Id dolor praesent donec est. Odio penatibus risus viverra
                  tellus varius sit neque erat velit. Faucibus commodo massa
                  rhoncus, volutpat. Dignissim sed eget risus enim. Mattis
                  mauris semper sed amet vitae sed turpis id.
                </p>
                <ul className="mt-8 space-y-8 text-gray-600">
                  <li className="flex gap-x-3">
                    <svg
                      className="mt-1 h-5 w-5 flex-none text-color-blue"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765 4.5 4.5 0 0 1 8.302-3.046 3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.975 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.975-2.1v4.59Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      <strong className="font-semibold text-color-text">
                        Push to deploy.
                      </strong>{' '}
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Maiores impedit perferendis suscipit eaque, iste dolor
                      cupiditate blanditiis ratione.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      className="mt-1 h-5 w-5 flex-none text-color-blue"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      <strong className="font-semibold text-gray-900">
                        SSL certificates.
                      </strong>{' '}
                      Anim aute id magna aliqua ad ad non deserunt sunt. Qui
                      irure qui lorem cupidatat commodo.
                    </span>
                  </li>
                  <li className="flex gap-x-3">
                    <svg
                      className="mt-1 h-5 w-5 flex-none text-color-blue"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path d="M4.632 3.533A2 2 0 0 1 6.577 2h6.846a2 2 0 0 1 1.945 1.533l1.976 8.234A3.489 3.489 0 0 0 16 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234Z" />
                      <path
                        fillRule="evenodd"
                        d="M4 13a2 2 0 1 0 0 4h12a2 2 0 1 0 0-4H4Zm11.24 2a.75.75 0 0 1 .75-.75H16a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-.75.75h-.01a.75.75 0 0 1-.75-.75V15Zm-2.25-.75a.75.75 0 0 0-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 0 0 .75-.75V15a.75.75 0 0 0-.75-.75h-.01Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      <strong className="font-semibold text-color-text">
                        Database backups.
                      </strong>{' '}
                      Ac tincidunt sapien vehicula erat auctor pellentesque
                      rhoncus. Et magna sit morbi lobortis.
                    </span>
                  </li>
                </ul>
                <p className="mt-8">
                  Et vitae blandit facilisi magna lacus commodo. Vitae sapien
                  duis odio id et. Id blandit molestie auctor fermentum
                  dignissim. Lacus diam tincidunt ac cursus in vel. Mauris
                  varius vulputate et ultrices hac adipiscing egestas. Iaculis
                  convallis ac tempor et ut. Ac lorem vel integer orci.
                </p>
                <h2 className="mt-16 text-2xl font-bold tracking-tight text-color-text">
                  No server? No problem.
                </h2>
                <p className="mt-6">
                  Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam
                  consequat in. Convallis arcu ipsum urna nibh. Pharetra,
                  euismod vitae interdum mauris enim, consequat vulputate nibh.
                  Maecenas pellentesque id sed tellus mauris, ultrices mauris.
                  Tincidunt enim cursus ridiculus mi. Pellentesque nam sed
                  nullam sed diam turpis ipsum eu a sed convallis diam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white mt-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Z naszego bloga
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Dowiedz się, jak rozwijać swój biznes dzięki naszym eksperckim
              poradom.
            </p>
          </div>
          <div className="mx-auto mt-4 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-4 sm:pt-4 lg:mx-0 lg:max-w-none md:grid-cols-3">
            <PaginatedResourceSection
              connection={articles}
              className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16"
            >
              {({node: article}) => (
                <div className="col-span-1">
                  <Link
                    to={`/blogs/${article.blog.handle}/${article.handle}`}
                    className="hover:underline"
                  >
                    <BlogItem article={article} />
                  </Link>
                </div>
              )}
            </PaginatedResourceSection>
          </div>
        </div>
      </div>
    </section>
  );
}
