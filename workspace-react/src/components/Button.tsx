import styles from "../styles.module.css";

interface ButtonProps {
  mode?: "primary" | "secondary";
}

const Button = ({ mode }: ButtonProps) => {
  const primaryClass = mode
    ? styles[`btn${mode.charAt(0).toUpperCase()}${mode.slice(1)}`]
    : "";
  const classes = primaryClass ? `${styles.btn} ${primaryClass}` : styles.btn;
  return <button className={classes}>Woo</button>;
};

export default Button;
