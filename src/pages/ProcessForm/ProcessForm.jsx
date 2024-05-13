import React, { useEffect, useState } from "react";
import "./ProcessForm.scss";
import { Stepper } from "react-form-stepper";
import processApi from "../../apis/process.api";
import { toast } from "react-toastify";
import invoiceApi from "../../apis/invoice.api";

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
  console.log("detailProcess", detailProcess);

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
  console.log("detailProcess : ", detailProcess)
  console.log("invoice : ", invoice)
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
      loadingInvoice(salonId);
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

  return (
    <div className="container">
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
        {activeStep !== 0 && (
          <button
            className="buttons__button buttons__button--back"
            onClick={handleBack}
          >
            Back
          </button>
        )}
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
  );
};

export default ProcessForm;
