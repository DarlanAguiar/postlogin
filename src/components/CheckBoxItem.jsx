import React from "react";
import { GiCheckMark } from "react-icons/gi";
import { MdClose } from "react-icons/md";

import "./CheckBoxItem.css";

const CheckBoxItem = ({ dataItem, data, indice, editPost }) => {
  const dados = data;

  

  const deleteRow = (index) => {
    const deletedRow = dados.checkList.filter((item, i) => i !== index);
    dados.checkList = deletedRow;
    editPost(dados);
  };

  return (
    <div
      className={"card_div_checar_item"}
      style={{ borderLeft: dataItem.check ? "" : "2px solid chartreuse" }}
    >
      <p
        className={"card_item_check"}
        contentEditable
        onBlur={(e) => {
          dados.checkList[indice].text = e.target.textContent;
          editPost(dados);
        }}
        style={{ color: dataItem.check ? "#777" : "#fff" }}
      >
        {dataItem.text}
      </p>
      <div className="buttons">
        <button
          className="button_check"
          onClick={() => {
            dados.checkList[indice].check = !dados.checkList[indice].check;
            editPost(dados);
          }}
        >
          <GiCheckMark
            fontSize={14}
            style={{ color: dataItem.check ? "#777" : "chartreuse" }}
          />
        </button>
        <button
          className="button_apagar_check"
          onClick={() => deleteRow(indice)}
        >
          <MdClose fontSize={19} color="chartreuse" />
        </button>
      </div>
    </div>
  );
};

export default CheckBoxItem;
