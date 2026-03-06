import styles from "./Button.module.css";

interface ButtonProps {
  type?: "priamry" | "secondary";
  onClick: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Button = ({
  type = "priamry",
  onClick,
  children,
  style,
}: ButtonProps) => {
  return (
    <button
      className={`${styles.wrapper} ${
        type === "secondary" ? styles.secondary : ""
      }`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
