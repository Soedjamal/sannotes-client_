import "./styles/loader.css";

export const CircleLoader = ({
  size = "30px",
  color = "rgb(183, 111, 255)",
}) => {
  return (
    <div
      style={{
        width: `${size}`,
        height: `${size}`,
        border: `4px solid ${color}`,
        borderLeft: "4px solid transparent",
      }}
      className="loader"
    ></div>
  );
};

export const BarLoader = () => {
  return (
    <>
      <div className="bar-loader-container">
        <div className="bar-loader-sm"></div>
        <div className="bar-loader-md"></div>
      </div>
    </>
  );
};
