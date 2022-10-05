import React from "react";

//styles and component
import "./Rating.css";
import { AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";
import { BsStarFill } from "react-icons/bs";

export default function Rating({ value, text }) {
  return (
    <div className="rating">
      <div className="rating_star">
        <span>
          {value >= 1 ? (
            <BsStarFill />
          ) : value >= 0.5 ? (
            <BsStarHalf />
          ) : (
            <AiOutlineStar />
          )}
        </span>
        <span>
          {value >= 2 ? (
            <BsStarFill />
          ) : value >= 1.5 ? (
            <BsStarHalf />
          ) : (
            <AiOutlineStar />
          )}
        </span>
        <span>
          {value >= 3 ? (
            <BsStarFill />
          ) : value >= 2.5 ? (
            <BsStarHalf />
          ) : (
            <AiOutlineStar />
          )}
        </span>
        <span>
          {value >= 4 ? (
            <BsStarFill />
          ) : value >= 3.5 ? (
            <BsStarHalf />
          ) : (
            <AiOutlineStar />
          )}
        </span>
        <span>
          {value >= 5 ? (
            <BsStarFill />
          ) : value >= 4.5 ? (
            <BsStarHalf />
          ) : (
            <AiOutlineStar />
          )}
        </span>
      </div>
      <span>{text && text}</span>
    </div>
  );
}
