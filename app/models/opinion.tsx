interface Opinion {
  image?: string;
  title?: string;
  description: string;
  profile: {
    imageUrl: string;
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
      imageUrl: '../assets/Avatar2.png',
      name: 'Kasia',
    },
    rate: 5,
  },
  {
    description:
      'Na początku byłam sceptyczna, ale miło się zaskoczyłam. Te środki czystości działają tak samo dobrze, jak tradycyjne produkty, ale zyskujesz coś więcej – spokój, że nie szkodzisz planecie. Zdecydowanie polecam każdemu, kto chce wprowadzić do swojego domu zrównoważone rozwiązania.',
    profile: {
      imageUrl: '../assets/Avatar2.png',
      name: 'Paulina',
    },
    rate: 5,
  },
  {
    title: 'Świetny wybór dla naszej rodziny!',
    description:
      'Od kiedy zaczęliśmy używać tabletek czyszczących od Reus, mamy pewność, że nasz dom jest czysty, a jednocześnie bezpieczny dla naszych dzieci i zwierząt. Uwielbiam fakt, że mają naturalny skład i nie zawierają szkodliwych substancji chemicznych.',
    profile: {
      imageUrl: '../assets/Avatar4.png',
      name: 'Piotr z Rodziną',
    },
    rate: 5,
  },
  {
    title: 'Super pomysł z butelką',
    description:
      'Butelka sprawia wrażenie solidnej i wytrzymałej, jakby miała posłużyć przez wiele lat. Cieszę się, że nie muszę już kupować mnóstwa detergentów i wyrzucać ich opakowań po krótkim czasie. Podoba mi się także pomysł uniwersalnego designu – po wykorzystaniu płynu do łazienki rozpuściłam tabletkę do kuchni, i gotowe! 😀',
    profile: {
      imageUrl: '../assets/Avatar3.png',
      name: 'Alicja',
    },
    rate: 5,
  },
  {
    description:
      'Używam uniwersalnego głównie do sprzątania kuchni i spisuje się bardzo dobrze. Nawet kilka razy użyłam do umycia naczyń i też zadziałało.',
    profile: {
      imageUrl: '../assets/Avatar3.png',
      name: 'Alicja',
    },
    rate: 5,
  },
  {
    title: 'Zadowolony klient',
    description:
      'Tych refilli schodzi mi najwięcej. Używam do sprzątania blatów, stołów, kurzy w mieszkaniu. Ładnie pachnie.',
    profile: {
      imageUrl: '../assets/Avatar.png',
      name: 'Jan Kowalski',
    },
    rate: 5,
  },
  {
    description:
      'Muszę wszystkim polecić. To jest moje małe odkrycie tego roku. Już od dawna nie używam plastikowych butelek do picia, teraz zrezygnowałam z plastikowych środków do sprzątania. Podoba mi się i można dbać o środowisko bez płacenia więcej. Refille z kodem kosztują poniżej 5zł, a nie jak inne eko płyny po 10-15zł',
    profile: {
      imageUrl: '../assets/Avatar.png',
      name: 'Jan Kowalski',
    },
    rate: 5,
  },
  {
    image: '../assets/productOpinion2.png',
    description:
      'Mega! Uzywam już ponad 2 miesiące, głownie w kuchi i jestem zadolona. Polecam Wam',
    profile: {
      imageUrl: '../assets/Avatar.png',
      name: 'Jan Kowalski',
    },
    rate: 5,
  },
  {
    title: 'Bardzo fajny koncept',
    description:
      'bardzo fajnioe czyści. delikatna piana, nie kleją się później powierzchnie. polecam',
    profile: {
      imageUrl: '../assets/Avatar.png',
      name: 'Jan Kowalski',
    },
    rate: 5,
  },
];
