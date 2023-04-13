import React from "react";
import { Modal } from "react-bootstrap";
import { ConvertIOStoDate } from "./ConvertStringToTime";

const InvoiceModal = (props) => {
  const { order, customer, handleShiped, handleCancel,handleDelivered } = props;
  const print = () => {
    var content = document.getElementById("printarea");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  };
  const status = order.orderStatus
    ? order.orderStatus.find((status) => status.isCompleted === true)
    : null;
  const date = new Date();
  return (
    <Modal size="xl" show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Invoice</Modal.Title>
      </Modal.Header>
      <iframe
        title="Invoice"
        id="ifmcontentstoprintIfr"
        style={{
          height: "0px",
          width: "0px",
          position: "absolute",
        }}
      ></iframe>
      <Modal.Body id="printarea">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="invoice p-3 mb-3">
                  {/* title row */}
                  <div className="row">
                    <div className="col-12">
                      <h4>
                        <i className="fas fa-globe" /> Shop Trần Lan
                        <small className="float-right">
                          Ngày:{" "}
                          {date.getDate() +
                            "/" +
                            (date.getMonth() + 1) +
                            "/" +
                            date.getFullYear()}
                        </small>
                      </h4>
                    </div>
                    {/* /.col */}
                  </div>
                  {/* info row */}
                  <div className="row invoice-info">
                    <div className="col-sm-4 invoice-col">
                      From
                      <address>
                        <strong>Trần Lan Shop</strong>
                        <br />
                        Chợ Cạn, Triệu Sơn, Triệu Phong, Quảng Trị
                        <br />
                        SĐT: 0919 410 234
                        <br />
                        Email: tranlan@gmail.com
                      </address>
                    </div>
                    {/* /.col */}
                    <div className="col-sm-4 invoice-col">
                      To
                      <address>
                        <strong>
                          {order.firstName + " " + order.lastName}
                        </strong>
                        <br />
                        Address: {order.address ? order.address : null}
                        <br />
                        Phone:{" "}
                        {order.phoneNumber ? order.phoneNumber : null}
                        <br />
                        Email: {order.email ? order.email : null}
                      </address>
                    </div>
                    {/* /.col */}
                    <div className="col-sm-4 invoice-col">
                      {/* <b>Invoice #007612</b> */}
                      <br />
                      <br />
                      <b>Order ID:</b> {order.codeBill}
                      <br />
                      <b>Order date:</b> {ConvertIOStoDate(order.createdAt)}
                      <br />
                    </div>
                    {/* /.col */}
                  </div>

                  <div className="row">
                    <div className="col-12 table-responsive">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th>STT</th>
                            <th>Sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Tiền</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.productDetail
                            ? order.productDetail.map((product, index) => (
                                <tr>
                                  {/* <td>{index + 1}</td> */}
                                  <td>{index + 1}</td>
                                  <td>{product.productId?.name}</td>
                                  <td>{product.purchasedQty}</td>
                                  <td>{product.payablePrice}</td>
                                </tr>
                              ))
                            : null}
                        </tbody>
                      </table>
                    </div>
                    {/* /.col */}
                  </div>
                  {/* /.row */}
                  <div className="row">
                    <div className="col-6">
                      <p>
                        <b>Payment Methods:</b>

                        {order.paymentType === "cod"
                          ? "Cash to deliver"
                          : "Card online"}
                      </p>
                      <p>
                        <b>Payment Status :</b>

                        {order.paymentStatus}
                      </p>
                      {order.paymentStatus === "pending" ? (
                        <p>
                          <b>Order Status :</b>
                          {status ? status.type : null}
                        </p>
                      ) : null}
                    </div>
                    {/* /.col */}
                    <div className="col-6">
                      <p className="lead"></p>
                      <div className="table-responsive">
                        <table className="table">
                          <tbody>
                            <tr>
                              <th style={{ width: "50%" }}>Subtotal:</th>
                              <td>{order.totalAmount} VNĐ</td>
                            </tr>

                            <tr>
                              <th>Shipping:</th>
                              <td>25 000 VNĐ</td>
                            </tr>
                            <tr>
                              <th>Total:</th>
                              <td>{order.totalAmount + 25000} VNĐ</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Modal.Body>
      <Modal.Footer>
        <div className="row no-print">
          <div className="col-12">
            <button
              type="button"
              className="btn btn-warning float-right"
              style={{ marginRight: "5px" }}
              onClick={props.handleClose}
            >
              <i className="fas fa-backspace" /> Back
            </button>
            {status ? (
              status.type === "ordered" ? (
                <>
                  <button
                    type="button"
                    className="btn btn-danger float-right"
                    style={{ marginRight: "5px" }}
                    value={order._id}
                    onClick={handleCancel}
                  >
                    <i className="fas fa-trash" /> Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-success float-right"
                    style={{ marginRight: "5px" }}
                    value={order._id}
                    onClick={handleShiped}
                  >
                    <i className="far fa-credit-card" /> Ship
                  </button>
                </>
              ) : status.type === "shipped" ?
               <button
              type="button"
              className="btn btn-success float-right"
              style={{ marginRight: "5px" }}
              value={order._id}
              onClick={handleDelivered}
            >
              <i className="far fa-credit-card" /> Delivered
            </button>  : null
            ) : null}

            <button
              type="button"
              className="btn btn-primary float-right"
              style={{ marginRight: "5px" }}
              onClick={print}
            >
              <i className="fas fa-print" /> Print
            </button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default InvoiceModal;
