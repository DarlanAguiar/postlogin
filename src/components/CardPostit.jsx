import React, { useState, useEffect } from "react";
import Texts from "./Texts";
import moment from "moment";

import "./CardPostit.css";
import CheckBoxList from "./CheckBoxList";

const CardPostit = ({ info, deletePost, editPost, textInputSearch }) => {
  const [invalidDate, setInvalidDate] = useState(false);
  const [searchMatch, setSearchMatch] = useState(true);
  const [checkText, setcheckText] = useState("Adicionar...");

  const exchangeText = () => {
    setcheckText("");
  };

  const addNewRow = (text) => {
    if (text.length > 0) {
      const dados = info;
      dados.checkList.push({ check: false, text: text });

      editPost(dados);

      setcheckText("Adicionar...");
    }else{
      setcheckText("Adicionar...");
    }
  };

  //codigos de busca
  useEffect(() => {
    let textToSearch = [];
    textToSearch.push(info.date);
    textToSearch.push(info.message);
    textToSearch.push(info.title);
    info.checkList.forEach((dado) => {
      textToSearch.push(dado.text);
    });

    const texts = textToSearch.join(" ");
    let match = new RegExp(textInputSearch, "i");

    if (match.test(texts)) {
      setSearchMatch(true);
    } else {
      setSearchMatch(false);
    }
  }, [textInputSearch, info]);

  const validateDate = (date) => {
    if (date.length < 1) {
      setInvalidDate(false);
      return;
    }

    if (moment(date, "DD-MM-YYYY").isValid()) {
      info.date = date;
      setInvalidDate(false);
      editPost(info);
    } else {
      setInvalidDate(true);
    }

    /* let expressao = new RegExp(
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
      "g"
    );

    if (expressao.test(date)) {
      info.date = date;
      setInvalidDate(false);
      editPost(info);
    } else {
      setInvalidDate(true);
    } */
  };

  return (
    <div className="card" style={{ display: searchMatch ? "" : "none" }}>
      <Texts
        data={info}
        deletePost={deletePost}
        editPost={editPost}
        dataEdit={info}
      />
      <CheckBoxList data={info} editPost={editPost} />
      <p
        contentEditable
        className="OneMoreCheck"
        onFocus={exchangeText}
        onBlur={(e) => addNewRow(e.target.textContent)}
      >
        {checkText}
      </p>
      <p
        className="date"
        contentEditable
        style={{ color: invalidDate ? "chartreuse" : "#fff" }}
        onBlur={(e) => {
          validateDate(e.target.textContent);
        }}
      >
        {info.date}
      </p>
      {invalidDate && (
        <p className="validDate">Data inválida, formato aceito (DD-MM-AAAA)</p>
      )}
      {info.editDate && <p className="editDate">{info.editDate}</p>}
    </div>
  );
};

export default CardPostit;
