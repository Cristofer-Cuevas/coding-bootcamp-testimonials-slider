import React, { useEffect, createRef, forwardRef } from "react";
import "./assets/styles/normalize.css";
import "./assets/styles/Testimonials.css";

const Testimonials = (props) => {
  return (
    <main className="mainContainer">
      <ImagesContainer arrows={props.arrows} testimonials={props.testimonials} />
    </main>
  );
};

// Slider Container
const ImagesContainer = (props) => {
  // Refs
  const commentsContainerRef = createRef();
  const imagesContainerRef = createRef();

  let cont = 0;

  const handleArrowBtnClick = (e) => {
    // Slider Logic
    if (e.target.className === "previousArrow") {
      --cont;
    } else if (e.target.className === "nextArrow") {
      ++cont;
    }

    if (cont >= props.testimonials.length) {
      cont = 0;
    } else if (cont < 0) {
      cont = props.testimonials.length - 1;
    }

    imagesContainerRef.current.style.left = "-" + cont + "00%";
    commentsContainerRef.current.style.left = "-" + cont + "00%";
  };

  // Setting width once the component has loaded
  useEffect(() => {
    // Widths for imagesContainer and commentsContainer
    imagesContainerRef.current.style.width = props.testimonials.length + "00%";
    commentsContainerRef.current.style.width = props.testimonials.length + "00%";

    // Giving each child (each image and comment) of imagesContainer and commentsContainer its proper width
    Array.from(imagesContainerRef.current.children).forEach((img) => {
      img.style.width = 100 / props.testimonials.length + "%";
    });

    Array.from(commentsContainerRef.current.children).forEach((comment) => {
      comment.style.width = 100 / props.testimonials.length + "%";
    });
  }, [imagesContainerRef, commentsContainerRef, props]);
  // End of the useEffect()

  return (
    <>
      <div className="container">
        <div className="secondContainer">
          <div className="sliderImagesContainer">
            <div ref={imagesContainerRef} className="imagesContainer">
              {props.testimonials.map((testimonials) => {
                return <img key={testimonials.userImage} src={testimonials.userImage} alt={testimonials.userImage} />;
              })}
            </div>
          </div>
          <div className="btnContainer">
            <button className="previousArrow" onClick={handleArrowBtnClick}>
              <img className="previousArrow" src={props.arrows[0]} alt="proviousArrow" />
            </button>
            <button className="nextArrow" onClick={handleArrowBtnClick}>
              <img className="nextArrow" src={props.arrows[1]} alt="nextArrow" />
            </button>
          </div>
        </div>
        <Comments testimonials={props.testimonials} ref={commentsContainerRef} />
      </div>
    </>
  );
};

// Forwarding the ref to ImagesContainer to slide comments with images
const Comments = forwardRef((props, commentsContainerRef) => {
  return (
    <div className="sliderCommentsContainer">
      <div ref={commentsContainerRef} className="commentsContainer">
        {props.testimonials.map((testimonial) => {
          return (
            <div className="userBox">
              <p className="userComment">{testimonial.userComment}</p>
              <div className="userNameAndUserRollContainer">
                <p className="userName">{testimonial.userName}</p>
                <p className="userRoll">{testimonial.userRoll}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default Testimonials;
