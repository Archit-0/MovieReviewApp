import { Link } from "react-router";
const VideoCard = ({ image, title, date, comments, id }) => {
  return (
    <>
      <div className="flex items-center w-[90%] mt-5">
        <div>
          <Link to={`/movies/${id}`}>
            <img src={image} alt="Card Image" className="h-[3rem]" />
          </Link>
        </div>

        <div className="ml-4">
          <h2 className="text-lg text-white">{title}</h2>
          <p className="text-gray-500 mb-3">{date}</p>
        </div>

        <div className="flex-grow mb-5 flex justify-end items-center">
          <div className="text-white text-lg">{comments}</div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
