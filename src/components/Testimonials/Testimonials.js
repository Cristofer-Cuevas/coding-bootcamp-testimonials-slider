import React, { createRef, useEffect, forwardRef } from "react";
import "./normalize.css";
import "./Testimonials.css";

const Testimonials = (props) => {
  console.log(props);
  // console.log(<TestimonialsImages />);

  const imagesContainer = createRef();

  let cont = 0;

  const handleBtnClick = (e) => {
    if (e.target.className === "beforeArrow") {
      --cont;
      console.log(cont);
    } else if (e.target.className === "nextArrow") {
      ++cont;
      console.log(cont);
    }

    if (cont >= props.testimonials.length) {
      cont = 0;
    } else if (cont < 0) {
      //When you click the before arrow for the first time, this line of code will take to the last image
      cont = props.testimonials.length - 1;
    }

    imagesContainer.current.style.left = "-" + cont + "00%";
  };

  console.log(props.arrows);
  return (
    <main className="container">
      <div className="btnContainer">
        <button className="beforeArrow" onClick={handleBtnClick}>
          <img className="beforeArrow" src={props.arrows[0]} alt={props.arrows[1]} />
        </button>
        <button className="nextArrow" onClick={handleBtnClick}>
          <img className="nextArrow" src={props.arrows[1]} alt={props.arrows[1]} />
        </button>
      </div>
      <TestimonialsImages ref={imagesContainer} testimonials={props.testimonials} />
    </main>
  );
};

const TestimonialsImages = forwardRef((props, ref) => {
  const imagesContainer = ref;

  useEffect(() => {
    console.log(imagesContainer);

    imagesContainer.current.style.width = props.testimonials.length + "00%";

    Array.from(imagesContainer.current.children).forEach((testimonials) => {
      testimonials.style.width = 100 / props.testimonials.length + "%";
    });
  }, [imagesContainer, props]);

  return (
    <div className="imagesTestimonialsContainer">
      <div ref={ref} className="imagesContainer">
        {props.testimonials.map((testimonial) => {
          return <img key={testimonial.userImage} src={testimonial.userImage} alt={testimonial.userImage} />;
        })}
      </div>
      <TestimonialsComments />
    </div>
  );
});

const TestimonialsComments = () => {
  return <div></div>;
};

export default Testimonials;
