import "./ManageFeature.scss";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import featureApi from "../../apis/feature.api";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import { PaginationControl } from "react-bootstrap-pagination-control";
const LIMIT = 5;

export default function ManageFeature() {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [features, setFeatures] = useState([]);
  const [feature, setFeature] = useState({
    name: "",
    description: "",
    keyMap: "",
  });

  const [featureChoose, setFeatureChoose] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const searchValue = e.target.value;
    debounce(() => {
      setPage(1);
      fetchData(1, searchValue);
    }, 1000);
  };
  const fetchData = async (page, search) => {
    const res = await featureApi.getAllFeature(page, LIMIT, search);
    if (res?.data?.features?.features) {
      const features = res.data.features.features.reverse();
      setFeatures(features);
      setTotalPage(res.data.total_page);
    }
  };

  const onChange = (e) => {
    setFeature({ ...feature, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    // call api to get features
    fetchData(page, search);
  }, [page, search]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowEdit = (feature) => {
    setFeatureChoose(feature);
    setFeature({
      name: feature.name,
      description: feature.description,
      keyMap: feature.keyMap,
    });
    setShowEdit(true);
  };
  const handleCloseEdit = () => {
    setFeatureChoose(null);
    setShowEdit(false);
  };
  const handleShowDelete = (feature) => {
    setFeatureChoose(feature);
    setShowDelete(true);
  };
  const handleCloseDelete = () => {
    setFeatureChoose(null);
    setShowDelete(false);
  };

  const handleAddFeature = async (e) => {
    try {
      e.preventDefault();
      const res = await featureApi.createFeature(feature);
      setFeatures([...features, res.data.feature]);
      setFeature({});
      handleClose();
      fetchData(page, search);
      toast.success("Thêm tính năng thành công");
    } catch (error) {
      toast.error("Thêm tính năng thất bại");
    }
  };
  const handleEditFeature = async (e) => {
    try {
      e.preventDefault();
      await featureApi.updateFeature(featureChoose.feature_id, feature);
      handleCloseEdit();
      fetchData(page, search);
      setFeature({});
      toast.success("Cập nhật tính năng thành công");
    } catch (error) {
      toast.error("Cập nhật tính năng thất bại");
    }
  };
  const handleDelete = async () => {
    try {
      await featureApi.deleteFeature(featureChoose.feature_id);
      toast.success("Xóa tính năng thành công");
      handleCloseDelete();
      fetchData(page, search);
    } catch (error) {
      toast.error("Xóa tính năng thất bại");
    }
  };

  return (
    <>
      <div id="content" className="container-fluid">
        <div className="card">
          <div className="card-header fw-bold">
            <h4 className="text-center fw-bold py-1 my-0">
              Danh sách các tính năng
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
                  placeholder="Nhập tên tính năng"
                  value={search}
                  onChange={handleSearch}
                />
              </div>
              <button className="btn btn-success" onClick={handleShow}>
                Thêm tính năng
              </button>
            </div>
            <table className="table mt-4 table-hover">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    STT
                  </th>
                  <th scope="col">Tên tính năng</th>
                  <th scope="col">Mô tả tính năng</th>
                  <th scope="col">keyMap</th>
                  <th scope="col" className="text-center">
                    Tác vụ
                  </th>
                </tr>
              </thead>
              <tbody>
                {features && features.length > 0 ? (
                  features.map((feature, index) => (
                    <tr
                      key={feature.feature_id}
                      style={{ background: "rgb(247 247 247)" }}
                    >
                      <td className="text-center">
                        {" "}
                        {LIMIT * (page - 1) + (index + 1)}
                      </td>

                      <td>{feature.name}</td>
                      <td>{feature.description}</td>
                      <td>{feature.keyMap}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-success btn-sm rounded-0 text-white mx-2"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Edit"
                          onClick={() => handleShowEdit(feature)}
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        <button
                          to="/"
                          className="btn btn-danger btn-sm rounded-0 text-white"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Delete"
                          onClick={() => handleShowDelete(feature)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
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

            {features && features.length > 0 && (
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
        <Modal show={show} onHide={handleClose} backdrop="static">
          <Form onSubmit={handleAddFeature}>
            <Modal.Header closeButton>
              <Modal.Title>Thêm tính năng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group md="4">
                <Form.Label>Tên tính năng</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Mô tả tính năng</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  name="description"
                  rows={5}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group md="4" className="mt-3">
                <Form.Label>KeyMap</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="keyMap"
                  onChange={onChange}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Đóng
              </Button>
              <Button variant="primary" type="submit">
                Thêm
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static">
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Cập nhật tính năng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group md="4">
                <Form.Label>Tên tính năng</Form.Label>
                <Form.Control
                  required
                  name="name"
                  type="text"
                  value={feature.name}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Mô tả tính năng</Form.Label>
                <Form.Control
                  required
                  name="description"
                  as="textarea"
                  rows={5}
                  value={feature.description}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group md="4" className="mt-3">
                <Form.Label>KeyMap</Form.Label>
                <Form.Control
                  required
                  name="keyMap"
                  type="text"
                  value={feature.keyMap}
                  onChange={onChange}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEdit}>
                Đóng
              </Button>
              <Button variant="primary" onClick={handleEditFeature}>
                Cập nhật
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Xóa tính năng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span>
              Bạn có chắc chắn muốn xóa tính năng{" "}
              <strong>{featureChoose && featureChoose.name}</strong> này không ?
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
      </div>
    </>
  );
}
