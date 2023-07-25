import React from "react";
import styles from "./container.module.css";

export function Container({
  localStyle = [""],
  children,
}: {
  localStyle: string[];
  children: React.ReactElement[];
}) {
  return (
    <div className={[...localStyle, styles.container].join(" ")}>
      {children}
    </div>
  );
}
