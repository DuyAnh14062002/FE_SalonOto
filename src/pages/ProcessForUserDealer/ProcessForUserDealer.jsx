import { useEffect, useState } from "react";
import "./ProcessForUserDealer.scss";
import { Stepper } from "react-form-stepper";
import processApi from "../../apis/process.api";
import dealerApi from "../../apis/dealer.api";

const ProcessForUserDealer = ({ selectedTransaction }) => {
  const [detailProcess, setDetailProcess] = useState({});
  const [detailTransaction, setDetailTransaction] = useState({})
  const [activeStep, setActiveStep] = useState(0);
  const [checkedDetails, setCheckedDetails] = useState([]);
  const periodCurrent = selectedTransaction.stage.stage_id

  const getDetailProcess = async () =>{
    let res = await dealerApi.getConectionById(selectedTransaction.connection.connection_id)
    if(res?.data?.connection?.process){
      setDetailProcess(res.data.connection.process)
    }
  }
  useEffect(() => {
    const fetchDetailProcess = async () => {
      try {
        let res = await dealerApi.getDetailProcess(selectedTransaction.transaction_id)
        console.log("res detail transaction : ", res)
        if(res?.data?.transaction){
          setCheckedDetails(res.data.transaction.checked)
          setDetailTransaction(res.data.transaction)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetailProcess();
    getDetailProcess()
  }, [selectedTransaction]);
  console.log("res detail process : ", detailProcess)
  // useEffect(() => {
  //   setCheckedDetails(process?.legals_user?.details || []);
  // }, [process]);
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
  }, [detailProcess, periodCurrent]);
 const steps = detailProcess?.stages?.map((item) => {
  return {
    label: item?.name,
    documents: item?.commissionDetails?.map((detail) => ({name : detail.name, id: detail.id})),
  };
});
  const handleNext = async () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  console.log("selectedTransaction : ",selectedTransaction)
  console.log("res step : ", steps)
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

                    <input
                      type="checkbox"
                      className="form-check-input mx-2"
                      checked={checkedDetails?.includes(document.id)}
                    />
                  </li>
                ))}
              </ol>
            )}
            <div className="award-money-box">
               <span>Tiền Hoa hồng : </span>
               <input />
            </div>
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

        {activeStep !== steps?.length - 1 && (
          <button
            className="buttons__button buttons__button--next"
            onClick={handleNext}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ProcessForUserDealer;
