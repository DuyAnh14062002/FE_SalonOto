import React, { useEffect, useState } from "react";
import "./ProcessForm.scss";
import { Stepper } from "react-form-stepper";
import processApi from "../../apis/process.api";
import { toast } from "react-toastify";
import invoiceApi from "../../apis/invoice.api";
import { useNavigate } from "react-router-dom";
import { path } from "../../constants/path";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import paymentRequestApi from "../../apis/paymentRequest.api";
import paymentMethodApi from "../../apis/paymentMethod.api";

const ProcessForm = ({
  invoice,
  salonId,
  carId,
  handleCloseModalProcess,
  loadingInvoice,
}) => {
  const [detailProcess, setDetailProcess] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [checkedDetails, setCheckedDetails] = useState([]);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [periodCurrent, setPeriodCurrent] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [paymentRequestItem, setPaymentRequestItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [listPaymentMethod, setListPaymentMethod] = useState([]);
  const navigate = useNavigate();

  const [methodPaymentId, setMethodPaymentId] = useState("");

  const fetchListPaymentMethod = async () => {
    const res = await paymentMethodApi.getAllPaymentMethod();
    if (res?.data?.data?.length > 0) {
      setListPaymentMethod(res.data.data);
      setMethodPaymentId(res.data.data[0].id);
    }
  };
  useEffect(() => {
    fetchListPaymentMethod();
  }, []);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => {
    setShowAdd(true);
  };

  const onChange = (e) => {
    setPaymentRequestItem({
      ...paymentRequestItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddPaymentRequest = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      let res = await paymentRequestApi.createPaymentRequest({
        cusPhone: invoice?.phone,
        cusFullname: invoice?.fullname,
        reason: paymentRequestItem.reason,
        amount: paymentRequestItem.amount,
        salonId: invoice?.seller?.salon_id,
        methodPaymentId,
      });
      if (res?.data?.status === "success") {
        toast.success("Thêm yêu cầu thanh toán thành công");
        handleCloseAdd();
        setPaymentRequestItem({});
      } else {
        toast.error("Thêm yêu cầu thanh toán thất bại");
      }
      setIsLoading(false);
    } catch (error) {
      toast.error("Thêm yêu cầu thanh toán thất bại");
      setIsLoading(false);
    }
  };
  const fetchDetailInvoice = async () => {
    try {
      let res = await invoiceApi.getDetailInvoiceBuyCar({
        salonId,
        invoiceId: invoice.invoice_id,
      });
      setCheckedDetails(res.data.invoice[0]?.legals_user?.details);
      setPeriodCurrent(res.data.invoice[0]?.legals_user?.current_period);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchDetailInvoice();
  }, [invoice, salonId]);

  useEffect(() => {
    const fetchDetailProcess = async () => {
      try {
        let res = await processApi.getAllProcess({
          salonId,
          processId: invoice?.legals_user?.processId,
        });
        setDetailProcess(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetailProcess();
  }, [invoice, salonId]);
  useEffect(() => {
    setCheckedDetails(invoice?.legals_user?.details || []);
  }, [invoice]);
  useEffect(() => {
    if (detailProcess?.documents && periodCurrent) {
      const currentStepIndex = detailProcess.documents.findIndex(
        (item) => item.period === periodCurrent
      );
      console.log("currentStepIndex", currentStepIndex);

      if (currentStepIndex !== -1) {
        setActiveStep(currentStepIndex);
      }
    }
  }, [detailProcess, invoice, periodCurrent]);
  const areAllDetailsChecked = () => {
    if (detailProcess?.documents?.length > 0) {
      const currentStepDetails = detailProcess.documents[activeStep]?.details;
      if (!currentStepDetails) return false;
      return currentStepDetails?.every((detail) =>
        checkedDetails?.includes(detail.name)
      );
    }
  };
  useEffect(() => {
    setIsNextButtonDisabled(!areAllDetailsChecked());
  }, [activeStep, checkedDetails, detailProcess]);

  const steps = detailProcess?.documents?.map((item) => {
    return {
      label: item.name,
      documents: item?.details?.map((detail) => detail.name),
    };
  });
  console.log("detailProcess : ", detailProcess);
  console.log("invoice : ", invoice);
  const handleDocumentToggle = (documentName) => {
    setCheckedDetails((prevDetails) => {
      if (!prevDetails) {
        return [documentName];
      } else {
        if (prevDetails.includes(documentName)) {
          return prevDetails.filter((detail) => detail !== documentName);
        } else {
          return [...prevDetails, documentName];
        }
      }
    });
  };
  const handleNext = async () => {
    if (invoice?.done) {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      if (isNextButtonDisabled) {
        toast.error("Vui lòng chọn đủ các giấy tờ cần thiết");
      } else {
        setActiveStep((prevStep) => prevStep + 1);
        await processApi.checkDetailUser({
          salonId,
          phone: invoice.phone,
          details: checkedDetails,
          carId,
        });
        await processApi.updatePeriodUser({
          salonId,
          phone: invoice.phone,
          newPeriod: detailProcess.documents[activeStep + 1].period,
          carId,
        });
        fetchDetailInvoice();
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFinish = async () => {
    if (isNextButtonDisabled) {
      toast.error("Vui lòng chọn đủ các giấy tờ cần thiết");
    } else {
      await processApi.checkDetailUser({
        salonId,
        phone: invoice.phone,
        details: checkedDetails,
        carId,
      });
      await processApi.updatePeriodUser({
        salonId,
        phone: invoice.phone,
        newPeriod: detailProcess.documents[activeStep].period,
        carId,
      });
      await invoiceApi.updateDoneInvoice({
        salonId,
        invoiceId: invoice.invoice_id,
      });
      fetchDetailInvoice();
      toast.success("Tiến trình hoàn tất");
      handleCloseModalProcess();
      loadingInvoice(salonId, 1, "");
    }
  };
  const handleUpdate = async () => {
    try {
      let res = await processApi.checkDetailUser({
        salonId,
        phone: invoice.phone,
        details: checkedDetails,
        carId,
      });
      await processApi.updatePeriodUser({
        salonId,
        phone: invoice.phone,
        newPeriod: detailProcess.documents[activeStep].period,
        carId,
      });
      if (res?.data?.status === "success") {
        toast.success("Cập nhật thành công");
        fetchDetailInvoice();
      }
    } catch (error) {}
  };
  const handleNavigateSalonAppointment = () => {
    navigate(`${path.salonAppointment}`, {
      state: {
        phone: invoice?.phone,
        carId: invoice?.legals_user?.car_id,
        salonId: invoice?.seller?.salon_id,
      },
    });
  };
  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-end">
          <div>
            <button
              onClick={() => handleNavigateSalonAppointment()}
              className="btn btn-primary mx-2"
            >
              Tạo lịch hẹn
            </button>
            <button className="btn btn-primary" onClick={handleShowAdd}>
              Tạo yêu cầu thanh toán
            </button>
          </div>
        </div>
        <h1 className="text-center mt-4">{detailProcess?.name}</h1>
        <Stepper
          steps={steps?.map((step) => ({ label: step.label }))}
          activeStep={activeStep}
          styleConfig={{
            activeBgColor: "#2b7cff",
            activeTextColor: "#fff",
            inactiveBgColor: "#fff",
            inactiveTextColor: "#2b7cff",
            completedBgColor: "#fff",
            completedTextColor: "#2b7cff",
            size: "3em",
          }}
          className={"stepper"}
          stepClassName={"stepper__step"}
        />
        <div className="step-content">
          <div key={activeStep}>
            <div className="documents">
              <h2 className="text-center fw-bold my-4">
                {detailProcess.type === 0
                  ? "Các giấy tờ cần thiết"
                  : "Thông tin giai đoạn"}
              </h2>
              {detailProcess?.documents && (
                <ol className="list-group list-group-numbered">
                  {steps[activeStep]?.documents.map((document, index) => (
                    <li
                      key={index}
                      className="list-group-item w-100 d-flex align-items-center justify-content-between"
                    >
                      <span style={{ flex: "1 1 80%", paddingLeft: "5px" }}>
                        {document}
                      </span>
                      {!invoice?.done && (
                        <input
                          type="checkbox"
                          className="form-check-input mx-2"
                          checked={checkedDetails?.includes(document)}
                          onChange={() => handleDocumentToggle(document)}
                        />
                      )}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          {/* {(invoice?.done && activeStep !== 0) (
          <button
            className="buttons__button buttons__button--back"
            onClick={handleBack}
          >
            Back
          </button>
        )} */}
          {!invoice?.done && (
            <button
              className="buttons__button buttons__button--update"
              onClick={handleUpdate}
            >
              Update
            </button>
          )}

          {activeStep !== steps?.length - 1 && (
            <button
              className="buttons__button buttons__button--next"
              onClick={handleNext}
            >
              Next
            </button>
          )}
          {activeStep === steps?.length - 1 && !invoice?.done && (
            <button
              className="buttons__button buttons__button--finish"
              onClick={handleFinish}
            >
              Finish
            </button>
          )}
        </div>
      </div>
      <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static">
        <Form onSubmit={handleAddPaymentRequest}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm mới yêu cầu thanh toán</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mt-4">
              <Form.Label>Nội dung thanh toán</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                type="text"
                name="reason"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Giá tiền</Form.Label>
              <Form.Control
                required
                type="number"
                name="amount"
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mt-4">
              <Form.Label>Chọn hình thức thanh toán</Form.Label>

              <Form.Select
                onChange={(e) => setMethodPaymentId(e.target.value)}
                value={methodPaymentId}
              >
                {listPaymentMethod?.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.type} - {item.content}
                  </option>
                ))}
              </Form.Select>
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
    </>
  );
};

export default ProcessForm;
