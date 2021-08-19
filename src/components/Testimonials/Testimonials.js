import React, { useEffect, useRef, createRef, forwardRef } from "react";
import "./normalize.css";
import "./Testimonials.css";

const Testimonials = (props) => {
  // REFS PASSED TO COMPONENTS
  const imagesContainerRef = createRef();
  console.log(props);

  let cont = 0;

  const targetBtn = (target) => {
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

  return (
    <main className="mainContainer">
      <ImagesAndContainer targetBtn={targetBtn} ref={imagesContainerRef} arrows={props.arrows} testimonials={props.testimonials} />
      {/* <Comments /> */}
    </main>
  );
};

const ImagesAndContainer = forwardRef((props, imagesContainerRef) => {
  console.log(props);

  const handleArrowBtnClick = (e) => {
    console.log(props.targetBtn);
    props.targetBtn(e.target);
  };

  useEffect(() => {
    console.log(imagesContainerRef);

    imagesContainerRef.current.style.width = props.testimonials.length + "00%";

    Array.from(imagesContainerRef.current.children).forEach((img) => {
      img.style.width = 100 / props.testimonials.length + "%";
    });
  }, [imagesContainerRef, props]);

  return (
    <>
      <div className="imagesAndBtnContainer">
        <div ref={imagesContainerRef} className="imagesContainer">
          {props.testimonials.map((testimonials) => {
            return <img key={testimonials.userImage} src={testimonials.userImage} alt={testimonials.userImage} />;
          })}
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
      <Comments />
    </>
  );
});

const Comments = (props) => {
  return <div></div>;
};

export default Testimonials;
