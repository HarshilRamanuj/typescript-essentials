import React, { useState } from "react";
import "./UseState.css";

interface Address {
  street: string;
  city: string;
  zip: string;
}

const UseState = () => {
  const [count, setCount] = useState<number>(0);
  const [expand, setExpand] = useState<boolean>(false);
  const [address, setAddress] = useState<Address>({
    street: "",
    city: "",
    zip: "",
  });
  const [arr, setArr] = useState<Address[]>([]);
  const [updateText, setUpdateText] = useState("");

  const handleExpand = () => {
    // setExpand(expand ? false : true);
    setExpand((e) => !e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target, "eeeee");
    const { name, value } = e.target;
    // console.log(name, value, "name value");
    setAddress((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleArray = () => {
    setArr((prev) => {
      console.log(prev, "handleArray");
      return [...prev, address];
    });
  };

  const handleUpdate = (item: Address) => {
    console.log(item, "item");
    setAddress(item);
    setUpdateText("update");
  };

  const handleUpdated = () => {
    setArr((prev) => {
      const updatedArr = prev.map((item) =>
        item.zip === address.zip
          ? { street: address.street, city: address.city, zip: address.zip }
          : item,
      );
      return updatedArr;
    });
  };

  const handleDelete = (item: Address) => {
    setArr((prev) => {
      console.log(prev, "prev delete");
      const deletedItem = prev.filter((e) => {
        console.log(e, "filter");

        return e.zip !== item.zip;
      });
      return deletedItem;
    });
  };

  console.log(count, "count");
  return (
    <div className="use-state-page">
      <h2>UseState Examples</h2>
      <div className="counter-example">
        <button onClick={() => setCount(count + 1)}>
          Counter cliked {count}
        </button>
      </div>
      {/* --------------   Read more / read less toggle*/}
      <div className="toggle-example">
        <p className={expand ? "" : "line-clamp-2"}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          laboriosam doloribus a, quod soluta optio quam inventore
          exercitationem, est recusandae aut! Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Nostrum laboriosam doloribus a, quod
          soluta optio quam inventore exercitationem, est recusandae aut! Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Nostrum laboriosam
          doloribus a, quod soluta optio quam inventore exercitationem, est
          recusandae aut!
        </p>
        <button onClick={handleExpand}>
          {expand ? "show less" : "show more"}
        </button>
      </div>
      {/* -------------- Object state: one handler for many inputs */}
      <div className="input-handle">
        <label className="input-field">
          <span className="input-label">Street</span>
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleChange}
          />
        </label>
        <label className="input-field">
          <span className="input-label">City</span>
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleChange}
          />
        </label>
        <label className="input-field">
          <span className="input-label">ZIP code</span>
          <input
            type="text"
            name="zip"
            value={address.zip}
            onChange={handleChange}
          />
        </label>
        <button
          type="submit"
          onClick={updateText ? handleUpdated : handleArray}
        >
          {updateText ? "Update" : "Create"}
        </button>
      </div>
      {/* -------------- update delete */}
      {arr.map((item) => {
        return (
          <div className="address-card">
            <div className="address-details">
              <p>street :{item.street} </p>
              <p>city :{item.city} </p>
              <p>zip :{item.zip} </p>
            </div>
            <button type="submit" onClick={() => handleUpdate(item)}>
              Update
            </button>
            <button type="submit" onClick={() => handleDelete(item)}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default UseState;
