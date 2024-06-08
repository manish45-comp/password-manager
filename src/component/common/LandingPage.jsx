import video from "../../assets/images/Data_Loss_Prevention.mp4";
import { Link } from "react-router-dom";
const LandingPage = () => {
  //   const [video, setVideo] = useState("");
  return (
    <div className="h-full overflow-hidden flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="video">
          <video
            className="z-20 opacity-15 rounded-full"
            autoPlay
            loop
            muted
            width="500px"
            height="500px"
            src={video}
          />
        </div>
        <p className="text-6xl text-center w-4/5 font-bold">
          Because <span className="text-purple-700">&#39;Password123&#39;</span>{" "}
          Just Won&#39;t Cut It!
        </p>
        <p className="mt-3 text-gray-500">
          Advanced Protection for Your Online Identity. Guard Your Digital World
          with Confidence.
        </p>
        <div className="button mt-4">
          <Link to="all">
            <button className="button-inside px-2">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
