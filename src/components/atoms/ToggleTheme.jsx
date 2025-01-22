import { useThemeContext } from "../../context/ThemeContext";
import "../../App.css";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className={theme}>
      <button onClick={toggleTheme}>Dark?</button>
    </div>
  );
};

export default ToggleTheme;
