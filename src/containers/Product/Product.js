import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  getListBrand,
  getListCategory,
  getListProduct,
  updateProduct,
} from "../../actions";
import Layout from "../../components/Layout";
import Notification from "../../components/UI/Notification";
import AddProductModal from "./components/AddProductModal";
import DeleteProductModal from "./components/DeleteProductModal";
import EditProductModal from "./components/EditProductModal";
import ViewProductModal from "./components/ViewProductModal";

const Product = () => {
  const products = useSelector((state) => state.product);
  // const brands = useSelector((state) => state.brand);
  const categories = useSelector((state) => state.category);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [description_detail, setDescriptionDetail] = useState("");
  const [reviews, setReviews] = useState([]);
  const [discount, setDiscount] = useState(0);
  // const [category, setCategory] = useState("");
  // const [brandId, setBrandId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  // const [listBrand, setListBrand] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [product, setProduct] = useState({});
  const [message, setMessage] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  //entries
  // const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getListBrand()).then(() => {
      dispatch(getListCategory());
    // });
    dispatch(getListProduct());
  }, [dispatch]);
  useEffect(() => {
    setMessage(products.messages);
  }, [products.messages]);
  useEffect(() => {
    setListProduct(products.listProduct);
    // setListBrand(brands.listBrand);
    setListCategory(categories.listCategory);
  }, [products.listProduct, categories.listCategory]);
  //show Modal

  const handleShowAdd = () => {
    setName("");
    setPrice(0);
    setDiscount(0);
    setQuantity(0);
    // setBrandId("");
    setCategoryId("");
    setDescription("");
    setDescriptionDetail("");
    setProductPictures([]);
    setShowAdd(true);
  };

  const handleCloseAdd = () => {
    const form = new FormData();
    console.log(price, quantity, discount, description);
    form.append("name", name);
    form.append("price", price);
    form.append("discount", discount);
    form.append("quantity", quantity);
    form.append("description", description);
    form.append("description_detail", description_detail);
    // form.append("brandId", brandId);
    form.append("categoryId", categoryId);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    dispatch(addProduct(form));
    setShowAdd(false);
    setName("");
    setPrice(0);
    setQuantity(0);
    setDescription("");
    setDescriptionDetail("");
    // setBrandId("");
    setCategoryId("");
    setProductPictures([]);
  };

  const handleShowView = async (e) => {
     const prod = await products.listProduct.find(
      // (product) => product._id === e.target.value
      (product) => product._id === e
    );
    setName(prod.name);
    setPrice(prod.price);
    setDiscount(prod.discount);
    setQuantity(prod.quantity);
    // const bra = brands.listBrand.find((brand) => brand._id === prod.brandId);
    // setBrandId(bra.name);
    const cat = categories.listCategory.find(
      (category) => category._id === prod.categoryId
    );
    setCategoryId(cat.name);
    setReviews(prod.reviews);
    setDescription(prod.description);
    setDescriptionDetail(prod.description_detail);
    setProductPictures(prod.productPictures);
    setShowView(true);
  };
  const handleCloseView = () => {
    setName("");
    setPrice(0);
    setDiscount(0);
    setQuantity(0);
    // setBrandId("");
    setCategoryId("");
    setDescription("");
    setDescriptionDetail("");
    setReviews("");
    // setCategory("");
    setProductPictures([]);
    setShowView(false);
  };

  const handleShowDelete = (id) => {
    // const id = event.target.value;
    // const prod = products.listProduct.find((product) => product._id === id);
    const prod = products.listProduct.find((product) => product._id === id);
    setProduct(prod);
    setName(prod.name);
    setShowDeleteModal(true);
  };

  const handleCloseDelete = () => {
    dispatch(deleteProduct(product._id));
    setProduct({});
    setShowDeleteModal(false);
    setMessage("Delete Successfully!");
  };
  const handleShowEdit = (id) => {
    // const id = event.target.value;
    const prod = products.listProduct.find((product) => product._id === id);
    if(prod){
    setProduct(prod);
    setName(prod.name);
    setPrice(prod.price);
    setDiscount(prod.discount);
    setQuantity(prod.quantity);
    // const bra = brands.listBrand.find((brand) => brand._id === prod.brandId);
    // setBrandId(prod.brandId);
    // const cat = categories.listCategory.find(
    //   (category) => category._id === bra.categoryId
    // );
    // setCategory(cat._id);
    setCategoryId(prod.categoryId);
    setReviews(prod.reviews);
    setDescription(prod.description);
    setDescriptionDetail(prod.description_detail);
    }
    setProductPictures([]);
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    const form = new FormData();
    form.append("id", product._id);
    form.append("name", name);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("description", description);
    form.append("description_detail", description_detail);
    // form.append("brandId", brandId);
    form.append("categoryId", categoryId);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    dispatch(updateProduct(form));
    setProduct({});
    setName("");
    setPrice(0);
    setQuantity(0);
    setDiscount(0);
    setDescription("");
    setDescriptionDetail("");
    // setBrandId("");
    setCategoryId("");
    setProductPictures([]);
    setShowEditModal(false);
    setMessage("Edit Successfully!");
  };

  const selectList = (e) => {
    let list = [];
    // if (selectedBrand != "" && selectedCategory == "") {
    //   list = products.listProduct.filter(
    //     (product) => product.brandId === selectedBrand
    //   );
    // } else if (selectedBrand == "" && selectedCategory != "") {
    //   list = list.concat(
    //     products.listProduct.filter(
    //       (product) => product.categoryId == selectedCategory
    //     )
    //   );
    // } else if (selectedBrand == "" && selectedCategory == "") {
    //   list = products.listProduct;
    // } else {
    //   list = list.concat(
    //     products.listProduct.filter(
    //       (product) =>
    //         product.categoryId == selectedCategory &&
    //         product.brandId == selectedBrand
    //     )
    //   );
    // }
    list = list.concat(
      products.listProduct.filter(
        (product) => product.categoryId == e
      )
    );
    setListProduct(list);
  };
  //selected
  const searchList = (event) => {
    const value = event.target.value;
    setSearch(value);
    let listSearch;
    if (value === "") {
      setListProduct(products.listProduct);
    } else {
      const prod = products.listProduct.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setListProduct(prod);
    }
  };

  //row table
  const rowTable = (products) => {
    const all = [];
    for (let [index, product] of products.entries()) {
      // let bra = brands.listBrand.find((brand) => brand._id === product.brandId);
      let cat = categories.listCategory.find(
        (category) => category._id === product.categoryId
      );
      var element = {
        sr: index + 1,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        // brand: bra ? bra.name : null,
        category: cat ? cat.name : null,
        btn: (
          <div class="project-actions  text-center " style={{minWidth : "230px"}}>
            <button
              class="btn btn-primary btn-sm"
              value={product._id}
              onClick={()=> handleShowView(product._id)}
              style={{ marginRight: "5px" }}
            >
              <i class="fas fa-folder"></i>
              View
            </button>
            <button
              class="btn btn-info btn-sm"
              value={product._id}
              onClick={() => handleShowEdit(product._id)}
              style={{ marginRight: "5px" }}
            >
              <i class="fas fa-pencil-alt"></i>
              Edit
            </button>
            <button
              class="btn btn-danger btn-sm"
              value={product._id}
              onClick={() => handleShowDelete(product._id)}
              style={{ marginRight: "5px" }}
            >
              <i class="fas fa-trash"></i>
              Delete
            </button>
          </div>
        ),
      };
      all.push(element);
    }
    return all;
  };
  const data = {
    columns: [
      {
        label: "No.",
        field: "sr",
        sort: "asc",
        width: 150,
      },
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 200,
      },
      {
        label: "Price",
        field: "price",
        sort: "asc",
        width: 50,
      },
      {
        label: "Quantity",
        field: "quantity",
        sort: "asc",
        width: 50,
      },
      // {
      //   label: "Brand",
      //   field: "brand",
      //   sort: "asc",
      //   width: 200,
      // },
      {
        label: "Category",
        field: "category",
        sort: "asc",
        width: 200,
      },
      {
        label: "",
        field: "btn",
        sort: "asc",
        width: 100,
      },
    ],
    rows: rowTable(listProduct),
  };

  return (
    <Layout title="Manage product">
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <div className="card">
                <div className="card-header">
                  <div class="card-title">
                    <button
                      className="btn btn-block bg-gradient-primary"
                      onClick={handleShowAdd}
                    >
                      New A Product
                    </button>
                  </div>
                  <div style={{ float: "right" }}>
                    <div className="row">
                      <div className="col-md-6">
                        {/* <select
                          className="form-control "
                          value={selectedBrand}
                          style={{ backgroundColor: "#e9ecef" }}
                          onChange={(e) => {
                            setSelectedBrand(e.target.value);
                            selectList(e);
                          }}
                        >
                          <option value="">Select Brand</option>
                          {listBrand
                            // .filter((brand) =>
                            //   brand.categoryId
                            //     .toLowerCase()
                            //     .includes(selectedCategory.toLowerCase())
                            // )
                            .map((brand) => (
                              <option value={brand._id}>{brand.name}</option>
                            ))}
                          <option value="">All</option>
                        </select> */}
                      </div>
                      <div className="col-md-12">
                        <select
                          className="form-control "
                          value={selectedCategory}
                          style={{ backgroundColor: "#e9ecef", width: "164px" }}
                          onChange={ (e) => {
                            setSelectedCategory(e.target.value);
                            console.log(e.target.value)
                            selectList(e.target.value);
                          }}
                        >
                          {/* <option value="">Select Category</option> */}

                          {listCategory
                            ? listCategory.map((category) => (
                                <option value={category._id}>
                                  {category.name}
                                </option>
                              ))
                            : null}
                          <option value="">All</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div style={{ marginTop: "5px", marginBottom: "-67px" }}>
                    {message !== "" ? (
                      // brands.error !== "" ? (
                        // <Notification type="danger" message={message} />
                      // ) : (
                        <Notification type="success" message={message} />
                      // )
                    ) : null}
                  </div>
                </div>
                <div className="row" style={{ marginBottom: "-80px" }}>
                  <div className="col-lg-12">
                    <div className="" style={{ float: "right" }}>
                      <div className="card-body">
                        <div className="input-group">
                          <div class="input-group-append">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Search name"
                              value={search}
                              onChange={(e) => {
                                searchList(e);
                              }}
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="card-body">
                    <MDBDataTable
                      entries={10}
                      // displayEntries={false}
                      entriesOptions={[5, 10, 15, 20, 25, 50]}
                      searching={false}
                      striped
                      bordered
                      hover
                      // barReverse
                      noBottomColumns
                      data={data}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-1"></div>
          </div>
        </div>
      </section>

      <AddProductModal
        show={showAdd}
        handleClose={() => {
          setShowAdd(false);
          setProductPictures([]);
        }}
        onSubmit={handleCloseAdd}
        modalTitle={"Add New Product"}
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        quantity={quantity}
        setQuantity={setQuantity}
        discount={discount}
        setDiscount={setDiscount}
        description={description}
        setDescription={setDescription}
        description_detail={description_detail}
        setDescriptionDetail={setDescriptionDetail}
        // category={category}
        // setCategory={setCategory}
        // brandId={brandId}
        // setBrandId={setBrandId}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        productPictures={productPictures}
        setProductPictures={setProductPictures}
        // listBrand={listBrand}
        listCategory={listCategory}
        listProduct={listProduct}
      />
      <ViewProductModal
        show={showView}
        handleClose={handleCloseView}
        onSubmit={handleCloseView}
        modalTitle={"Product"}
        name={name}
        price={price}
        quantity={quantity}
        discount={discount}
        description={description}
        description_detail={description_detail}
        // brandId={brandId}
        categoryId={categoryId}
        // category={category}
        productPictures={productPictures}
        // listBrand={listBrand}
        listCategory={listCategory}
        listProduct={listProduct}
      />
      <DeleteProductModal
        show={showDeleteModal}
        handleClose={() => {
          setShowDeleteModal(false);
          setProduct({});
          setName("");
        }}
        modalTitle={"Delete Product"}
        onSubmit={handleCloseDelete}
        name={name}
      />
      <EditProductModal
        show={showEditModal}
        handleClose={() => {
          setShowEditModal(false);
          setProduct({});
        }}
        onSubmit={handleCloseEdit}
        modalTitle={"Edit Product"}
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        quantity={quantity}
        setQuantity={setQuantity}
        discount={discount}
        setDiscount={setDiscount}
        description={description}
        setDescription={setDescription}
        description_detail={description_detail}
        setDescriptionDetail={setDescriptionDetail}
        // brandId={brandId}
        // setBrandId={setBrandId}
        // category={category}
        // setCategory={setCategory}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        productPictures={productPictures}
        setProductPictures={setProductPictures}
        // listBrand={listBrand}
        listCategory={listCategory}
        listProduct={listProduct}
      />
    </Layout>
  );
};

export default Product;
