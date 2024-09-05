import React, { useState } from "react";

const AccordianArray = [{ id: 1, text: 'accordian1' }, { id: 2, text: 'accordian2' }, { id: 3, text: 'accordian3' }, { id: 4, text: 'accordian4' }]

const Accordian = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const handleClick = (index) => {
    setActiveIndex(index);
  }
  return <div className="min-h-screen  bg-white flex items-center justify-center flex-col">
    {AccordianArray.map((item, index) => {
      const activeAccordian = activeIndex === index
      return (
        <div key={`accordin-${item.id}`} className={`w-40 flex flex-row bg-slate-300 m-4 rounded-md justify-between ${activeIndex === index ? 'h-10' : 'h-6'}`} onClick={() => handleClick(index)}>
          <p>{item.text}</p>
          <p>{activeAccordian ? '-' : '+'}</p>
        </div>
      )
    })}
  </div>;
};

export default Accordian;
