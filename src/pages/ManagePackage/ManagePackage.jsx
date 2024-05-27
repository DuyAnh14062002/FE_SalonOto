import "./ManagePackage.scss";
import { useEffect, useState } from "react";
import { Form, Image, ListGroup, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import packageApi from "../../apis/package.api";
import { toast } from "react-toastify";
import featureApi from "../../apis/feature.api";
import { formatCurrency } from "../../utils/common";
import { debounce } from "lodash";
import { PaginationControl } from "react-bootstrap-pagination-control";
const LIMIT = 5;

export default function ManagePackage() {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [packagesList, setPackagesList] = useState([]);
  const [file, setFile] = useState(null);
  const [packageChoose, setPackageChoose] = useState({});
  const [pkg, setPkg] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [allFeatures, setAllFeatures] = useState([]);
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
    const res = await packageApi.getAllPackage(page, LIMIT, search);
    if (res.data?.packages) {
      const packages = res.data.packages.reverse();
      setPackagesList(packages);
      setTotalPage(res.data.total_page);
    }
  };
  const fetchAllFeatures = async () => {
    const res = await featureApi.getAllFeature();
    if (res?.data?.features?.features) {
      const allFeatures = res.data.features.features;
      const newAllFeatures = allFeatures.map((feature) => {
        return { ...feature, checked: false };
      });
      setAllFeatures(newAllFeatures);
    }
  };

  const onChange = (e) => {
    setPkg({ ...pkg, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    // call api to get features
    fetchAllFeatures();
    fetchData(page, search);
  }, [page, search]);
  // Handle show modal
  const handleShow = () => {
    setShow(true);
  };
  const handleShowEdit = (packageItem) => {
    setPackageChoose(packageItem);
    setAllFeatures((prev) =>
      prev.map((feature) => {
        if (
          packageItem.features.find((f) => f.feature_id === feature.feature_id)
        ) {
          return { ...feature, checked: true };
        }
        return { ...feature, checked: false };
      })
    );
    setPkg({
      name: packageItem.name,
      description: packageItem.description,
      price: packageItem.price,
    });
    setShowEdit(true);
  };
  const handleShowDelete = (feature) => {
    setPackageChoose(feature);
    setShowDelete(true);
  };
  const handleShowInfo = (packageItem) => {
    setPackageChoose(packageItem);
    setShowInfo(true);
  };

  // Handle close modal
  const handleClose = () => {
    setShow(false);
  };
  const handleCloseDelete = () => {
    setPackageChoose({});
    setShowDelete(false);
  };
  const handleCloseEdit = () => {
    setPackageChoose({});
    setPkg({});
    setShowEdit(false);
  };
  const handleCloseInfo = () => {
    setPackageChoose({});
    setShowInfo(false);
  };

  const onFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleChangeFeature = (feature_id) => {
    const newAllFeatures = allFeatures.map((feature) => {
      if (feature.feature_id === feature_id) {
        return { ...feature, checked: !feature.checked };
      }
      return feature;
    });
    setAllFeatures(newAllFeatures);
  };
  const setAllFeaturesChecked = () => {
    const newAllFeatures = allFeatures.map((feature) => {
      return { ...feature, checked: false };
    });
    setAllFeatures(newAllFeatures);
  };
  const handleAddPackage = async (e) => {
    try {
      e.preventDefault();
      const listFeatureChecked = allFeatures.filter(
        (feature) => feature.checked
      );
      const listFeatureId = listFeatureChecked.map((feature) =>
        feature.feature_id.toString()
      );

      const form = new FormData();
      form.append("name", pkg.name);
      form.append("description", pkg.description);
      form.append("price", pkg.price);
      form.append("image", file);
      listFeatureId.forEach((featureId) => {
        form.append("features[]", featureId);
      });
      setIsLoading(true);
      const res = await packageApi.createPackage(form);
      console.log(res);

      setPkg({});
      handleClose();
      fetchData(page, search);
      setAllFeaturesChecked();
      toast.success("Thêm gói thành công");
    } catch (error) {
      toast.error("Thêm gói thất bại");
    } finally {
      setIsLoading(false);
    }
  };
  const handleEditPackage = async () => {
    try {
      const listFeatureChecked = allFeatures.filter(
        (feature) => feature.checked
      );
      const listFeatureId = listFeatureChecked.map((feature) =>
        feature.feature_id.toString()
      );
      const form = new FormData();
      form.append("name", pkg.name);
      form.append("description", pkg.description);
      form.append("price", pkg.price);
      form.append("image", file);
      listFeatureId.forEach((featureId) => {
        form.append("features[]", featureId);
      });
      setIsLoading(true);
      const res = await packageApi.updatePackage(
        packageChoose.package_id,
        form
      );
      console.log(res);
      setPkg({});
      setFile(null);
      handleCloseEdit();
      fetchData(page, search);
      setAllFeaturesChecked();
      toast.success("Cập nhật gói thành công");
    } catch (error) {
      toast.error("Cập nhật gói thất bại");
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async () => {
    try {
      await packageApi.deletePackage(packageChoose.package_id);
      toast.success("Xóa gói thành công");
      handleCloseDelete();
      fetchData(page, search);
    } catch (error) {
      toast.error("Xóa gói thất bại");
    }
  };

  return (
    <>
      <div id="content" className="container-fluid">
        <div className="card">
          <div className="card-header font-weight-bold">
            <h4 className="text-center fw-bold py-1 my-0">Danh sách các gói</h4>
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
                  placeholder="Nhập tên gói"
                  value={search}
                  onChange={handleSearch}
                />
              </div>
              <button className="btn btn-success" onClick={handleShow}>
                Thêm gói
              </button>
            </div>
            <table className="table mt-4 table-hover">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    STT
                  </th>
                  <th scope="col" className="text-center">
                    Ảnh
                  </th>
                  <th scope="col" className="text-center">
                    Tên gói
                  </th>
                  <th scope="col">Mô tả gói</th>
                  <th scope="col" className="text-center">
                    Giá
                  </th>
                  <th scope="col" className="text-center">
                    Tác vụ
                  </th>
                </tr>
              </thead>
              <tbody>
                {packagesList && packagesList.length > 0 ? (
                  packagesList.map((packageItem, index) => (
                    <tr
                      style={{ background: "rgb(247 247 247)" }}
                      key={packageItem.package_id}
                    >
                      <td className="text-center">
                        {LIMIT * (page - 1) + (index + 1)}
                      </td>
                      <td className="text-center">
                        <img
                          width="200"
                          height="200"
                          src={packageItem?.image}
                          alt=""
                        />
                      </td>
                      <td className="text-center">{packageItem?.name}</td>
                      <td>{packageItem?.description}</td>
                      <td className="text-center">
                        {formatCurrency(packageItem?.price)}
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-warning btn-sm rounded-0 text-white"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="info"
                          onClick={() => handleShowInfo(packageItem)}
                        >
                          <i className="fa-solid fa-circle-question"></i>
                        </button>
                        <button
                          className="btn btn-success btn-sm rounded-0 text-white mx-2"
                          type="button"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Edit"
                          onClick={() => handleShowEdit(packageItem)}
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-danger btn-sm rounded-0 text-white"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Delete"
                          onClick={() => handleShowDelete(packageItem)}
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
            {packagesList && packagesList.length > 0 && (
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
          <Form onSubmit={handleAddPackage}>
            <Modal.Header closeButton>
              <Modal.Title>Thêm gói dịch vụ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group md="4">
                <Form.Label>Tên gói</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  value={pkg.name}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group controlId="formFile" className="mt-3">
                <Form.Label>Hình ảnh gói</Form.Label>
                <Form.Control type="file" onChange={onFileChange} required />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={4}
                  name="description"
                  value={pkg.description}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Giá 1 tháng</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="price"
                  value={pkg.price}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3 feature" required>
                <Form.Label>Chọn tính năng</Form.Label>
                {allFeatures &&
                  allFeatures.map((feature) => (
                    <Form.Check
                      key={feature.feature_id}
                      type="checkbox"
                      checked={feature.checked}
                      onChange={() => handleChangeFeature(feature.feature_id)}
                      value={feature.feature_id}
                      label={feature.name}
                    />
                  ))}
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Đóng
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="d-flex align-items-center"
                disabled={isLoading}
              >
                {isLoading && <Spinner animation="border" size="sm" />}
                <span className="mx-2">Thêm gói</span>
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static">
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Cập nhật gói dịch vụ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group md="4">
                <Form.Label>Tên gói</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  value={pkg.name}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group controlId="formFile" className="mt-3">
                <Form.Label>Hình ảnh gói</Form.Label>
                <Form.Control type="file" onChange={onFileChange} />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  required
                  name="description"
                  as="textarea"
                  rows={4}
                  value={pkg.description}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Giá 1 tháng</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="price"
                  value={pkg.price}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group className="mt-3 feature">
                <Form.Label>Chọn tính năng</Form.Label>
                {allFeatures &&
                  allFeatures.map((feature) => (
                    <Form.Check
                      key={feature.feature_id}
                      type="checkbox"
                      checked={feature.checked}
                      onChange={() => handleChangeFeature(feature.feature_id)}
                      value={feature.feature_id}
                      label={feature.name}
                    />
                  ))}
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEdit}>
                Đóng
              </Button>
              <Button
                variant="primary"
                onClick={handleEditPackage}
                disabled={isLoading}
              >
                {isLoading && <Spinner animation="border" size="sm" />}
                <span className="mx-2">Cập nhật</span>
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
        <Modal show={showInfo} onHide={handleCloseInfo} backdrop="static">
          <Form noValidate>
            <Modal.Header closeButton>
              <Modal.Title>Xem chi tiết gói dịch vụ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group
                controlId="formFile"
                className="mt-3 d-flex justify-content-center"
              >
                <Image
                  src={packageChoose.image}
                  rounded
                  width="200"
                  height="auto"
                />
              </Form.Group>
              <Form.Group className="mt-4">
                <Form.Label>Tên gói</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={packageChoose.name}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={packageChoose.description}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Giá 1 tháng</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={packageChoose.price}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mt-3 feature" disabled>
                <Form.Label>Các tính năng</Form.Label>
                <ListGroup>
                  {packageChoose.features?.length > 0 ? (
                    packageChoose.features?.map((feature) => (
                      <ListGroup.Item key={feature.feature_id}>
                        <i className="fa-solid fa-circle"></i>
                        <span className="mx-2">{feature.name}</span>
                      </ListGroup.Item>
                    ))
                  ) : (
                    <ListGroup.Item>
                      <span className="mx-2">Không có tính năng nào</span>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseInfo}>
                Đóng
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
              <strong>{packageChoose && packageChoose.name}</strong> này không ?
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
