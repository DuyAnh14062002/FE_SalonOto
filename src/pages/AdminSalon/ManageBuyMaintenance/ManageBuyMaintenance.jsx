import React, { useEffect, useState } from "react";
import userApi from "../../../apis/user.api";
import invoiceApi from "../../../apis/invoice.api";
import salonApi from "../../../apis/salon.api";
import { Form, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import maintenanceApi from "../../../apis/maintenance.api";
import { formatCurrency } from "../../../utils/common";
import { debounce } from "lodash";
import { PaginationControl } from "react-bootstrap-pagination-control";
const LIMIT = 4;

export default function ManageBuyMaintenance() {
  const [permissions, setPermission] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [salon, setSalon] = useState({});
  const [invoices, setInvoices] = useState([]);
  const [maintenanceItem, setMaintenanceItem] = useState({});
  const [maintenances, setMaintenances] = useState([]);
  const [showInfor, setShowInfo] = useState(false);
  const [invoiceChoose, setInvoiceChoose] = useState({});
  // const [allMaintenance, setAllMaintenance] = useState([])
  const [searchInput, setSearchInput] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [accessory, setAccessory] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const searchValue = e.target.value;
    debounce(() => {
      setPage(1);
      loadingInvoice(1, searchValue);
    }, 1000);
  };
  const loadingUser = async () => {
    let res = await userApi.getProfile();
    if (res?.data?.profile?.permissions) {
      setPermission(res.data.profile.permissions);
    }
  };
  const loadingMaintenance = async (id) => {
    let res = await maintenanceApi.getAllMaintenanceOfSalon(id);
    if (res?.data?.maintenance) {
      const allMaintenances = res.data.maintenance;
      const newAllMaintenances = allMaintenances.map((item) => {
        return { ...item, checked: false };
      });
      setMaintenances(newAllMaintenances);
    }
  };
  const loadingAccessory = async (salon_id) => {
    let res = await invoiceApi.getAccessory(salon_id);
    if (res?.data?.accessory) {
      const allAccessory = res.data.accessory;
      const newAllAccessory = allAccessory.map((item) => {
        return { ...item, checked: false };
      });
      setAccessory(newAllAccessory);
    }
  };

  const fetchDataSalon = async () => {
    const res = await salonApi.getSalonInfor();
    if (res?.data?.salon) {
      loadingMaintenance(res.data.salon.salon_id);
      loadingAccessory(res.data.salon.salon_id);
      setSalon(res.data.salon);
    }
  };
  const loadingInvoice = async (page, search) => {
    let res = await invoiceApi.getAllInvoiceMaintain(page, LIMIT, search);
    if (res?.data?.invoices) {
      setInvoices(res.data.invoices);
      setTotalPage(res.data.total_page);
    }
  };
  useEffect(() => {
    loadingUser();
    fetchDataSalon();
  }, []);
  useEffect(() => {
    loadingInvoice(page, search);
  }, [search, page]);
  const handleCloseAdd = () => {
    setShowAdd(false);
  };
  const handleShowAdd = () => {
    const allAccessory = accessory;
    const newAllAccessory = allAccessory.map((item) => {
      return { ...item, checked: false };
    });
    setAccessory(newAllAccessory);

    const allMaintenances = maintenances;
    const newAllMaintenances = allMaintenances.map((item) => {
      return { ...item, checked: false };
    });
    setMaintenances(newAllMaintenances);

    setShowAdd(true);
  };
  const handleShowDelete = (invoice) => {
    setShowDelete(true);
    setInvoiceChoose(invoice);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const handleShowInfor = (invoice) => {
    setInvoiceChoose(invoice);
    setShowInfo(true);
  };
  const handleCloseInfor = () => {
    setShowInfo(false);
  };
  const handleShowUpdate = (invoice) => {
    console.log("invoice : ", invoice);
    setMaintenanceItem(invoice);
    setMaintenances((prev) => {
      return prev?.map((maintenance) => {
        if (
          invoice.maintenanceServices.find((f) => f.name === maintenance.name)
        ) {
          return { ...maintenance, checked: true };
        }
        return { ...maintenance, checked: false };
      });
    });
    setAccessory((prev) =>
      prev.map((item) => {
        if (invoice.accessories.find((f) => f?.name === item?.name)) {
          return { ...item, checked: true };
        }
        return { ...item, checked: false };
      })
    );
    setShowUpdate(true);
  };
  const handleCloseUpdate = () => {
    setShowUpdate(false);
  };
  const onChange = (e) => {
    setMaintenanceItem({ ...maintenanceItem, [e.target.name]: e.target.value });
  };

  const handleAddMaintenance = async (e) => {
    e.preventDefault();
    const listMaintenanceChecked = maintenances.filter((item) => item.checked);
    const listMaintenanceId = listMaintenanceChecked.map((item) => ({
      maintenance_id: item.maintenance_id.toString(),
      quantity: 1,
    }));

    const listAccessoryChecked = accessory.filter((item) => item.checked);
    const listAccessoryId = listAccessoryChecked.map((item) => ({
      accessory_id: item.accessory_id.toString(),
      quantity: 1,
    }));
    let res = await invoiceApi.createMaintenanceInvoice(
      maintenanceItem,
      listMaintenanceId,
      listAccessoryId
    );
    if (res?.data?.status === "success") {
      toast.success("Thêm giao dịch bảo dưỡng thành công");
      handleCloseAdd();
      loadingInvoice(page, search);
      setMaintenanceItem({});
    } else {
      toast.error("Thêm giao dịch bảo dưỡng thất bại");
    }
  };

  const handleChangeMaintenance = (maintenance_id) => {
    const newAllMaintenances = maintenances.map((item) => {
      if (item.maintenance_id === maintenance_id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setMaintenances(newAllMaintenances);
  };
  const handleChangeSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleDelete = async () => {
    let res = await invoiceApi.deleteInvoiceMaintenance(
      invoiceChoose.invoice_id
    );
    if (res?.data?.status === "success") {
      toast.success("Xóa giao dịch thành công");
      setInvoiceChoose({});
      handleCloseDelete();
      loadingInvoice(page, search);
    } else {
      toast.error("Xóa giao dịch thất bại");
    }
  };
  const handleUpdateMaintenance = async (e) => {
    e.preventDefault();
    const listMaintenanceChecked = maintenances.filter((item) => item.checked);
    const listMaintenanceId = listMaintenanceChecked.map((item) => ({
      maintenance_id: item.maintenance_id.toString(),
      quantity: 1,
    }));

    const listAccessoryChecked = accessory.filter((item) => item.checked);
    const listAccessoryId = listAccessoryChecked.map((item) => ({
      accessory_id: item.accessory_id.toString(),
      quantity: 1,
    }));
    let res = await invoiceApi.updateInvoiceMaintenance(
      maintenanceItem,
      listMaintenanceId,
      listAccessoryId
    );
    if (res?.data?.status === "success") {
      toast.success("Cập nhật giao dịch bảo dưỡng thành công");
      handleCloseUpdate();
      setMaintenanceItem({});
      loadingInvoice(page, search);
    } else {
      toast.error("Cập nhật giao dịch bảo dưỡng thất bại");
    }
  };
  const handleChangeAccessory = (data) => {
    const newAllAccessory = accessory.map((item) => {
      if (item.accessory_id === data.accessory_id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setAccessory(newAllAccessory);
  };

  return (
    <>
      <div id="content" className="container-fluid">
        <div className="card">
          <div className="card-header fw-bold">
            <h4 className="text-center fw-bold py-1 my-0">
              Danh sách các giao dịch bảo dưỡng xe
            </h4>
          </div>
          <div className="card-body">
            <div className="my-3 d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-between align-items-center">
                <span style={{ width: "100px" }}>Tìm kiếm:</span>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="form-control"
                  style={{ width: "100%" }}
                  placeholder="Nhập tên khách hàng"
                  value={search}
                  onChange={handleSearch}
                />
              </div>
              {(permissions?.includes("OWNER") ||
                permissions.includes("C_BC")) && (
                <button className="btn btn-success" onClick={handleShowAdd}>
                  Thêm giao dịch bảo dưỡng xe
                </button>
              )}
            </div>
            <table className="table mt-4 table-hover" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    STT
                  </th>
                  <th scope="col" style={{ width: "20%" }}>
                    Biển số xe
                  </th>
                  <th scope="col">Tên xe</th>
                  <th scope="col">Tên khách hàng</th>
                  <th scope="col">Email</th>
                  <th scope="col">Số điện thoại</th>
                  <th scope="col">Tổng chi phí</th>
                  <th
                    scope="col"
                    className="text-center"
                    style={{ width: "15%" }}
                  >
                    Tác vụ
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoices && invoices.length > 0 ? (
                  invoices.map((invoice, index) => (
                    <tr key={index} style={{ background: "rgb(247 247 247)" }}>
                      <td className="text-center">
                        {LIMIT * (page - 1) + (index + 1)}
                      </td>
                      <td>{invoice.licensePlate || searchInput}</td>
                      <td>{invoice.carName}</td>
                      <td>{invoice.fullname}</td>
                      <td>{invoice.email}</td>
                      <td>{invoice.phone}</td>
                      <td>{formatCurrency(invoice.total)}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-warning btn-sm rounded-0 text-white"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="info"
                          onClick={() => handleShowInfor(invoice)}
                        >
                          <i className="fa-solid fa-circle-question"></i>
                        </button>
                        {(permissions?.includes("OWNER") ||
                          permissions.includes("U_IV")) && (
                          <button
                            className="btn btn-success btn-sm rounded-0 text-white mx-2"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Edit"
                            onClick={() => handleShowUpdate(invoice)}
                          >
                            <i className="fa fa-edit"></i>
                          </button>
                        )}
                        {(permissions?.includes("OWNER") ||
                          permissions.includes("D_IV")) && (
                          <button
                            to="/"
                            className="btn btn-danger btn-sm rounded-0 text-white"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Delete"
                            onClick={() => handleShowDelete(invoice)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="fst-italic">
                      Không có dữ liệu nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {invoices && invoices.length > 0 && (
              <div className="d-flex justify-content-center ">
                <PaginationControl
                  page={page}
                  total={totalPage * LIMIT || 0}
                  limit={LIMIT}
                  changePage={(page) => {
                    setPage(page);
                  }}
                  ellipsis={1}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static">
        <Form onSubmit={handleAddMaintenance}>
          <Modal.Header closeButton>
            <Modal.Title> Thêm mới giao dịch bảo dưỡng </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mt-4">
              <Form.Label>Biển số xe</Form.Label>
              <Form.Control
                required
                type="text"
                name="licensePlate"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Tên xe</Form.Label>
              <Form.Control
                required
                type="text"
                name="carName"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Tên khách hàng</Form.Label>
              <Form.Control
                required
                type="text"
                name="fullname"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                required
                type="text"
                name="phone"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="text"
                name="email"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-3 feature">
              <Form.Label>Chọn các dịch vụ bảo dưỡng</Form.Label>
              {maintenances &&
                maintenances.map((item, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    checked={item.checked}
                    onChange={() =>
                      handleChangeMaintenance(item.maintenance_id)
                    }
                    value={item.maintenance_id}
                    label={item.name}
                  />
                ))}
            </Form.Group>
            <Form.Group className="mt-3 feature">
              <Form.Label>Chọn các phụ tùng sửa chữa</Form.Label>
              {accessory &&
                accessory.map((item, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleChangeAccessory(item)}
                    value={item.accessory_id}
                    label={item?.name}
                  />
                ))}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAdd}>
              Đóng
            </Button>
            <Button variant="primary" disabled={isLoading} type="submit">
              {isLoading && <Spinner animation="border" size="sm" />}
              <span className="mx-2">Thêm</span>
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal
        show={showInfor}
        onHide={handleCloseInfor}
        size="lg"
        backdrop="static"
      >
        <Form>
          <Modal.Header closeButton>
            <Modal.Title> Thông tin chi tiết dịch vụ đã bảo dưỡng </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="container">
              <h2 class="text-center">Bảng dịch vụ bảo dưỡng</h2>
              <table class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Tên dịch vụ bảo hành</th>
                    <th scope="col">Giá (VND)</th>
                    <th scope="col">Ngày bảo hành</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceChoose?.maintenanceServices?.length > 0 &&
                    invoiceChoose.maintenanceServices.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.cost}</td>
                          <td>{invoiceChoose?.invoiceDate}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <h2 class="text-center">Bảng phụ tùng sửa chữa</h2>
              <table class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Tên dịch vụ bảo hành</th>
                    <th scope="col">Giá (VND)</th>
                    <th scope="col">Ngày bảo hành</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceChoose?.accessories?.length > 0 &&
                    invoiceChoose.accessories.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                          <td>{invoiceChoose?.invoiceDate}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseInfor}>
              Đóng
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Xóa giao dịch bảo dưỡng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>Bạn có chắc chắn muốn xóa giao dịch này không ?</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showUpdate} onHide={handleCloseUpdate} backdrop="static">
        <Form onSubmit={handleUpdateMaintenance}>
          <Modal.Header closeButton>
            <Modal.Title> Cập nhật giao dịch bảo dưỡng </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mt-4">
              <Form.Label>Biển số xe</Form.Label>
              <Form.Control
                required
                type="text"
                name="licensePlate"
                onChange={onChange}
                value={maintenanceItem.licensePlate}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Tên xe</Form.Label>
              <Form.Control
                required
                type="text"
                name="carName"
                onChange={onChange}
                value={maintenanceItem.carName}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Tên khách hàng</Form.Label>
              <Form.Control
                required
                type="text"
                name="fullname"
                onChange={onChange}
                value={maintenanceItem.fullname}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                required
                type="text"
                name="phone"
                onChange={onChange}
                value={maintenanceItem.phone}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="text"
                name="email"
                onChange={onChange}
                value={maintenanceItem.email}
              />
            </Form.Group>
            <Form.Group className="mt-3 feature">
              <Form.Label>Chọn các dịch vụ bảo dưỡng</Form.Label>
              {maintenances &&
                maintenances.map((item, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    checked={item.checked}
                    onChange={() =>
                      handleChangeMaintenance(item.maintenance_id)
                    }
                    value={item.maintenance_id}
                    label={item.name}
                  />
                ))}
            </Form.Group>
            <Form.Group className="mt-3 feature">
              <Form.Label>Chọn các phụ tùng sửa chữa</Form.Label>
              {accessory &&
                accessory.map((item, index) => (
                  <Form.Check
                    key={index}
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleChangeAccessory(item)}
                    value={item.accessory_id}
                    label={item?.name}
                  />
                ))}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUpdate}>
              Đóng
            </Button>
            <Button variant="primary" disabled={isLoading} type="submit">
              {isLoading && <Spinner animation="border" size="sm" />}
              <span className="mx-2">Cập nhật</span>
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
