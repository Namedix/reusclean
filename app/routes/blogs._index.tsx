import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Link, useLoaderData, type MetaFunction} from '@remix-run/react';
import {Image, getPaginationVariables} from '@shopify/hydrogen';
import type {ArticleItemFragment} from 'storefrontapi.generated';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';

export const meta: MetaFunction<typeof loader> = () => {
  return [{title: `Reus | Blog`}];
};

export async function loader(args: LoaderFunctionArgs) {
  const criticalData = await loadCriticalData(args);

  return defer(criticalData);
}

async function loadCriticalData({context, request}: LoaderFunctionArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 9,
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

export default function Blog() {
  const {blog} = useLoaderData<typeof loader>();
  const {articles} = blog;

  return (
    <div className="bg-white mt-24 animate-fade-in-up">
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
  );
}

export function BlogItem({
  article,
  loading,
}: {
  article: ArticleItemFragment;
  loading?: HTMLImageElement['loading'];
}) {
  return (
    <article className="flex max-w-xl flex-col items-start justify-between">
      <Image
        alt={article.image?.altText ?? article.title}
        aspectRatio="3/2"
        data={article.image ?? undefined}
        loading={loading}
        sizes="(min-width: 768px) 50vw, 100vw"
        className="rounded-lg"
      />
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <a href={`/blogs/${article.blog.handle}/${article.handle}`}>
            <span className="absolute inset-0"></span>
            {article.title}
          </a>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {article.contentHtml.replace(/<[^>]*>/g, '').slice(0, 150)}...
        </p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <img
          src="../assets/Avatar4.png"
          alt=""
          className="h-10 w-10 rounded-full bg-gray-50"
        />
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <a href="#blog">
              <span className="absolute inset-0"></span>
              {article.author?.name}
            </a>
          </p>
          <p className="text-gray-600">Co-Founder</p>
        </div>
      </div>
    </article>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog
export const BLOGS_QUERY = `#graphql
  query Blog(
    $language: LanguageCode
    $blogHandle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      title
      seo {
        title
        description
      }
      articles(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ArticleItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          hasNextPage
          endCursor
          startCursor
        }

      }
    }
  }
  fragment ArticleItem on Article {
    author: authorV2 {
      name
    }
    contentHtml
    handle
    id
    image {
      id
      altText
      url
      width
      height
    }
    publishedAt
    title
    blog {
      handle
    }
  }
` as const;
