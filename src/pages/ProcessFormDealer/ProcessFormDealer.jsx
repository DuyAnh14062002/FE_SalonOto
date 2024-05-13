import React, { useEffect, useState } from "react";
import "./ProcessFormDealer.scss";
import { Stepper } from "react-form-stepper";
import processApi from "../../apis/process.api";
import { toast } from "react-toastify";
import invoiceApi from "../../apis/invoice.api";
import dealerApi from "../../apis/dealer.api";

const ProcessFormDealer = ({
  invoice,
  salonId,
  carId,
  loadingInvoice,

  handleCloseModalProcess,
  selectedTransaction
}) => {
  console.log("selectedTransaction: ", selectedTransaction)
  const [detailProcess, setDetailProcess] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [checkedDetails, setCheckedDetails] = useState([]);
  const [checkedDetailsId, setCheckedDetailsId] = useState([]);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [periodCurrent, setPeriodCurrent] = useState(null);
  const [transaction, setTransaction] = useState({})
 // const [process, setProcess] = useState([])

  const fetchDetailProcess = async () => {
    setCheckedDetailsId(selectedTransaction.checked)
   // setPeriodCurrent()
    let res = await dealerApi.getConectionById(selectedTransaction.connection.connection_id)
    if(res?.data?.connection?.process){
      setDetailProcess(res.data.connection.process)
    }
    let res2 = await dealerApi.getDetailProcess(selectedTransaction.transaction_id)
    if(res2?.data?.transaction?.stage?.stage_id){
      setPeriodCurrent(res2.data.transaction.stage.stage_id)
    }
  };
  console.log("detailProcess", detailProcess);
  useEffect(() => {
    fetchDetailProcess();
  }, [invoice, salonId]);

  useEffect(() => {
  
  }, [invoice, salonId]);
  useEffect(() => {
  
  }, [invoice]);
  useEffect(() => {
  }, [detailProcess, invoice, periodCurrent]);
  const areAllDetailsChecked = () => {
    if (detailProcess?.stages?.length > 0) {
      const currentStepDetails = detailProcess.stages[activeStep]?.commissionDetails;
      if (!currentStepDetails) return false;
      return currentStepDetails?.every((detail) =>
        checkedDetailsId?.includes(detail.id)
      );
    }
  };
  useEffect(() => {
    setIsNextButtonDisabled(!areAllDetailsChecked());
  }, [activeStep, checkedDetails, detailProcess]);
  const steps = detailProcess?.stages?.map((item) => {
    return {
      label: item.name,
      documents : item?.commissionDetails?.map((detail) => ({ name: detail.name, id: detail.id })),
      commissionRate : item.commissionRate
    };
  });
  console.log("step : ", steps)
  console.log("detailProcess : ", detailProcess)
  const handleDocumentToggle = (documentName , documentId) => {
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

    setCheckedDetailsId((prevDetails) => {
      if (!prevDetails) {
        return [documentId];
      } else {
        if (prevDetails.includes(documentId)) {
          return prevDetails.filter((detail) => detail !== documentId);
        } else {
          return [...prevDetails, documentId];
        }
      }
    })
  };
  const handleNext = async () => {
    if (selectedTransaction?.status !== "pending") {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      if (isNextButtonDisabled) {
        toast.error("Vui lòng chọn đủ các giấy tờ cần thiết");
      } else {
        setActiveStep((prevStep) => prevStep + 1);
        let res = await dealerApi.nextProcess(selectedTransaction.transaction_id)
        if(res?.data?.status === "completed"){
          handleCloseModalProcess()
          toast.success("Qui Trình đã hoàn thành")
        }
      }
    }
  };
  useEffect(() => {
    if (detailProcess?.stages && periodCurrent) {
      const currentStepIndex = detailProcess.stages.findIndex(
        (item) => item.stage_id === periodCurrent
      );
      console.log("currentStepIndex", currentStepIndex);

      if (currentStepIndex !== -1) {
        setActiveStep(currentStepIndex);
      }
    }
  }, [detailProcess, invoice, periodCurrent]);

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFinish = async () => {
    
  };
  const handleUpdate = async () => {
    let res = await dealerApi.updateProcessCheck(selectedTransaction.transaction_id, checkedDetailsId)
    console.log("res update : ", res)
    if(res?.data?.status === "success"){
       if(res?.data?.transaction?.checked){
        console.log("oke : ", res.data.transaction.checked)
        setCheckedDetailsId(res.data.transaction.checked)
       }
      toast.success("Cập nhật thành công")
    }else{
      toast.error("Cập nhật thất bại")
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4">{detailProcess.description}</h1>
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
            {detailProcess?.stages && (
              <ol className="list-group list-group-numbered">
                {steps[activeStep]?.documents.map((document, index) => (
                  <li
                    key={index}
                    className="list-group-item w-100 d-flex align-items-center justify-content-between"
                  >
                    <span style={{ flex: "1 1 80%", paddingLeft: "5px" }}>
                      {document.name}
                    </span>
                    {selectedTransaction?.status === "pending" && (
                      <input
                        type="checkbox"
                        className="form-check-input mx-2"
                        checked={checkedDetailsId?.includes(document.id)}
                        onChange={() => handleDocumentToggle(document.name, document.id)}
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
        {selectedTransaction?.status === "pending" && (
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
        {activeStep === steps?.length - 1 && selectedTransaction?.status === "pending" && (
          <button
            className="buttons__button buttons__button--finish"
            onClick={handleNext}
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
};

export default ProcessFormDealer;
