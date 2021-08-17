import React, { createRef, useRef, useEffect } from "react";
import "./normalize.css";
import "./Testimonials.css";

const Testimonials = (props) => {
  console.log(props);
  console.log(<TestimonialsImages />);

  const imagesContainer = createRef();

  let cont;

  const handleBtnClick = (e) => {
    console.log(e.target);
    if (e.target.className === "beforeArrow") {
      // e.target..current.style.left = cont + "00%"
    }
  };

  console.log(props.arrows);
  return (
    <main className="container">
      <div className="btnContainer">
        <button className="beforeArrow" onClick={handleBtnClick}>
          <img src={props.arrows[0]} alt={props.arrows[1]} />
        </button>
        <button className="nextArrow" onClick={handleBtnClick}>
          <img src={props.arrows[1]} alt={props.arrows[1]} />
        </button>
      </div>
      <TestimonialsImages ref={imagesContainer} testimonials={props.testimonials} />
    </main>
  );
};

const TestimonialsImages = (props) => {
  console.log(props.ref);

  const imagesContainer = props.ref;

  useEffect(() => {
    console.log(imagesContainer);

    imagesContainer.current.style.width = props.testimonials.length + "00%";

    Array.from(imagesContainer.current.children).forEach((testimonials) => {
      testimonials.style.width = 100 / props.testimonials.length + "%";
    });
  }, [imagesContainer, props]);

  return (
    <div className="imagesTestimonialsContainer">
      <div ref={imagesContainer} className="imagesContainer">
        {props.testimonials.map((testimonial) => {
          return <img key={testimonial.userImage} src={testimonial.userImage} alt={testimonial.userImage} />;
        })}
      </div>
      <TestimonialsComments />
    </div>
  );
};

const TestimonialsComments = () => {
  return <div></div>;
};

export default Testimonials;
