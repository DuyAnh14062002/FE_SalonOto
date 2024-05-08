import React, { useState } from "react";
import "./ProcessForm.scss";
import { Stepper } from "react-form-stepper";

const ProcessForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      label: "Giai đoạn 1",
      documents: [
        "Chứng minh nhân dân",
        "Giấy chứng nhận đăng ký kinh doanh của salon",
        "Phiếu đăng ký mua xe",
        "Hợp đồng mua bán",
      ],
    },
    {
      label: "Giai đoạn 2",
      documents: [
        "Giấy tờ 1 giai đoạn 2",
        "Giấy tờ 2 giai đoạn 2",
        "Giấy tờ 3 giai đoạn 2",
      ],
    },
    {
      label: "Giai đoạn 3",
      documents: [
        "Giấy tờ 1 giai đoạn 3",
        "Giấy tờ 2 giai đoạn 3",
        "Giấy tờ 3 giai đoạn 3",
      ],
    },
    // Thêm các bước khác nếu cần
  ];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFinish = () => {
    console.log("Quy trình hoàn thành!");
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4">Quy trình mua xe</h1>
      <Stepper
        steps={steps.map((step) => ({ label: step.label }))}
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
            <h2 className="text-center fw-bold my-4">Các giấy tờ cần thiết</h2>
            <ol className="list-group list-group-numbered">
              {steps[activeStep].documents.map((document, index) => (
                <li key={index} className="list-group-item">
                  {document}
                </li>
              ))}
            </ol>
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
        {activeStep !== steps.length - 1 ? (
          <button
            className="buttons__button buttons__button--next"
            onClick={handleNext}
          >
            Next
          </button>
        ) : (
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
