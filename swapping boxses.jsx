import React, { useState, useEffect } from "react";
import "./swapping boxses.scss";

const sentences = [
  "أثر الفراشة في التاريخ",
  "هل تعلم",
  "حكاية اسم",
  "فنون آثار عمارة",
  "ما لا تعرفه عن ؟؟",
  "العمود الاجتماعي",
  "تكنولوجيا حديثة وتراث أزلي",
  "زاوية تحليلية",
  "وجوه من التاريخ",
  "مآذن إسلامية تحكي التاريخ",
  "حكاية متحف",
  "حكاية مدينة",
  "الطب بين التراث والحداثة",
  "يوميات طبيب فرعوني في القرن الواحد والعشرين",
  "السياسة والدبلوماسية في الآثار",
  "تراث في مأزق",
  "حكاية مؤثر",
  "اليهود في مصر",
];


const colors = ["#E3CAA5", "#BD8454"];

export default function BoxGrid() {
  const [visibleCount, setVisibleCount] = useState(6); 
  const [startIndex, setStartIndex] = useState(0);
  const [isSwapping, setIsSwapping] = useState(false);
  const [growButtonHovered, setGrowButtonHovered] = useState(false);

  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 576) setVisibleCount(2); 
      else if (width < 992) setVisibleCount(4); 
      else setVisibleCount(6); 
    };

    handleResize(); 
    window.addEventListener("resize", handleResize); 
    return () => window.removeEventListener("resize", handleResize); 
  }, []);

 
  useEffect(() => {
    const interval = setInterval(() => {
      setIsSwapping(true);
      setTimeout(() => {
        setStartIndex((prev) => (prev + visibleCount) % sentences.length);
        setIsSwapping(false);
      }, 500); 
    }, 4000); 

    return () => clearInterval(interval); 
  }, [visibleCount]);

  
  const visibleBoxes = Array.from({ length: visibleCount }, (_, i) => {
    const index = (startIndex + i) % sentences.length;
    let color;

    if (visibleCount === 4) {
      
      const rowIndex = Math.floor(i / 2);
      const colIndex = i % 2; 
      color = (rowIndex + colIndex) % 2 === 0 ? colors[0] : colors[1]; 
    } else {
      
      color = i % 2 === 0 ? colors[0] : colors[1];
    }

    return {
      sentence: sentences[index],
      color,
    };
  });

  return (
    <div className="container">
      <div className="row">
      <div className="title">
        <h1>اعمده متنوعه</h1>
      </div>
      <div className="box-grid">
        {visibleBoxes.map((box, idx) => {
          const rowIndex = Math.floor(idx / (visibleCount / 2)); 
          const boxClass = isSwapping
            ? rowIndex === 0
              ? "box move-down"
              : "box move-up"
            : "box";

          return (
            <div className="box-wrapper" key={idx}>
              <div className="box-shadow" />
              <div className={boxClass} style={{ backgroundColor: box.color }}>
                <p>{box.sentence}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="add-wrapper">
        <div className="grow">
          <div
            className={`grow-icon ${growButtonHovered ? "grow-active" : ""}`}
            onMouseEnter={() => setGrowButtonHovered(true)}
            onMouseLeave={() => setGrowButtonHovered(false)}
          >
            <img className="icon" src="images/button.png"/>
            <span
              className={`hover-text ${growButtonHovered ? "show-text" : ""}`}
            >
              اصف مقال
            </span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
