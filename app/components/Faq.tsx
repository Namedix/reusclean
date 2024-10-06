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
      question: 'Czy musze kupić waszą butelkę?',
      answer:
        'Zamiast kupować nowe środki czyszczące w butelkach i wyrzucać je, gdy są puste, dlaczego nie zatrzymać butelki i dodać do nich jedną z naszych saszetek czyszczących? To jeden ze sposobów, w jaki wszyscy możemy zmniejszyć problem tworzyw sztucznych, przed którym stoi obecnie nasz świat. Jeśli potrzebujesz butelek, możemy dostarczyć butelki wykonane z plastiku pochodzącego z recyklingu, które możesz przechowywać i napełniać zamiast wyrzucać.',
      userAvatar: './app/assets/Avatar.png',
      botAvatar: './app/assets/Avatar4.png',
    },
    {
      question: 'Czy produkty lub opakowania reus wykorzystują plastik?',
      answer:
        'Nasze kapsułki i opakowania są ekologiczne, nie używamy plastiku, a ty możesz ponownie używać swoich butelek, co pomaga zmniejszyć odpady plastikowe.',
      userAvatar: './app/assets/Avatar2.png',
      botAvatar: './app/assets/Avatar4.png',
    },
    {
      question: 'Jakiego rodzaju butelki potrzebuję?',
      answer:
        'Butelka o pojemności do 750 ml z dołączonym dozownikiem z atomizerem będzie odpowiednia. Możesz również użyć mniejszej butelki o pojemności 300 ml, jeśli chcesz bardziej skoncentrowanego roztworu. Nasze opakowanie sugeruje użycie butelki o pojemności 500 ml, aby ułatwić, ale możesz śmiało eksperymentować.',
      userAvatar: './app/assets/Avatar.png',
      botAvatar: './app/assets/Avatar4.png',
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
