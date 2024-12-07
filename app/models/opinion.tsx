interface Opinion {
  image?: string;
  title?: string;
  description: string;
  profile: {
    name: string;
  };
  rate: number;
}

export const opinions: Opinion[] = [
  {
    image: '../assets/productOpinion1.jpg',
    description:
      'Ekologiczne środki czystości zaskoczyły mnie swoją skutecznością. Zapach zielonej herbaty jest baaardzo delikatny, a świadomość, że nie używam jednorazowego plastiku, jest dla mnie dodatkowym plusem. Na pewno zostanę stałą klientką!',
    profile: {
      name: 'Kasia',
    },
    rate: 4.5,
  },
  {
    description:
      'Na początku byłam sceptyczna, ale miło się zaskoczyłam. Te środki czystości działają tak samo dobrze, jak tradycyjne produkty, ale zyskujesz coś więcej – spokój, że nie szkodzisz planecie. Zdecydowanie polecam każdemu, kto chce wprowadzić do swojego domu zrównoważone rozwiązania.',
    profile: {
      name: 'Paulina',
    },
    rate: 5,
  },
  {
    title: 'Świetny wybór dla naszej rodziny!',
    description:
      'Od kiedy zaczęliśmy używać tabletek czyszczących od Reus, mamy pewność, że nasz dom jest czysty, a jednocześnie bezpieczny dla naszych dzieci i zwierząt. Uwielbiam fakt, że mają naturalny skład i nie zawierają szkodliwych substancji chemicznych.',
    profile: {
      name: 'Piotr z Rodziną',
    },
    rate: 5,
  },
  {
    title: 'Super pomysł z butelką',
    description:
      'Butelka sprawia wrażenie solidnej i wytrzymałej, jakby miała posłużyć przez wiele lat. Cieszę się, że nie muszę już kupować mnóstwa detergentów i wyrzucać ich opakowań po krótkim czasie. Podoba mi się także pomysł uniwersalnego designu – po wykorzystaniu płynu do łazienki rozpuściłam tabletkę do kuchni, i gotowe! 😀',
    profile: {
      name: 'Alicja',
    },
    rate: 5,
  },
  {
    description:
      'Świetny, ekologiczny produkt, który działa skutecznie i jest w normalnej cenie. Czego chcieć więcej?',
    profile: {
      name: 'Filo',
    },
    rate: 5,
  },
  {
    title: 'Czyści NAPRAWDĘ DOBRZE',
    description:
      'Czyści NAPRAWDĘ DOBRZE. Mogę potwierdzić, że zapach zielonej herbaty jest na prawdę delikatny, a sam produkt czyści NAPRAWDĘ dobrze. Dzisiaj umyłam okna, podłogi i blaty - efekty były 👌 Jak miło nie wdychać chemikaliów podczas sprzątania 😅',
    profile: {
      name: 'Marta',
    },
    rate: 5,
  },
  {
    description:
      'Sprzątam nimi cały dom. Wanna, umywalki, prysznic, blaty, kurze, szyby… nadają i sprawdzają się w każdej potrzebie. Super pomysł, żeby skoncentrować to w rozpuszczalnej tabletce. Będę kupować regularnie.',
    profile: {
      name: 'Tomasz',
    },
    rate: 4,
  },
  {
    image: '../assets/productOpinion2.png',
    description:
      'W końcu nie muszę dźwigać hektolitrów płynów czyszczących ze sklepu. Zamawiam i kurier dostarcza mi paczkę pod same drzwi <3',
    profile: {
      name: 'Agnieszka',
    },
    rate: 5,
  },
  {
    title: 'Normalna cena',
    description:
      'Cieszę się, że w końcu ktoś zaproponował racjonalną cenę za rozwiązanie w postaci refili. Z kodem promocyjnym wyszło mnie taniej niż w 🐞',
    profile: {
      name: 'Michał',
    },
    rate: 5,
  },
];
