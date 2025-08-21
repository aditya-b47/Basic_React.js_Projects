import React, { useState } from "react";
import { data } from "./data";
import "./styles.css";

//single selection
//multiple selection
const Accordian = () => {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  const handleSingleSelection = (getCurrentId) => {
    setSelected(getCurrentId === selected ? null : getCurrentId);
  };

  const handleMultiSelection = (getCurrentId) => {
    let copyMultiple = [...multiple];
    const findIndexOfCurrentId = copyMultiple.indexOf(getCurrentId)

    console.log(findIndexOfCurrentId);

    if(findIndexOfCurrentId === -1) copyMultiple.push(getCurrentId)
      else copyMultiple.splice(findIndexOfCurrentId, 1)

    setMultiple(copyMultiple)

  };

  console.log(selected,multiple);

  return (
    <div className="wrapper"> 
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection) }>      
        enable multi-selection             
      </button> 
      <div className="accordian">             
        {data && data.length > 0 ? (         
          data.map((dataItem) => (
            <div className="item">
              <div
                onClick={
                  enableMultiSelection             // agar enableMultiSelection true hoga toh handlemulti chalega nhi toh handlesingle hoga  
                    ?() => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className="title"
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {
                enableMultiSelection ? multiple.indexOf(dataItem.id) !== -1 && <div className="content">{dataItem.answer}</div> :
                selected === dataItem.id && <div className="content">{dataItem.answer}</div>
              }
              {/* {selected === dataItem.id ? (
                <div className="content">{dataItem.answer}</div>
              ) : null} */}
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
};

export default Accordian;
