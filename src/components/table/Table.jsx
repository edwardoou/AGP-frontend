import React, { useState } from "react";
import "./table.css";

const Table = (props) => {
  /* const initDataShow =
    props.limit && props.bodyData
      ? props.bodyData.slice(0, Number(props.limit))
      : props.bodyData;

  const [dataShow, setDataShow] = useState(initDataShow);

  let pages = 1;

  let range = [];

  if (props.limit !== undefined) {
    let page = Math.floor(props.bodyData.length / Number(props.limit));
    pages = props.bodyData.length % Number(props.limit) === 0 ? page : page + 1;
    range = [...Array(pages).keys()];
  }

  const [currPage, setCurrPage] = useState(0);

  const selectPage = (page) => {
    const start = Number(props.limit) * page;
    const end = start + Number(props.limit);

    setDataShow(props.bodyData.slice(start, end));

    setCurrPage(page);
  }; */
  return (
    <div>
      <div className="table-wrapper">
        <table>
          {/* Cabezera de la tabla y posicion de la data */}
          {props.cabezera && props.cabezeraData ? (
            <thead>
              <tr>
                {props.cabezeraData.map((item, index) =>
                  props.cabezera(item, index)
                )}
              </tr>
            </thead>
          ) : null}
          {/* Cuerpo de la tabla y posicion de la data */}
          {props.cuerpo && props.cuerpoData ? (
            <tbody>
              {props.cuerpoData.map((item, index) => props.cuerpo(item, index))}
            </tbody>
          ) : null}
        </table>
      </div>
      {/* {pages > 1 ? (
        <div className="table__pagination">
          {range.map((item, index) => (
            <div
              key={index}
              className={`table__pagination-item ${
                currPage === index ? "active" : ""
              }`}
              onClick={() => selectPage(index)}
            >
              {item + 1}
            </div>
          ))}
        </div>
      ) : null} */}
    </div>
  );
};

export default Table;
