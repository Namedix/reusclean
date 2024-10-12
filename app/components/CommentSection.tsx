import {Autoplay, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const comments = [
  {
    title: 'Warto',
    content:
      'Naprawdę to działa. Długo nie mogłam uwierzyć, ale w końcu zobaczyłam reklamę na youtubie i się skusiłam. Nie żałuję',
    author: 'Basia',
    location: 'Katowice',
    rating: '5/5',
    avatarSrc: './assets/Avatar.png',
  },
  {
    title: 'Super',
    content:
      'Zamówiłem tylko uniwersalny. Żałuję, bo lepiej cenowo wychodzi zestaw z 3 butelkami. Wezmę następnym razem. Czysty zysk!',
    author: 'Artur',
    location: 'Gdańsk',
    rating: '4.5/5',
    avatarSrc: './assets/Avatar2.png',
  },
  {
    title: 'Polecam',
    content:
      'Używam od miesiąca i jestem bardzo zadowolona. Efekty widoczne od razu, a butelka wystarcza na długo.',
    author: 'Marta',
    location: 'Kraków',
    rating: '5/5',
    avatarSrc: './assets/Avatar3.png',
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
              <img
                src={comment.avatarSrc}
                alt={comment.author}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-semibold">{comment.author}</p>
                <p className="text-sm text-gray-500">
                  {comment.location} {comment.rating}
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CommentSection;
