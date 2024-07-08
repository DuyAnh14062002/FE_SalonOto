import React, { useEffect, useState } from "react";
import "./ProcessFormDealer.scss";
import { Stepper } from "react-form-stepper";
import { toast } from "react-toastify";
import dealerApi from "../../apis/dealer.api";

const ProcessFormDealer = ({
  invoice,
  salonId,
  carId,
  loadingInvoice,
  handleCloseModalProcess,
  selectedTransaction,
  loadingProcess
}) => {
  const [detailProcess, setDetailProcess] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [checkedDetails, setCheckedDetails] = useState([]);
  const [checkedDetailsId, setCheckedDetailsId] = useState([]);
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [periodCurrent, setPeriodCurrent] = useState(null);
  const [rating, setRating] = useState("")
  const [commission, setCommission] = useState("")

  const fetchDetailProcess = async () => {
    setCheckedDetailsId(selectedTransaction.checked)
    let res = await dealerApi.getConectionById(selectedTransaction.connection.connection_id)
    if(res?.data?.connection?.process){
      setDetailProcess(res.data.connection.process)
    }
    let res2 = await dealerApi.getDetailProcess(selectedTransaction.transaction_id)
    if(res2?.data?.transaction?.stage?.stage_id){
      setPeriodCurrent(res2.data.transaction.stage.stage_id)
    }
  };
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
  let steps = []
  steps = detailProcess?.stages?.map((item,index) => {
    let rating=0;
    selectedTransaction?.ratingList?.map((item, index2) => {
      if(index===index2){
        rating=item
      }
    })
    return {
      label: item.name,
      documents : item?.commissionDetails?.map((detail) => ({ name: detail.name, id: detail.id })),
      commissionRate : item.commissionRate,
      rating
    };
  });
 
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
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  }
  const handleNext = async () => {
    if (selectedTransaction?.status !== "pending") {
      setActiveStep((prevStep) => prevStep + 1);
    } else {
      if (isNextButtonDisabled) {
        toast.error("Vui lòng chọn đủ các giấy tờ cần thiết");
      } else {
        setActiveStep((prevStep) => prevStep + 1);
        let resUpdate = await dealerApi.updateProcessCheck(selectedTransaction.transaction_id, checkedDetailsId, detailProcess.stages[activeStep].stage_id)
        if(resUpdate?.data?.status === "success"){
         if(resUpdate?.data?.transaction?.checked){
          setCheckedDetailsId(resUpdate.data.transaction.checked)
         }
        }
        let res = await dealerApi.nextProcess(selectedTransaction.transaction_id, rating, commission)
        console.log("res next process : ", res)
        if(res?.data?.status === "completed"){
          handleCloseModalProcess()
          fetchDetailProcess()
          loadingProcess()
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

      if (currentStepIndex !== -1) {
        setActiveStep(currentStepIndex);
      }
    }
  }, [detailProcess, invoice, periodCurrent]);

  const handleUpdate = async () => {

    let res = await dealerApi.updateProcessCheck(selectedTransaction.transaction_id, checkedDetailsId, detailProcess.stages[activeStep].stage_id)
    if(res?.data?.status === "success"){
       if(res?.data?.transaction?.checked){
        setCheckedDetailsId(res.data.transaction.checked)
       }
      toast.success("Cập nhật thành công")
    }else{
      toast.error("Cập nhật thất bại")
    }
  };
  console.log("commission : ", commission)
  return (
    <div className="container">
      <div className="box-title-process-dealer">
      <h1 className="text-center mt-4">{detailProcess?.name}</h1>
       <div className="box-rating">
       <label style={{width: "70%"}}>Đánh giá giai đoạn </label>
       <select className="rating form-select" style={{width:"45%"}} onChange={(e) => setRating(e.target.value)} value={steps?.[activeStep]?.rating || rating}>
         <option value="10">10%</option>
         <option value="20">20%</option>
         <option value="30">30%</option>
         <option value="40">40%</option>
         <option value="50">50%</option>
         <option value="60">60%</option>
         <option value="70">70%</option>
         <option value="80">80%</option>
         <option value="90">90%</option>
         <option value="100">100%</option>
       </select>
       </div>
      </div>
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
            <div className="award-money-box">
               <span>Tiền Hoa hồng </span>
               <input type="number" onChange={(e) => setCommission(e.target.value)} />
            </div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        {(activeStep !== 0 && selectedTransaction?.status !== "pending") && (
          <button
            className="buttons__button buttons__button--back"
            onClick={handleBack}
          >
            Back
          </button>)
        }
        {selectedTransaction?.status === "pending" && (
          <button
            className="buttons__button buttons__button--update"
            onClick={() => handleUpdate(selectedTransaction)}
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
