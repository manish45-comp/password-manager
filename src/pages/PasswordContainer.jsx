import { Tooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import TextField from "../component/common/TextField";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { fetchPasswords } from "../redux/password/PasswordSlice";
import PasswordCard from "../component/common/PasswordCard";

const PasswordContainer = ({ category }) => {
  const dispatch = useDispatch();
  const [passwords, setPasswords] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (value) => {
    setSearch(value);
    setTimeout(() => {
      setPasswords(
        data.filter(
          (pass) =>
            pass.site.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
            pass.description
              .toLocaleLowerCase()
              .includes(value.toLocaleLowerCase())
        )
      );
    }, 300);
  };

  const { data } = useSelector((state) => state.password);

  useEffect(() => {
    dispatch(fetchPasswords());
  }, [dispatch]);

  useEffect(() => {
    if (data.length > 0) setPasswords(data);
  }, [data]);

  const filteredPasswords = useMemo(() => {
    if (!category || category === "all") {
      return passwords;
    } else {
      return passwords.filter((pass) => {
        if (category === "favorite") {
          return pass.favorite === true;
        }
        return pass.category === category;
      });
    }
  }, [passwords, category]);

  return (
    <>
      <div className="h-full overflow-y-scroll p-2 md:pe-[40px]">
        <div className="h-12 w-full flex gap-2 items-center justify-start mt-2">
          <div className="w-full">
            <TextField
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="rounded-full ps-5"
              autoComplete="false"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 mt-5">
          {filteredPasswords.map((pass, index) => {
            return (
              <PasswordCard
                key={pass.id}
                index={index}
                pass={pass}
                passwords={passwords}
                setPasswords={setPasswords}
              />
            );
          })}
        </div>

        <Tooltip
          id="add"
          effect="solid"
          place="bottom"
          variant="light"
        ></Tooltip>
      </div>
    </>
  );
};

PasswordContainer.propTypes = {
  category: PropTypes.string,
};

export default PasswordContainer;
