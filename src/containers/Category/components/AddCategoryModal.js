import React, { useEffect, useState } from "react";
import NewModal from "../../../components/UI/Modal";
import Notification from "../../../components/UI/Notification";

const AddCategoryModal = (props) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage("");
  }, []);
  const {
    show,
    handleClose,
    modalTitle,
    onSubmit,
    name,
    setName,
    listCategory,
    // handleCategoryImage,
    categoryImage,
    setCategoryImage,
  } = props;
  const check = (value) => {
    console.log(value);
    const checkName = listCategory.find(
      (listCategory) => listCategory.name === value
    );
    checkName ? setMessage("Name already exists") : setMessage("");
  };
  const changeImage = (event) => {
    document.getElementById("img").src = window.URL.createObjectURL(
      event.target.files[0]
    );
    setCategoryImage(event.target.files[0]);
  };
  return (
    <NewModal
      show={show}
      handleClose={handleClose}
      onSubmit={message === "" ? onSubmit : null}
      modalTitle={modalTitle}
    >
      <div className="card-body">
        {message ? <Notification type="danger" message={message} /> : ""}

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name category"
            value={name}
            onChange={(e) => {
              check(e.target.value);
              setName(e.target.value);
            }}
            required
          />
        </div>

        <div class="form-group">
          <label for="customFile">Image</label>
          <div className="row" style={{ marginBottom: "5px" }}>
             <img
              id="img"
              src=""
              width={categoryImage?.name ? "100" : null}
              height={categoryImage?.name ? "100" : null}
              alt="Image category"
              aria-hidden
            /> 
          </div>

          {/* <div className="row" style={{ marginBottom: "5px" }}>
            <img id="img" width="100" height="100" />
          </div> */}
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              accept="image/png, image/jpeg"
              onChange={changeImage}
              required
            />
            <label className="custom-file-label" for="customFile">
              {categoryImage?.name ? categoryImage?.name : "Choose file"}
            </label>
          </div>
        </div>
      </div>
    </NewModal>
  );
};

export default AddCategoryModal;
