import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Logo from "../assets/Logo.png";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 lg:mx-40 mx-10 sm:mx-16 md:mx-32  mt-2 mb-10 text-sm">
        <div className="flex flex-col gap-5">
          <img src={Logo} className="mb-1 w-32" alt="Logo"></img>
          <p className="w-full md:w-2/3 text-gray-600">
            Urban Hive is a fashion marketplace where multiple sellers can
            register and sell their products, while shoppers can explore and buy
            trendy clothing and accessories—all in one place.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>{" "}
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <a href="tel:+919582829255">+91 9582829255</a>
            </li>
            <li>
              <a href="mailto:yogesh_aithani@outlook.com">
                yogesh_aithani@outlook.com
              </a>
            </li>
            <li className="flex gap-3 font-bold text-2xl mt-2">
              <a
                href="https://www.linkedin.com/in/yogesh-aithani-064b591a4/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://x.com/Knowledge_Hive_"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://github.com/yogi04-ait"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <p className="py-3 text-sm text-center mx-10">
          ©️ Copyright 2025@
          <span className="whitespace-nowrap">yogesh_aithani</span>- All Right
          Reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
