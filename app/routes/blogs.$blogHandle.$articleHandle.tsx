import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData, type MetaFunction} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Hydrogen | ${data?.article.title ?? ''} article`}];
};

export async function loader(args: LoaderFunctionArgs) {
  const criticalData = await loadCriticalData(args);

  return defer(criticalData);
}

async function loadCriticalData({context, params}: LoaderFunctionArgs) {
  const {blogHandle, articleHandle} = params;

  if (!articleHandle || !blogHandle) {
    throw new Response('Not found', {status: 404});
  }

  const [{blog}] = await Promise.all([
    context.storefront.query(ARTICLE_QUERY, {
      variables: {blogHandle, articleHandle},
    }),
  ]);

  if (!blog?.articleByHandle) {
    throw new Response(null, {status: 404});
  }

  const article = blog.articleByHandle;

  return {article};
}

export default function Article() {
  const {article} = useLoaderData<typeof loader>();
  const {title, image, contentHtml, author} = article;

  const publishedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt));

  return (
    <main className="container pb-16 mt-24 lg:pb-12 bg-white antialiased animate-fade-in-up">
      <div className="flex justify-between px-4 mx-auto ">
        <article className="mx-auto w-full format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
          <header className="mb-4 lg:mb-6 not-format">
            <address className="flex items-center mb-6 not-italic">
              <div className="inline-flex items-center mr-3 text-sm text-color-text">
                {author && author.name && (
                  <>
                    <img
                      className="mr-4 w-16 h-16 rounded-full"
                      src="../../assets/Avatar4.png"
                      alt={author.name}
                    />
                    <div>
                      <a
                        href="#blog"
                        rel="author"
                        className="text-xl font-bold text-color-text"
                      >
                        {author.name}
                      </a>
                      <p className="text-base text-gray-500 dark:text-gray-400">
                        <time
                          dateTime={article.publishedAt}
                          title={publishedDate}
                        >
                          {publishedDate}
                        </time>
                      </p>
                    </div>
                  </>
                )}
              </div>
            </address>
            <h1 className="mb-4 text-3xl font-extrabold leading-tight text-color-text lg:mb-6 lg:text-4xl ">
              {title}
            </h1>
          </header>
          {image && (
            <figure>
              <Image
                data={image}
                className="w-full rounded-lg"
                sizes="(min-width: 1024px) 900px, 100vw"
              />
              {image.altText && <figcaption>{image.altText}</figcaption>}
            </figure>
          )}
          <div
            className="mt-8"
            dangerouslySetInnerHTML={{__html: contentHtml}}
          />
        </article>
      </div>
    </main>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog#field-blog-articlebyhandle
export const ARTICLE_QUERY = `#graphql
  query Article(
    $articleHandle: String!
    $blogHandle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
    }
  }
` as const;
