import {Autoplay, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const comments = [
  {
    title: 'Polecam',
    content:
      'Jestem mile zaskoczona płynem do kuchni. Bez problemu czyści tłuste plamy po smażeniu obiadu.',
    author: 'Basia',
    rating: '5/5',
  },
  {
    title: 'Sprytne rozwiązanie',
    content:
      'Mam małe mieszkanie i każde miejsce jest dla mnie na wagę złota. Fajnie, że komplet tabletek zajmuje mniej niż pudełko herbaty.',
    author: 'Artur',
    rating: '5/5',
  },
  {
    title: 'Działa',
    content:
      'Jako świeża mama nie wyobrażam sobie czyścić domu duszącymi środkami. Reus to świetna, naturalna alternatywa dla popularnych detergentów.',
    author: 'Marta',
    rating: '5/5',
  },
];

const CommentSection: React.FC = () => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      spaceBetween={16}
      className="mt-2"
      slidesPerView="auto"
      autoplay={{
        delay: 5000,
      }}
      loop={true}
    >
      {comments.map((comment, index) => (
        <SwiperSlide key={index} className="!w-[300px]">
          <div className="bg-gray-100 p-4 rounded-lg h-auto min-h-[220px] flex flex-col">
            <h3 className="font-bold text-lg">{comment.title}</h3>
            <p className="text-sm text-gray-600 mt-2 flex-grow overflow-y-auto">
              {comment.content}
            </p>
            <div className="flex items-center mt-4">
              <div>
                <p className="font-semibold">{comment.author}</p>
                <p className="text-sm text-gray-500">{comment.rating}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CommentSection;
