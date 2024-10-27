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
    <section className="container animate-fade-in-up mt-28 md:mt-36">
      <div className="mx-auto mb-16">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="md:w-3/5">
            <h2 className="text-color-blue text-xl mb-4">Nasza Misja</h2>

            <h3 className="text-3xl font-bold mb-4">
              Wyrzucamy plastik, ale on nie znika.
            </h3>
            <p className="mb-4">
              Czy wiesz, że przeciętny Europejczyk wyprodukuje w ciągu swojego
              życia 2,5 tony plastiku i zużyje 276 jednorazowych butelek od
              środków czystości? Dzięki butelkom wielokrotnego użytku Reus te
              statystyki mogą ulec zmianie! Mniej plastiku to mniej emisji
              dwutlenku węgla do atmosfery.
            </p>
            <p className="mb-4">
              Naszą misją jest tworzenie jakościowych produktów codziennej
              potrzeby w nowej, ekologicznej odsłonie. Wierzymy, że istnieje
              lepszy sposób na zakup środków czyszczących.
            </p>
            <p>
              Chcemy edukować ludzi, aby podejmowali świadome decyzje w zgodzie
              z naturą. W końcu podróż plastikowej butelki trwa dłużej niż
              nasza. Wybierz mądrze.
            </p>
          </div>
          <div className="w-full md:w-2/5">
            <img
              src="/assets/naturegif.gif"
              alt="Young plant sprouting"
              className="rounded-lg w-full"
            />
          </div>
        </div>
      </div>

      {/* New Products Section */}
      <div className="mx-auto max-w-7xl mb-16 mt-16">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="md:w-2/5 md:block hidden">
            <img
              src="/assets/etykieta.gif" // Make sure to add this image to your assets
              alt="Reus product"
              className="rounded-lg w-full"
            />
          </div>
          <div className="md:w-3/5">
            <h2 className="text-color-blue text-xl mb-4">Nasze Produkty</h2>
            <h3 className="text-3xl font-bold mb-4">
              W Reus mniej znaczy więcej.
            </h3>
            <p className="mb-4">
              Nasza butelka wielokrotnego użytku ma uniwersalne zastosowanie. To
              ty decydujesz jaki środek do czystości chcesz użyć.
            </p>
            <p className="mb-4">
              Tabletki do sprzątania Reus to najlepszy zamiennik znanych środków
              czystości
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Roślinne składniki są w 100% biodegradowalne</li>
              <li>
                Naturalne olejki eteryczne zapewniają delikatny, odświeżający
                zapach
              </li>
              <li>
                Związki z olejów kokosowych i tensydów cukrowych będące
                surfaktantami pochodzenia organicznego pełnią funkcję składników
                pieniących i czyszczących
              </li>
              <li>Roślinna gliceryna dba o ochronę skóry twoich dłoni</li>
              <li>
                Fitochelatyny są naturalnym konserwantem, a dodatkowo zmiękczają
                wodę z kranu by nie pozostawiać smug
              </li>
            </ul>
          </div>
          <div className="md:w-2/5 md:hidden block">
            <img
              src="/assets/etykieta.gif" // Make sure to add this image to your assets
              alt="Reus product"
              className="rounded-lg w-full"
            />
          </div>
        </div>
      </div>

      {/* Existing Instagram Section */}
      <div className="pt-4 md:pb-16">
        <div className="mx-auto">
          <div className="mx-auto text-center">
            <h2 className="text-color-blue text-xl mb-4">
              Zmieniajmy Świat Razem
            </h2>
            <h2 className="text-3xl font-bold tracking-tight text-color-text sm:text-4xl mb-8">
              Obserwuj nas na Instagramie i Tiktoku
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <a
                key={num}
                href="https://www.instagram.com/reusclean/"
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
              >
                <img
                  src={`/assets/instagram${num}.png`}
                  alt={`Instagram post ${num}`}
                  className="w-full h-full object-cover"
                />
              </a>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://www.instagram.com/reusclean/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-color-blue hover:underline"
            >
              Zobacz więcej na Instagramie
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
