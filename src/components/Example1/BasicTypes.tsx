import "./BasicTypes.css";

type basicInterface = {
  title: string;
  btnName: string;
};

const BasicTypes = ({ title, btnName }: basicInterface) => {
  return (
    <div className="cardWrapper">
      <div className="cardHead">
        <h2>{title}</h2>
      </div>
      <div className="cardBody">
        <p className="cardSubtitle">Hover over me</p>
        <p className="cardDescription">
          This is a simple, elegant card component built with pure CSS. It
          features smooth hover animations and a modern design.
        </p>
      </div>
      <div className="cardFooter">
        <button className="cardButton">{btnName}</button>
      </div>
    </div>
  );
};

export default BasicTypes;
