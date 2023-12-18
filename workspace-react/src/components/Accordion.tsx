import { useRef, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import data from "./AccordionData";
import styles from "./styles.module.css";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem = ({
  question,
  answer,
  isOpen,
  onClick,
}: AccordionItemProps) => {
  const contentHeight = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles["question-container"]} ${
          isOpen ? styles.active : ""
        }`}
        onClick={onClick}
      >
        <p className={styles["question-content"]}>{question}</p>
        <RiArrowDropDownLine
          className={`${styles.arrow} ${isOpen ? styles.active : ""}`}
        />
      </button>
      <div
        ref={contentHeight}
        className={styles["answer-container"]}
        style={
          isOpen
            ? { height: contentHeight.current?.scrollHeight }
            : { height: 0 }
        }
      >
        <p className={styles["answer-content"]}>{answer}</p>
      </div>
    </div>
  );
};

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      {data.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={activeIndex === index}
          onClick={() => handleItemClick(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
