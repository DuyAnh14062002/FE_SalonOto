import { useEffect, useState } from "react";
import "./ProcessForUser.scss";
import { Stepper } from "react-form-stepper";
import processApi from "../../apis/process.api";

const ProcessForUser = ({ invoice }) => {
  const [detailProcess, setDetailProcess] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [checkedDetails, setCheckedDetails] = useState([]);
  const periodCurrent = invoice?.legals_user?.current_period;

  useEffect(() => {
    const fetchDetailProcess = async () => {
      try {
        let res = await processApi.getAllProcess({
          salonId: invoice.seller.salon_id,
          processId: invoice?.legals_user?.processId,
        });
        setDetailProcess(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetailProcess();
  }, [invoice]);
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

  const steps = detailProcess?.documents?.map((item) => {
    return {
      label: item.name,
      documents: item?.details?.map((detail) => detail.name),
    };
  });

  const handleNext = async () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
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

                    <input
                      type="checkbox"
                      className="form-check-input mx-2"
                      checked={checkedDetails?.includes(document)}
                    />
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

export default ProcessForUser;
