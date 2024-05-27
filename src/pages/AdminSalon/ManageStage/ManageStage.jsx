import React from "react";
import { Form, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import salonApi from "../../../apis/salon.api";
import processApi from "../../../apis/process.api";
import userApi from "../../../apis/user.api";
import stageApi from "../../../apis/stage.api";

export default function ManageStage() {
  const [isLoading, setIsLoading] = useState(false);
  const [listStage, setListStage] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [salon, setSalon] = useState({});
  const [listProcess, setListProcess] = useState([]);
  const [permissions, setPermission] = useState([]);
  const [selectedProcess, setSelectedProcess] = useState("");
  const [process, setProcess] = useState({});
  const [selectedStage, setSelectedStage] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    details: [""],
    order: "",
    commissionRate: 0,
  });
  const loadingUser = async () => {
    let res = await userApi.getProfile();
    if (res?.data?.profile?.permissions) {
      setPermission(res.data.profile.permissions);
    }
  };
  const fetchSalon = async () => {
    const res = await salonApi.getSalonInfor();
    if (res?.data?.salon) {
      setSalon(res.data.salon);
    }
  };
  const fetchAllProcess = async () => {
    const res = await processApi.getAllProcess({
      salonId: salon.salon_id,
    });
    if (res?.data?.data) {
      setListProcess(res.data.data);
    }
  };
  const getProcessById = async (processId) => {
    const res = await processApi.getAllProcess({
      salonId: salon.salon_id,
      processId,
    });
    console.log("res", res);
    if (res?.data?.data) {
      setProcess(res.data.data);
    }
  };
  const fetchAllStageForHoaTieu = async () => {
    let res = await stageApi.getAllStageByProcessId(selectedProcess);
    setListStage(res.data.stage);
  };

  useEffect(() => {
    fetchSalon();
    loadingUser();
  }, []);
  useEffect(() => {
    if (salon?.salon_id) {
      fetchAllProcess();
    }
  }, [salon.salon_id]);
  useEffect(() => {
    if (listProcess?.length > 0) {
      setSelectedProcess(listProcess[0].id);
    }
  }, [listProcess]);
  useEffect(() => {
    if (selectedProcess) {
      getProcessById(selectedProcess);
    }
  }, [selectedProcess]);
  useEffect(() => {
    if (process?.type === 0) {
      setListStage(process.documents);
    }
  }, [process]);
  useEffect(() => {
    if (process?.type === 1) {
      fetchAllStageForHoaTieu();
    }
  }, [process]);
  const handleCloseUpdate = () => {
    setShowUpdate(false);
  };
  const handleShowUpdate = (stage) => {
    console.log("stage", stage);
    setSelectedStage(stage);
    if (process.type === 0) {
      setFormData({
        name: stage.name,
        details: stage.details.map((detail) => detail.name),
        order: stage.order,
      });
    } else {
      setFormData({
        name: stage.name,
        details: stage.commissionDetails.map((detail) => detail.name),
        order: stage.order,
        commissionRate: stage.commissionRate,
      });
    }
    setShowUpdate(true);
  };
  const handleCloseAdd = () => {
    setShowAdd(false);
  };
  const handleShowAdd = () => {
    setShowAdd(true);
  };
  const handleCloseDelete = () => {
    setShowDelete(false);
  };
  const handleShowDelete = (stage) => {
    setSelectedStage(stage);
    setShowDelete(true);
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProcessChange = (event) => {
    setSelectedProcess(event.target.value);
  };
  const handleUpdateStage = async (e) => {
    e.preventDefault();
    let dataToSend;
    if (process?.type === 0) {
      dataToSend = {
        name: formData.name,
        salonId: salon.salon_id,
        order: formData.order,
        processId: selectedProcess,
        period: selectedStage.period,
        details: formData.details.filter((detail) => detail.trim() !== ""), // Lọc bỏ các giá trị rỗng trong mảng details
      };
    } else {
      dataToSend = {
        name: formData.name,
        order: formData.order,
        details: formData.details.filter((detail) => detail.trim() !== ""), // Lọc bỏ các giá trị rỗng trong mảng details
        commissionRate: formData.commissionRate,
      };
    }

    setIsLoading(true);
    let res;
    if (process?.type === 0) {
      res = await stageApi.updateStage(dataToSend);
      getProcessById(process.id);
    } else {
      res = await stageApi.updateStageForHoaTieu(
        selectedStage.stage_id,
        dataToSend
      );
      fetchAllStageForHoaTieu();
    }
    handleCloseUpdate();
    if (res?.data?.status && res.data.status === "success") {
      toast.success("Cập nhật thông tin giai đoạn thành công");
      setIsLoading(false);
      if (process?.type === 1) {
        setFormData({
          name: "",
          details: [""],
          order: "",
          commissionRate: 0,
        });
      } else {
        setFormData({
          name: "",
          details: [""],
          order: "",
        });
      }
      setSelectedStage({});
    } else {
      toast.error("Cập nhật thông tin giai đoạn thất bại");
      setIsLoading(false);
    }
  };

  const handleAddStage = async (e) => {
    e.preventDefault();
    const dataToSend = {
      name: formData.name,
      salonId: salon.salon_id,
      order: formData.order,
      processId: selectedProcess,
      details: formData.details.filter((detail) => detail.trim() !== ""), // Lọc bỏ các giá trị rỗng trong mảng details
    };
    setIsLoading(true);
    let res;
    if (process?.type === 1) {
      dataToSend.commissionRate = formData.commissionRate;
      res = await stageApi.createStageForHoaTieu(dataToSend);
    } else {
      res = await stageApi.createStage(dataToSend);
    }
    handleCloseAdd();
    getProcessById(process.id);
    if (res?.data?.status && res.data.status === "success") {
      toast.success("Thêm thông tin giai đoạn thành công");
      setIsLoading(false);
      if (process?.type === 1) {
        setFormData({
          name: "",
          details: [""],
          order: "",
          commissionRate: 0,
        });
      } else {
        setFormData({
          name: "",
          details: [""],
          order: "",
        });
      }
    } else {
      toast.error("Thêm thông tin giai đoạn thất bại");
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    let res;
    if (process.type === 0) {
      res = await stageApi.deleteStage({
        salonId: salon.salon_id,
        period: selectedStage.period,
      });
    } else {
      res = await stageApi.deleteStageForHoaTieu(selectedStage.stage_id);
    }
    handleCloseDelete();
    if (res?.data?.status && res.data.status === "success") {
      toast.success("Xóa thông tin giai đoạn thành công");
      if (process.type === 0) {
        getProcessById(process.id);
      } else {
        fetchAllStageForHoaTieu();
      }
      setSelectedStage({});
    } else {
      toast.error("Xóa thông tin giai đoạn thất bại");
    }
  };
  console.log("process", process);

  const handleAddContent = (index) => {
    const newDetails = [...formData.details];
    newDetails.splice(index + 1, 0, "");
    setFormData({
      ...formData,
      details: newDetails,
    });
  };
  const handleChange = (index, e) => {
    const newDetails = [...formData.details];
    newDetails[index] = e.target.value;
    setFormData({
      ...formData,
      details: newDetails,
    });
  };

  const handleRemoveContent = (index) => {
    const newDetails = formData.details.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      details: newDetails,
    });
  };

  return (
    <>
      <div id="content" className="container-fluid">
        <div className="card">
          <div className="card-header fw-bold">
            <h4 className="text-center fw-bold py-1 my-0">
              Danh sách các giai đoạn
            </h4>
          </div>
          <div className="card-body">
            <div className="my-3 d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-between align-items-center">
                <span
                  className="form-label"
                  style={{ width: "145px", margin: "0" }}
                >
                  Chọn loại quy trình
                </span>
                <select
                  className="form-select"
                  value={selectedProcess}
                  onChange={handleProcessChange}
                  style={{ width: "210px" }}
                >
                  {listProcess?.map((process) => (
                    <option key={process.id} value={process.id}>
                      {process.name}
                    </option>
                  ))}
                </select>
              </div>
              {(permissions?.includes("OWNER") ||
                permissions.includes("postStage")) && (
                <button className="btn btn-success" onClick={handleShowAdd}>
                  Thêm giai đoạn
                </button>
              )}
            </div>
            <table className="table mt-4 table-hover">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    STT
                  </th>
                  <th scope="col">Tên giai đoạn</th>
                  <th scope="col">Nội dung giai đoạn</th>
                  <th scope="col" className="text-center">
                    Thứ tự giai đoạn
                  </th>
                  {process?.type === 1 && (
                    <th scope="col" className="text-center">
                      Hoa hồng (%)
                    </th>
                  )}
                  <th scope="col" className="text-center">
                    Tác vụ
                  </th>
                </tr>
              </thead>
              <tbody>
                {listStage?.length > 0 ? (
                  listStage?.map((stage, index) => (
                    <tr>
                      <th
                        scope="row"
                        className="text-center"
                        style={{
                          display: "table-cell",
                          verticalAlign: "middle",
                        }}
                      >
                        {++index}
                      </th>
                      <td>{stage.name}</td>
                      <td>
                        {process?.type === 0 && (
                          <ul>
                            {stage?.details?.map((detail, index) => (
                              <li key={index}>{detail.name}</li>
                            ))}
                          </ul>
                        )}
                        {process?.type === 1 && (
                          <ul>
                            {stage?.commissionDetails?.map((detail, index) => (
                              <li key={index}>{detail.name}</li>
                            ))}
                          </ul>
                        )}
                      </td>
                      <td className="text-center">{stage.order}</td>
                      {process?.type === 1 && (
                        <td className="text-center">{stage.commissionRate}</td>
                      )}
                      <td className="text-center">
                        <button
                          className="btn btn-success btn-sm rounded-0 text-white mx-2"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Edit"
                          onClick={() => handleShowUpdate(stage)}
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        <button
                          to="/"
                          className="btn btn-danger btn-sm rounded-0 text-white"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Delete"
                          onClick={() => handleShowDelete(stage)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="fst-italic">
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal show={showUpdate} onHide={handleCloseUpdate} backdrop="static">
        <Form onSubmit={handleUpdateStage}>
          <Modal.Header closeButton>
            <Modal.Title>Cập nhật giai đoạn</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mt-4">
              <Form.Label>Tên giai đoạn</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Thứ tự giai đoạn</Form.Label>
              <Form.Control
                required
                type="number"
                name="order"
                value={formData.order}
                onChange={onChange}
              />
            </Form.Group>
            {process?.type === 1 && (
              <Form.Group className="mt-4">
                <Form.Label>Phần trăm hoa hồng (%)</Form.Label>
                <Form.Control
                  required
                  type="number"
                  value={formData?.commissionRate}
                  name="commissionRate"
                  onChange={onChange}
                />
              </Form.Group>
            )}
            {formData?.details.map((detail, index) => (
              <div key={index} className="w-100">
                <div className="w-100 d-flex align-items-end mt-4">
                  <Form.Group style={{ width: "75%" }}>
                    <Form.Label>Nội dung {index + 1}</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={detail}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    style={{ marginLeft: "15px" }}
                    onClick={() => handleAddContent(index)}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </Button>
                  {index > 0 && (
                    <Button
                      variant="danger"
                      style={{ marginLeft: "5px" }}
                      onClick={() => handleRemoveContent(index)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">Đóng</Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading && <Spinner animation="border" size="sm" />}
              <span className="mx-2">Cập nhật</span>
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static">
        <Form onSubmit={handleAddStage}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm giai đoạn</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mt-4">
              <Form.Label>Tên giai đoạn</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Thứ tự giai đoạn</Form.Label>
              <Form.Control
                required
                type="number"
                name="order"
                onChange={onChange}
              />
            </Form.Group>
            {process?.type === 1 && (
              <Form.Group className="mt-4">
                <Form.Label>Phần trăm hoa hồng (%)</Form.Label>
                <Form.Control
                  required
                  type="number"
                  value={formData?.commissionRate}
                  name="commissionRate"
                  onChange={onChange}
                />
              </Form.Group>
            )}
            {formData.details.map((detail, index) => (
              <div key={index} className="w-100">
                <div className="w-100 d-flex align-items-end mt-4">
                  <Form.Group style={{ width: "75%" }}>
                    <Form.Label>Nội dung {index + 1}</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      value={detail}
                      onChange={(e) => handleChange(index, e)}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    style={{ marginLeft: "15px" }}
                    onClick={() => handleAddContent(index)}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </Button>
                  {index > 0 && (
                    <Button
                      variant="danger"
                      style={{ marginLeft: "5px" }}
                      onClick={() => handleRemoveContent(index)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  )}
                </div>
              </div>
            ))}
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
      <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Xóa giai đoạn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>
            Bạn có chắc chắn muốn xóa giai đoạn{" "}
            <strong>{selectedStage?.name}</strong> này không ?
          </span>
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
    </>
  );
}
