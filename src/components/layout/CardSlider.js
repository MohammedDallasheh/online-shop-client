import React, { useState, useEffect } from "react";

const controlStyle = {
  fontSize: "3rem",
  transform: "scale(1,3)",
};

//img Component
const Img = ({ img }) => (
  <img src={`${img?.url}`} alt={img?.alt} width="100%" height="100px" />
);

const defaultItems = [{}];

//Main Component
const CardSlider = ({ items, number = 3, Component, carousel = false }) => {
  if (!Array.isArray(items)) items = defaultItems;

  const [activeItem, setActiveItem] = useState(1);
  const [mainSlideNum, setMainSlideNum] = useState(4);
  const [secondSlideNum, setSecondSlideNum] = useState(0);
  const [showPrevNext, setShowPrevNext] = useState(false);

  useEffect(() => {
    setMainSlideNum(getNumberOfslides(number));
    setSecondSlideNum(getNumberOfslides(carousel));

    if (items?.length > mainSlideNum) setShowPrevNext(true);
  }, []);

  const getNumberOfslides = (num) => {
    if (typeof num === "number") {
      if (num > items?.length) num = items?.length || 1;
      const newNum = [1, 2, 3, 4, 6].reduce(
        (prev, curr) => (num >= prev && num < curr ? prev : curr),
        0
      );
      return newNum;
    }
    return 1;
  };

  const getFromArr = (arr) => (index) => {
    if (index < 0) return arr[arr.length - 1 - (-(index + 1) % arr.length)];
    return arr[index % arr.length];
  };
  const getItem = getFromArr(items);
  /****************************************************************** */
  return !mainSlideNum && !secondSlideNum ? (
    <></>
  ) : (
    <div className="container-fluid px-5">
      <div className="row">
        {showPrevNext ? (
          <div
            className="col-1 p-0 btn user-select-none d-flex justify-content-center align-items-center"
            onClick={() => setActiveItem((state) => state - 1)}
          >
            <span style={controlStyle}>&lt;</span>
          </div>
        ) : (
          <div className="col-1" />
        )}
        <div className="col">
          <div className="row justify-content-around">
            {Array(mainSlideNum)
              .fill(0)
              .map((_, index) => (
                <div className={`col-lg-${12 / mainSlideNum}`} key={index}>
                  <Component items={getItem(activeItem + index)} key={index} />
                </div>
              ))}
          </div>
        </div>
        {/* Next Icon */}
        {showPrevNext ? (
          <div
            className="col-1 p-0 btn user-select-none d-flex justify-content-center align-items-center"
            onClick={() => setActiveItem((state) => state + 1)}
          >
            <span style={controlStyle}>&gt;</span>
          </div>
        ) : (
          <div className="col-1" />
        )}
      </div>
      {carousel && (
        <div className="row my-3 d-none d-lg-block">
          {Array(secondSlideNum)
            .fill(0)
            .map((_, index) => (
              <div className={`col-lg-${12 / secondSlideNum} btn `} key={index}>
                <div
                  onClick={() =>
                    setActiveItem(0 | (activeItem + index - secondSlideNum / 2))
                  }
                >
                  <Img
                    img={getItem(0 | (activeItem + index - secondSlideNum / 2))}
                    key={index}
                  />
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CardSlider;
