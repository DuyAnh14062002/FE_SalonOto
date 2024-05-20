import React, { useEffect, useState } from 'react'
import Header from '../Header'
import dealerApi from '../../apis/dealer.api'
import { useParams } from "react-router-dom";
import { Stepper } from "react-form-stepper";
export default function DetailProcess() {
  const [process, setProcess] = useState({})
  const [activeStep, setActiveStep] = useState(0);
  const params = useParams();
  const id = params.id;
  const loadingProcess = async() => {
    let res = await dealerApi.getConectionById(id)
    console.log("res process : ", res)
    if(res?.data?.connection?.process){
      setProcess(res.data.connection.process)
    }
  }

  useEffect(() =>{
     loadingProcess()
  }, [])
 
  const steps = process?.stages?.map((item) => {
    return {
      label: item.name,
      documents: item?.commissionDetails?.map((detail) => detail.name),
      commissionRate : item.commissionRate
    };
  });
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  return (
    <>
      <Header otherPage = {true}/>
      <div className="container">
      <h1 className="text-center mt-4">Qui trình Salon đề nghị với bạn</h1>
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
        <div  key={activeStep}>
          <div className="documents">
            <h2 className="text-center fw-bold my-4">
              {process.type === 0
                ? "Các giấy tờ cần thiết"
                : "Thông tin giai đoạn"}
            </h2>
            {process?.stages && (
              <div className='box-stages'>
                   <ol className="list-group list-group-numbered">
                {steps[activeStep]?.documents.map((document, index) => (
                  <li
                    key={index}
                    className="list-group-item w-100 d-flex align-items-center justify-content-between"
                  >
                    <span style={{ flex: "1 1 80%", paddingLeft: "5px" }}>
                      {document}
                    </span>
                  </li>
                ))}
              </ol>
              <div className='commisstion-rate' style={{marginTop: "10px", fontWeight: "bold"}}>Phần trăm hoa hồng được nhận : {steps[activeStep]?.commissionRate} %</div>
              </div>
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
    </>
  )
}
