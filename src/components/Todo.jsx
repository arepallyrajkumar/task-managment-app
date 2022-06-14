import React, { useState } from "react";

function Todo() {
  const [showForm, setshowform] = useState(true);
  const [showNew, setshowNew] = useState(true);
  const [showList, setshowList] = useState(true);
  const [showDelete, setshowDelete] = useState(true);
  const [inputTitile, setInputTitile] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [isEditItem, setisEditItem] = useState(null);
  const [toggleSubmit, settoggleSubmit] = useState(true);
  const [editMessage, seteditMessage] = useState(false);
  const [deleteMessage, setdeleteMessage] = useState(false);
  const [deleteMessagesuccess, setdeleteMessagesuccess] = useState(false);
  const [items, setitems] = useState([
    {
      id: "001",
      name: "Default Task",
      desc: "Default Description",
      status: false,
    },
  ]);
  const handleInputTitle = (e) => {
    setInputTitile(e.target.value);
  };
  const handleInputDesc = (e) => {
    setInputDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    setshowList(true);
    setshowNew(true);
    e.preventDefault();
    if (!inputTitile || !inputDescription) {
      alert("fill data");
      showList(false);
    } else if (inputTitile && !toggleSubmit) {
      setitems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return {
              ...elem,
              name: inputTitile,
              desc: inputDescription,
            };
          }
          return elem;
        })
      );
      setInputTitile("");
      setInputDescription("");
      settoggleSubmit(true);
      setshowform(false);
      setshowDelete(true);
    } else {
      const allinputData = {
        id: new Date().getTime().toString(),
        name: inputTitile,
        desc: inputDescription,
      };
      setitems([allinputData, ...items]);
      setInputTitile("");
      setInputDescription("");
      setshowform(false);
    }
  };

  const handleEdit = (id) => {
    setshowList(false);
    setshowDelete(false);
    setshowNew(false);
    setshowform(true);

    settoggleSubmit(false);
    let newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    setInputTitile(newEditItem.name);
    setInputDescription(newEditItem.desc);
    setisEditItem(id);
    console.log(newEditItem);
  };

  const handleDelete = (id) => {
    console.log(id);
    const updatedItems = items.filter((elem) => {
      return id !== elem.id;
    });
    setdeleteMessage(true);
    setTimeout(() => {
      setitems(updatedItems);
      setdeleteMessage(false);
    }, 1000);
    // setdeleteMessagesuccess(false);
  };

  const handleAdd = () => {
    setshowform(true);
    setshowList(true);
    setshowNew(false);
  };

  return (
    <>
      {showNew ? (
        <div className="container">
          <div className="col-12 text-end">
            <button className="btn btn-primary" onClick={handleAdd}>
              Add New Task
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {showForm ? (
        <>
          {" "}
          <div className="container border rounded d-flex justify-content-center shadow p-3 mb-5 bg-white rounded">
            <div className="row">
              <div className="text-center">
                <h2>{toggleSubmit ? "Add Task" : "Edit Task"}</h2>
              </div>
              <form className="col-12 p-2" onSubmit={handleSubmit}>
                <label htmlFor="title" className="my-2">
                  Enter Title
                </label>
                <input
                  type="text"
                  className="w-100 my-1 p-2"
                  name="title"
                  id="title"
                  placeholder="title"
                  onChange={handleInputTitle}
                  value={inputTitile}
                />
                <label htmlFor="description" className="my-2">
                  Enter Description
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  placeholder="description"
                  className="w-100 my-1 p-2"
                  onChange={handleInputDesc}
                  value={inputDescription}
                />
                {toggleSubmit ? (
                  <button className="btn btn-primary my-2">Save</button>
                ) : (
                  <button className="btn btn-primary my-2">Update</button>
                )}
              </form>
            </div>
          </div>{" "}
        </>
      ) : (
        ""
      )}
      {showList ? (
        <div className="container py-2">
          {deleteMessage ? (
            <p className="text-center text-danger">Item Deleted Successfully</p>
          ) : (
            ""
          )}
          {items.map((elem, index) => {
            return (
              <div
                className="row border rounded shadow p-3 mb-5 bg-white rounded my-3 p-2"
                key={elem.id}
              >
                <div className="col-12 d-flex justify-content-between">
                  <div>
                    <h4>{elem.name}</h4>
                    <p>{elem.desc}</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-primart mx-2"
                      onClick={() => handleEdit(elem.id)}
                    >
                      Edit
                    </button>
                    {showDelete ? (
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => handleDelete(elem.id)}
                      >
                        Delete
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Todo;
