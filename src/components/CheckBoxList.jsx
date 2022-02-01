import React from "react";
import CheckBoxItem from "./CheckBoxItem";

const CheckBoxList = ({ data, editPost }) => {
  return (
    <div className={"card_div_checar"}>
      {data.checkList.map((item, indice) => (
        <CheckBoxItem
          key={indice}
          dataItem={item}
          data={data}
          indice={indice}
          editPost={editPost}
        />
      ))}
    </div>
  );
};

export default CheckBoxList;
