interface Opinion {
  image?: string;
  title?: string;
  description: string;
  profile: {
    imageUrl: string;
    name: string;
    city: string;
  };
  rate: number;
}

export const opinions: Opinion[] = [
  {
    image: './public/assets/bathroom.jpeg',
    description:
      'Zdecydowanie na plus, tylko nie wiem czy można używać do podłogi',
    profile: {
      imageUrl: './public/assets/Avatar.png',
      name: 'Jan Kowalski',
      city: 'Warsaw',
    },
    rate: 5,
  },
  {
    description:
      'Mega! Uzywam już ponad 2 miesiące, głownie w kuchi i jestem zadolona. Polecam Wam',
    profile: {
      imageUrl: './public/assets/Avatar.png',
      name: 'Jan Kowalski',
      city: 'Warsaw',
    },
    rate: 5,
  },
  {
    title: 'Mega zapach',
    description:
      'Nowe formulacje są super. Ładniej pachną i lepiej czyszczą. No i się nie grudkują jak poprzednie wąskie saszetki. Brawo i już zupełnie mnie do siebie przekonaliście',
    profile: {
      imageUrl: './public/assets/Avatar.png',
      name: 'Jan Kowalski',
      city: 'Warsaw',
    },
    rate: 5,
  },
  {
    description:
      'Używam uniwersalnego głównie do sprzątania kuchni i spisuje się bardzo dobrze. Nawet kilka razy użyłam do umycia naczyń i też zadziałało.',
    profile: {
      imageUrl: './public/assets/Avatar.png',
      name: 'Jan Kowalski',
      city: 'Warsaw',
    },
    rate: 5,
  },
  {
    title: 'Prawie idealne',
    description:
      'Już trochę ich używam i wszystko jest super, ale jednak na jakiś wielki kamień lub mega zabrudzenia to pewniej sie czuje uzywając ciffa, ale na codzien używam reus-a. Ładnie pachną i polecam koleżankom.',
    profile: {
      imageUrl: './public/assets/Avatar.png',
      name: 'Jan Kowalski',
      city: 'Warsaw',
    },
    rate: 5,
  },
  {
    title: 'Zadowolony klient',
    description:
      'Tych refilli schodzi mi najwięcej. Używam do sprzątania blatów, stołów, kurzy w mieszkaniu. Ładnie pachnie.',
    profile: {
      imageUrl: './public/assets/Avatar.png',
      name: 'Jan Kowalski',
      city: 'Warsaw',
    },
    rate: 5,
  },
  {
    description:
      'Muszę wszystkim polecić. To jest moje małe odkrycie tego roku. Już od dawna nie używam plastikowych butelek do picia, teraz zrezygnowałam z plastikowych środków do sprzątania. Podoba mi się i można dbać o środowisko bez płacenia więcej. Refille z kodem kosztują poniżej 5zł, a nie jak inne eko płyny po 10-15zł',
    profile: {
      imageUrl: './public/assets/Avatar.png',
      name: 'Jan Kowalski',
      city: 'Warsaw',
    },
    rate: 5,
  },
  {
    image: './public/assets/bathroom.jpeg',
    description:
      'Mega! Uzywam już ponad 2 miesiące, głownie w kuchi i jestem zadolona. Polecam Wam',
    profile: {
      imageUrl: './public/assets/Avatar.png',
      name: 'Jan Kowalski',
      city: 'Warsaw',
    },
    rate: 5,
  },
  {
    title: 'Bardzo fajny koncept',
    description:
      'bardzo fajnioe czyści. delikatna piana, nie kleją się później powierzchnie. polecam',
    profile: {
      imageUrl: './public/assets/Avatar.png',
      name: 'Jan Kowalski',
      city: 'Warsaw',
    },
    rate: 5,
  },
];
