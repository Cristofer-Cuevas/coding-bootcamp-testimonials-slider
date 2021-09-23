import React, { useEffect, useRef, createRef, forwardRef } from "react";
import "./assets/styles/normalize.css";
import "./assets/styles/Testimonials.css";

const Testimonials = (props) => {
  // REFS PASSED TO COMPONENTS
  const imagesContainerRef = createRef();
  console.log(props);

  let cont = 0;

  const targetBtn = (target) => {
    console.log("hola");
    console.log(target);
    if (target.className === "previousArrow") {
      --cont;
    } else if (target.className === "nextArrow") {
      ++cont;
    }
    console.log(cont);

    if (cont >= props.testimonials.length) {
      cont = 0;
    } else if (cont < 0) {
      cont = props.testimonials.length - 1;
    }

    imagesContainerRef.current.style.left = "-" + cont + "00%";
  };

  console.log(props);

  return (
    <main className="mainContainer">
      <ImagesAndContainer targetBtn={targetBtn} arrows={props.arrows} testimonials={props.testimonials}>
        {/* <Comments ref={imagesContainerRef}></Comments> */}
      </ImagesAndContainer>
    </main>
  );
};

// Slider Container
const ImagesAndContainer = (props) => {
  const commentsContainerRef = createRef();
  const imagesContainerRef = createRef();
  console.log(props);

  let cont = 0;

  console.log(props);
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
    console.log(imagesContainerRef);

    imagesContainerRef.current.style.width = props.testimonials.length + "00%";
    // imagesContainerRef.current.style.height = 100 + "%";
    commentsContainerRef.current.style.width = props.testimonials.length + "00%";

    Array.from(imagesContainerRef.current.children).forEach((img) => {
      // img.style.height = "100%";
      img.style.width = 100 / props.testimonials.length + "%";
    });

    Array.from(commentsContainerRef.current.children).forEach((comment) => {
      comment.style.width = 100 / props.testimonials.length + "%";
    });
    console.log(commentsContainerRef);
  }, [imagesContainerRef, commentsContainerRef, props]);

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
