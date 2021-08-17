import Testimonials from "./Testimonials/Testimonials";

import beforeArrow from "./Testimonials/svg/icon-prev.svg";
import nextArrow from "./Testimonials/svg/icon-next.svg";

import tanyaImage from "./Testimonials/images/image-tanya.jpg";
import johnImage from "./Testimonials/images/image-john.jpg";

const arrows = [beforeArrow, nextArrow];

const testimonials = [
  {
    userName: "Tanya Sinclair",
    userImage: tanyaImage,
    userRoll: "UX Engineer",
    userComment: " “ I’ve been interested in coding for a while but never taken the jump, until now.   I couldn’t recommend this course enough. I’m now in the job of my dreams and so  excited about the future.”",
  },
  {
    userName: "John Tarkpor",
    userImage: johnImage,
    userRoll: "Junior Front-end Developer",
    userComment: "  “ If you want to lay the best foundation possible I’d recommend taking this course.  The depth the instructors go into is incredible. I now feel so confident about   starting up as a professional developer. ”",
  },
];

function App() {
  return <Testimonials arrows={arrows} testimonials={testimonials} />;
}

export default App;
