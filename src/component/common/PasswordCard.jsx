import { useDispatch } from "react-redux";
import {
  deletePasswords,
  toggleFavPass,
} from "../../redux/password/PasswordSlice";
import PropTypes from "prop-types";

import { useState } from "react";
import { motion } from "framer-motion";

const PasswordCard = ({ index, pass, passwords, setPasswords }) => {
  const { id, site, url, favorite, createdAt, password } = pass;
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();

  const handleCopyPassword = (password) => {
    navigator.clipboard
      .writeText(password)
      .then(() => {
        console.log("Password copied to clipboard");
      })
      .catch((err) => {
        console.log("Could not copy text: ", err);
      });
  };

  const handleDeletePassword = async (passwordId) => {
    const res = await dispatch(deletePasswords({ passwordId }));
    if (res.payload.success) {
      const updatedPasswords = passwords.filter(
        (pass) => pass.id !== passwordId
      );
      setPasswords(updatedPasswords);
      console.log(res.payload.message);
    }
  };

  const handleFavChange = async (id, favorite) => {
    const res = await dispatch(toggleFavPass(id));
    if (res.payload.success) {
      const updatedPasswords = passwords.map((pass) =>
        pass.id === id ? { ...pass, favorite: !pass.favorite } : pass
      );
      setPasswords(updatedPasswords);
      console.log(favorite ? "Removed from favorites" : "Added to favorites");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: index * 0.04 }}
      className="card h-52"
    >
      <div className="card-inside relative">
        <div className="absolute top-2 left-1 flex options">
          {/* toggle favorite */}
          {favorite ? (
            <div
              onClick={() => handleFavChange(id, favorite)}
              data-tooltip-id="add"
              data-tooltip-content="remove favorite"
              className="mx-2 text-yellow-200 hover:text-yellow-500 text-2xl cursor-pointer active:scale-50 transition-all"
            >
              <i className="fa-solid fa-star"></i>
            </div>
          ) : (
            <div
              onClick={() => handleFavChange(id, favorite)}
              data-tooltip-id="add"
              data-tooltip-content="make favorite"
              className="mx-2 hover:text-yellow-500 text-2xl cursor-pointer active:scale-50 transition-all"
            >
              <i className="fa-regular fa-star"></i>
            </div>
          )}
          {/* copy works  */}
          <div
            onClick={() => handleCopyPassword(password)}
            data-tooltip-id="add"
            data-tooltip-content="copy"
            className="mx-2 hover:text-blue-500 text-2xl cursor-pointer active:scale-50 transition-all"
          >
            <i className="fa-regular fa-copy"></i>
          </div>
          {/* delete password works*/}
          <div
            onClick={() => handleDeletePassword(id)}
            data-tooltip-id="add"
            data-tooltip-content="delete"
            className="mx-2 hover:text-red-500 text-2xl cursor-pointer active:scale-50 transition-all"
          >
            <i className="fa-regular fa-trash-can"></i>
          </div>
        </div>

        <div className="card-top h-32 flex flex-col items-end justify-center">
          <img className="w-auto h-6 pe-16" src={url} />
          {showPass ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              whileInView={{ opacity: 1, scale: 1.1 }}
              onClick={() => setShowPass((prev) => !prev)}
              className="pe-16 mt-2"
            >
              {password}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              onClick={() => setShowPass((prev) => !prev)}
              className="pe-16 mt-2 origin-center"
            >
              <i className="fa-solid fa-star-of-life text-sm me-1"></i>
              <i className="fa-solid fa-star-of-life text-sm me-1"></i>
              <i className="fa-solid fa-star-of-life text-sm me-1"></i>
              <i className="fa-solid fa-star-of-life text-sm me-1"></i>
            </motion.div>
          )}
        </div>
        <div className="card-bottom h-20 border-t-2 flex items-center justify-around">
          <p>{site}</p>
          <p>
            <span>{createdAt.split("T")[0].split("-")[1]}</span>/
            <span>{createdAt.split("T")[0].split("-")[2]}</span>/
            <span>{createdAt.split("T")[0].split("-")[0].substring(2, 4)}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};
PasswordCard.propTypes = {
  passwords: PropTypes.array,
  setPasswords: PropTypes.func,
  pass: PropTypes.object,
  index: PropTypes.number,
};
export default PasswordCard;
