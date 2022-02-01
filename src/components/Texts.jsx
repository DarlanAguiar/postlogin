import React from "react";
import { BsTrash } from "react-icons/bs";

import "./Texts.css";

const Texts = ({ data, deletePost, editPost, dataEdit }) => {
  let dados = dataEdit;

  return (
   
    <div className="texts">
      <div className="cabecalho">
        <h4
          className={"title"}
          onBlur={(e) => {
            dados.title = e.target.textContent;
            editPost(dados);
          }}
          contentEditable={true}
        >
          {data.title.toUpperCase()}
        </h4>
        <button className="buttonX" onClick={() => deletePost(data.id)}>
          <BsTrash fontSize={18} color="chartreuse" />
        </button>
      </div>
      <p
        className={"textContent"}
        onBlur={(e) => {
          dados.message = e.target.textContent;
          editPost(dados);
        }}
        contentEditable
      >
        {data.message}
      </p>
    </div>
  );
};

export default Texts;
