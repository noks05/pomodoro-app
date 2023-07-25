import React, { useState } from "react";
import styles from "./dropdown.module.css";

export function Dropdown({
  button,
  children,
}: {
  button: React.ReactElement;
  children: React.ReactElement;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function handleOpen() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <div className={styles.dropdown}>
      <div onClick={handleOpen}>{button}</div>
      {isDropdownOpen && (
        <div className={styles.listWrap}>
          <div className={styles.list} onClick={() => setIsDropdownOpen(false)}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
