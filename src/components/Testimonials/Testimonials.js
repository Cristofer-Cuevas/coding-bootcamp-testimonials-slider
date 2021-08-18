import React, { useRef, createRef, useEffect, forwardRef } from "react";
import "./normalize.css";
import "./Testimonials.css";

const Testimonials = (props) => {
  console.log(props);
  // console.log(<TestimonialsImages />);

  const imagesTestimonialsContainer = createRef();

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

    imagesTestimonialsContainer.current.style.left = "-" + cont + "00%";
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
      <TestimonialsImages ref={imagesTestimonialsContainer} testimonials={props.testimonials} />
    </main>
  );
};

const TestimonialsImages = forwardRef((props, ref) => {
  const imagesTestimonialsContainer = ref;
  const imagesContainer = useRef(null);

  const commentContainer = createRef();

  useEffect(() => {
    console.log(imagesTestimonialsContainer);

    console.log(imagesContainer);
    imagesTestimonialsContainer.current.style.width = props.testimonials.length + "00%";
    // commentContainer.current.style.width = props.testimonials.length + "00%";

    Array.from(imagesContainer.current.children).forEach((testimonials) => {
      testimonials.style.width = 100 / props.testimonials.length + "%";
    });

    Array.from(commentContainer.current.children).forEach((comment) => {
      comment.style.width = 100 / props.testimonials.length + "%";
    });
  }, [commentContainer, imagesContainer, imagesTestimonialsContainer, props]);

  return (
    <div ref={ref} className="imagesTestimonialsContainer">
      <div ref={imagesContainer} className="imagesContainer">
        {props.testimonials.map((testimonial) => {
          return <img key={testimonial.userImage} src={testimonial.userImage} alt={testimonial.userImage} />;
        })}
      </div>
      <TestimonialsComments ref={commentContainer} testimonials={props.testimonials} />
    </div>
  );
});

const TestimonialsComments = forwardRef((props, ref) => {
  const commentContainer = ref;
  // useEffect(() => {
  //   console.log(imagesContainer);

  //   imagesContainer.current.style.width = props.testimonials.length + "00%";

  //   Array.from(imagesContainer.current.children).forEach((testimonials) => {
  //     testimonials.style.width = 100 / props.testimonials.length + "%";
  //   });
  // }, [imagesContainer, props]);

  console.log(props);
  return (
    <div ref={commentContainer} className="commentContainer">
      {props.testimonials.map((testimonial) => {
        return <p className="userComment">{testimonial.userComment}</p>;
      })}
    </div>
  );
});

export default Testimonials;
