"use client";
import scss from "./MobileMenu.module.scss";
import { IoSearchSharp } from "react-icons/io5";
const MobileMenu = () => {
  return (
    <div className={scss.menu}>
      <ul className={scss.menu_list}>
        <li className="">
          <IoSearchSharp size={16} />
        </li>
      </ul>
    </div>
  );
};
export default MobileMenu;
