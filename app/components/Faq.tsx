import AnimateOnAppear from './AnimateOnAppear';

interface FaqItem {
  question: string;
  answer: string;
  userAvatar: string;
  botAvatar: string;
}

const FaqItem: React.FC<FaqItem & {index: number}> = ({
  question,
  answer,
  userAvatar,
  botAvatar,
}) => {
  return (
    <AnimateOnAppear>
      <div className="mb-8">
        <div className={`transition-all duration-500 ease-out`}>
          <div className="flex items-start mb-4">
            <img
              src={userAvatar}
              alt="User"
              className="w-8 h-8 rounded-full mr-3"
            />
            <div className="bg-gray-200 rounded-lg p-3 max-w-[430px]">
              <p>{question}</p>
            </div>
          </div>
          <div className="flex items-start justify-end">
            <div className="bg-color-blue text-white rounded-lg p-3 max-w-[430px]">
              <p>{answer}</p>
            </div>
            <img
              src={botAvatar}
              alt="Bot"
              className="w-8 h-8 rounded-full ml-3"
            />
          </div>
        </div>
      </div>
    </AnimateOnAppear>
  );
};

const Faq: React.FC = () => {
  const faqItems: FaqItem[] = [
    {
      question: 'Czy tabletki Reus są skuteczne w czyszczeniu?',
      answer:
        'Tak! Nasze tabletki zostały zaprojektowane, aby zapewniać efektywne czyszczenie bez szkodliwych chemikaliów. Nadają się do codziennego sprzątania kuchni, łazienki, szyb i wielu innych powierzchni.',
      userAvatar: './assets/Avatar4.png',
      botAvatar: './assets/Avatar2.png',
    },
    {
      question: 'Czy butelka Reus jest wielokrotnego użytku?',
      answer:
        'Tak! Nasza butelka została zaprojektowana tak, abyś mógł używać jej wielokrotnie. Po rozpuszczeniu tabletki możesz napełniać butelkę i używać jej do różnych środków czystości dzięki dołączonym naklejkom (uniwersalny, łazienka, kuchnia, szyby), które pomagają oznaczyć zawartość.',
      userAvatar: './assets/Avatar3.png',
      botAvatar: './assets/Avatar2.png',
    },
    {
      question: 'Na jak długo starcza płyn Reus?',
      answer:
        'Jedna tabletka Reus rozpuszczona w 500 ml wody starcza na tyle samo co popularne środki czystości i zależy od intensywności użytkowania.',
      userAvatar: './assets/Avatar1.png',
      botAvatar: './assets/Avatar2.png',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl mt-10">
      {faqItems.map((item, index) => (
        <FaqItem index={index} {...item} key={index} />
      ))}
    </div>
  );
};

export default Faq;
