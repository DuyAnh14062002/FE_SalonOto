import React from 'react'
import Modal from "react-bootstrap/Modal";
import { Form, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./ModalBuyPackage.scss"
import {useState} from "react"
import paymentApi from '../../apis/payment.api';
import { Navigate } from 'react-router';
export default function ModalBuyPackage(props) {
  const [activeZaloPayment, setActiveZaloPayment] = useState(false)
  const [activeVisaPayment, setActiveVisaPayment] = useState(false)
  const [activeVnPay, setActiveVnPay] = useState(false)
  const handleHideModal = () =>{
    props.handleHideModal()
  }
  const HandleActiveZaloPay = () =>{
    setActiveVisaPayment(false)
    setActiveZaloPayment(true)
    setActiveVnPay(false)
  }
  const HandleActiveVisa = () =>{
    setActiveVisaPayment(true)
    setActiveZaloPayment(false)
    setActiveVnPay(false)
  }
  const HandleActiveVnPay = () =>{
    setActiveVnPay(true)
    setActiveVisaPayment(false)
    setActiveZaloPayment(false)
  }
  const handlePayMent = async (e, amount) => {
     e.preventDefault();
     if(activeZaloPayment === true){
      const res = await paymentApi.createPayment(amount, "");
      if(res.data && res.data.data && res.data.data.order_url){
       window.open(`${res.data.data.order_url}`, "_self")
      }
     }else if(activeVnPay === true){
        const res = await paymentApi.paymentVnpay(amount, "");
        if(res?.data?.vnpUrl){
          window.open(`${res.data.vnpUrl}`, "_self")
        }
     }else{
      const res = await paymentApi.createPayment(amount, "CC");
      if(res.data && res.data.data && res.data.data.order_url){
        window.open(`${res.data.data.order_url}`, "_self")
      }
     }
  }
  return (
    <>
          <Modal show={props.show} onHide={handleHideModal} >
          <Form >
            <Modal.Header closeButton>
              <Modal.Title style={{color: 'blue'}}>Thông tin đơn hàng</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Card.Body md="4">
                <Card.Title>Gói salon oto cơ bản</Card.Title>
                <Card.Text style={{color: "#4ABAB9"}}>Giá: {props.price}đ</Card.Text>
              </Card.Body>
              <Card.Body style={{borderTop : "1px dotted black"}}>
              <Card.Title>Chọn phương thức thanh toán</Card.Title>
              <div className='choose-payment'>
                 <div className={activeZaloPayment === true ? 'payment-item active' : "payment-item"} onClick={HandleActiveZaloPay}>
                    <div className='payment-image' style={{backgroundImage: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAzFBMVEX///8AaP8DyncAZf8AyXMAY/830o4AX/8Axmr7/vwAXf8AYv8AYP/3/vwnzoJn26U/fv9qmv8Ax29Y2J0Wdf8zgP/H2v+07dIAWv+b5L9rnv+30P8Aav/1+v/n+vLg9+3r8v9+qv/Y6P+gwP/i7f9Fif+91f+syP94pf/x9/+cu/+C4LOj6MfX9edXkv/o7//R4/+Lsv8acP+oxv9glP850ox73q6+8Nlznf9Ahv+4zP8fef+Lrf+ZvP9Mjf/a5P/K8uG67dWP47tO1ZWFwGbPAAAPGklEQVR4nO2da1+qTBDARSBsIStSI83UrLTrk2Z1uh6r7/+dHkTcC7DLrLIi/c68OscA98/MzszOrFDSfruU8h6AcvlHWHz5R1h8+UdYfPlHWHz5xYS66VgIod9IqJu2hfTx2937oPFf6VcR+mgOssb1SW/QOG2XQsl7VJlIoDXP8bXWb/x3WWIl78GtJjM0yzbHn72HxlkpWfIe45ISGKQ93vscPlAG+TsIdR/N0/buev3GaVeIVjRC3ff+yPOOz4f9i9hcKzahbvpotjZ+GfZbpxJkBSAM5ho6fvscflzcgwyyOITBXEPjGdpZV+xHCkY4m2uWn4/Uh1etFA9ZNMLAjThard4cte5l3EgBCAMPadbOfbS/Z1mpbTMIZ2jIO67/uXr9u/Jc2yjCYK45plbfv2rdqyTLgTBYsOm1+mT0yk0iC0o4X4uOX/ZHg79nGfuRnAkDNA+9TUaD+8t1WOT6CINVzWyZPRo01q40tYTBWjRYZqeuatYlmaJ55t4kaZmdq2SCZjlO7fP9odHNmyZJVkJzkOnPtZlB5o0hkGXRkLY3GfrL7I0yyESRQgtWNd74sye5zM5VwHqzHG08qyCsMRvJRkB8JhrvD7Je1axLQHz7F5sR2paSdPv07jbZU6ZLGqDzdp/3EFeUFEA0zHuAK0uKBh/yHt/qIgS0WnkPLwMRmuhF3qPLQkSA/bwHl4kI5mAz77FlI1xAvVbgKE8L30Z/g5eZCQ/Q/Mx7ZFkJj9AreiqDhTcL63kPLDPhEFq/IJkJhTcNu3kPLDPhGOl53uPKTpIJnVHe48pOkgnzDIb9u/rnVYYVE44O/2b3DXLSfkOmblrj7IIVx9PkVlGr23NHoGWmxWTA425W15eUC5S5J0gmHOdVOezZ4QjMzLx5FjocNM/rXHm560kspPfNcAT6niQIV1afh6djZJo6X0wbaWDGtRFacFd2eWwmX4MSHVwPWRshegVfoOekAkqMd22EEp6spgMINQ8YYNdGaMJrNMcQQHCStDZCicy7DtLh5hHCy1B9D0JoAgPs+qKFxPrwE6Vr0YG2P9ZHiCQ6aqOah2JiM5cDZxBrJJRZPrVPL1oRufigFYs+oJdaH6EDHhNHaAdkwsta6yO0V+wb7tN5gAnPAdfoaVZL7RkHiwbwE9dHqI9Xueg97Wec/fjfX0e93ug1wZuJCE8brdfWhfTin0OoIdkLUdIdU5MwFlrvhzqyHNt2LKTNk8PBnmXV54rmEXY/XhyELGv2q9C3kdTWCR6ht0Id45xWocUO578JHUiscaNUuvP02ZaPJp/wbIgsctN0x7uT0CRXh8v3f3uIvg5bPG/pbKDUrYdBOGfRiEc4MqPrF9OKm74s4fJl/RYNaLEp/Cie/5gkde8mErbrVsL4nNp/KxLavSUBT2mGSCTsCXNY1EgiPBsnr7DNY+Bs5H3dsv3D9h41IP2YudEP4iQ9kfCyxish6GOYq+B9nV5bjpAJ9R4zmU9t3pcJCF/4J5mwIfK/cClANtSzlYKXlIJOEuEVEpwA20vBv0PL7Ndr0E7BmTB/e2UGa/uRzWHdTgLhGXNTzOg5oIIZ/wY15AG7NSbUs6teOhd3tOFDq/W+x0AnEDYpG7W1pn/OqE5ZiTlJHAaQ0IKX27AwoR6xxad7amSoGcIPGKOOEXbpv07Cc1omuVUI4Gy4hEuECzbUR/Ltd+KCLDI/L6hT4oR9YvTUnGsQ04XUBLmEIAtgpEUrJFa3eMN3nlm3UOXWOOEnZtH3qOx2hM+BbKjgEkrvxjhl7k89km+3iTqYjSxdktLECNvEHB0m7pDMHrBA4BPK7vpiQr0WzanuMWFk1UCcSYzw1CODYc4hSvTSPT6XUIsNUixMqI/n7ReYMDJ3yB9ihCS+RCrU94j/RRKESKrTLQr1M3nFIBbrgk6x6mOEfXzTnCv2avjLABUzPqElUXwo3dMatO/iBxDCyKC6ZE5FCa/wRaOhS+NcTI5Qps98ORaEejHhGV+HFGHkbiPOxeQIzT9wQibUO0m5FDUP2a3HDYwhslL2bp8RK11lHkqsn0Sr+lCIL414jQ8+IeVp2LFQBpGemfIJ4eGCDfXJCf8luQk684dPvpUSl6kdM4aPj9K89I4Pn1CzgP0iZgHArW9TUZqeO2fEvmOElyRLsGjTpjIBPfo1UoSAaBp8H7uq5+XCeB8JG76bAsLSC0bRx13qUtiwIamlgBDYnWnSgcLirrkaxJQpQ+5TJ8cJSe6i2YSlRW4KpF4mIIyG2WRhFkDaeNiMS2/QLdFm6q+Nu/OTR4yLihHSdQ/npRu/KXZ3JUJQd6YdOclMENvyhu3SB0VjoslV/6N5zNQJE1bAdyZ9zt2o3x+OqcvYkDKGgBDUzO8nFTPjgoalNrNrw3QcJ1K3SSBkUqXgHJu+iA1JLEXDgnRnXkAbFQK33hJVlZIJS0PRbh1Y71w4qvTT27DtNHO31RTrO7GayC2XZlBNhHVn3oCEQWZZF+6fmu0qihGeHfO+QAduvhN9JaQ7c8e/x+y1ZqGn/RJHNEmlokuFOpynNcxkRF0D9p9Eo4JEmxZoO42voGA93f6MzkU0XEy1oLyKK1Pkp4Gn4yTNO9C2hZAQVG7bT/Ef1PBn8qHRNV3T6vlTOSBw5muuyXyu2m/kG9oTK2ooptXcBgIKCc2ElWxcRjoSbS+diY3OcY7b7Y09JzjBdNDLLAXq7tvIM/fDIyb+X220CO9zuTj3qPviX+5TolwtIgR2Z7qDP+dvNYHU/zATut0YTer+p5OrhaF1G9RzERvvf4axfPH+veYhy4+HFvJqPan6itC2jjfpR5bdxqB/1Zd/KpOQUC/cYz4SREjIXykUSMSEMuW2TRUh4a/4gZeQ0ITv6dhcERLqL3kPLwMREybVdosmQsIgGU6V6fWWavn5vlVECOjObO9WXKOsWAzXvVZEmF5uO3BV482l8q2EMD1cfK0JsFx2OyoI07szB8otFBMeqSBML7dV1wVYNnaVEKatn3aqa9OhGkINpayfik+Y1p3ZKbqVppbbiq9DJ+VpWAtCwzVYcX0pBGFadya0UvdguhP5Q+f5+tHIUsGKCNPCxVyHvC+/3c0woVNFmNKdCa2Um250tjKzVUWEmgMhfBQc8Z0VojJCcbgICI0f0SE3GSGqIkwptwWexjgQHpMRojJCcXdmrkMxYWk3E3ejijClOwMi3MkCUBlhSncmaqU7nbmcMEcdZWGnqghTfssZ1eFRmNuUfw6po042mTDlYTxxwsV4XHpAWayTlRGKuzNRK6Xs0aUKK6w7NZbK5pQRivc3cnVYZgort/hjwy0/HuwebJXdRcru4szOcCuVmD3jD5URirszQkKixMVEdI2nMEXfme5WZh9s3TwfXs8RZ+l75yiiXnfreefkpmwoJBSX20SEtIsNrZOpCN5WDfdmfgMCFurfBPAJn6+MUNydERKSZC4gNKrRBP3nKfxHxygbi5LvIWOo4Ye3hkJPI1w/CTxNlND92YmdjT95MtwpfcmFCnEF8cdQRyjcDC3UIRmSPw+NR9H+kBsXE/q0hBDfggN1hJrTFZwu9DRf+OOp//FJ0vkLOXTDaRgeHL1H21V1VioOFwIrpZXmq+hZOIxDl7JpbKbkJJ9aIaHop5Z8HRoG5Vd23ZTk3Hcv5Hi8aK7ie7Sr0NOIN0PHCCuLUhvtOHdctq1y8vx1y85Kn5D0zzqVUIX4k5OKwmghLrdFCb9253I9pY86qtCju/2puG6lfEMfMdNhFbuVrdAMGK2qIxQ284HrQ3oWfoVZGkM9C4IuXo7M09jIzFRHqB2LBg+oYvizkHKkJzgW0O2yGSEhmid5hPjZVUso2gwN0eE37SeZkgbhDhKZSoc5yMV//REVZdMEQigotwEIffdqPOH/7dABk0zFgJB4lkCl+KSO2rWFuDuTbqXfFcYen5OTnjAZXTjY2WVdvP3iWzWhqDuTpsPOj8tmN/Ra2NiKEJKZ55spLjNvx+5H1oSicCEmvH2a+00OYZlkPYcR7zmlsrhQvwoJRauLWK3tJJTO7df1z2L1ztMhcUALCmyZlBt6VK5DUXcmltOQWOCSagyxvpR5SHzNE75mx1VOqGn89ZNobUE5TbKhaafC96UzWeQ1t1jti/CiklDwqBoYIT1RD/jxkNV2KLiqoZJQ0J2BEVKLBKrsRpcbF4SUew0FT1ylhPzuDJDQpbYWHi1WDnRPDltpJVrLecS1RoWEgu4MlJDeWfhVDbYxMJsNMSGV/gQyxfNW6Tzkd2eAhOUqXYXanh7eTNmiBlVgY+tVJI1VSSh4VI2o1sYo8YZ7iQgh62uoNFYpIb87A9Vh2YiVEjmEbMv8aD2Egu4MnFC8wqKslPZK9NZHpYT8zdBRK+XvvBBvD6UIaV/DyYCyJ+R3Z6K7TahqbgwxFswpoe+MQYInnR4oJeR3Z8I9UTiIPXIBk7zN83Txr2ricR36fikl5G+GDgkXhiXe9V3ZjYWI0P9c0+eR+j7zsVpPw10/hbu+wkl2I+KbHVb+Joyd3VkF8Wt7/i9KsM2zezjUEnI3Qy92X7qPR4dHj+kbElxj6/twOp1+fW/NF1duuVotM5OXzFfWIpQS8jdDkx200P2kwc5TqrUdE5KlPzLHKCbkdWey3yNMospthfmDYkLeb2cU7POmuqZrJOR2ZzLXIVk0RveKqSU0eeW27ax16GJnG93SqJaQ353ZylaHFEY0eXCX/GkXjJD/3ORMNuVRGAm97sWfpkoJPe42g3KmSiRtuOimVHdJI4US8t8706lmqUUcK6LbGRP2qmRMyO/OnFxXKxlK6GkO2E8fU2oEqxOKfzuznaXML7mT9KFKwlXfO5OjAAkL/CJyIOGyLxLYAAES5vdm0pUFSrjUiwQ2QqCEqLCPqoESFvd18lDCpd87k7tACeVfJLApAiWUfpHAxgiYsLDhAkqo2XIvEtgcARMCng2+mQImLOyTzcCEhX2yGZhQ5kUCGyVgwsI+2QxMCHoy9CYKnNDbpEd9SgicsKjhQoJQ5jXPGyRwQtiLBDZP4IQm6G2DmydwwqKGCzih8LczGywShGYxw4UEYcqjajZVJAit5V/znKfI6DDlyWYbKhKEBe3OSBAWtDsjQZjyqJpNFQlCjX5vVnFEhtAs5IsEZAiL2Z2RISxkd+Z/AO9rM75Yd+gAAAAASUVORK5CYII=)`}}></div>
                    <div className='payment-text'>Thanh toán với Zalopay</div>
                    <div className='payment-select'>{activeZaloPayment === true ?  <i class="fa-solid fa-circle" style={{color: "blue"}}></i> : <i class="fa-regular fa-circle"></i>}</div>
                 </div>
                 <div className= {activeVisaPayment === true ? 'payment-item active' : "payment-item"} onClick={HandleActiveVisa} >
                    <div className='payment-image' style={{backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ3_8A7yRS7tta-z3lHF1qDm4RSTqtFT6_Yw&usqp=CAU)`}}></div>
                    <div className='payment-text'>Thanh toán với Visa</div>
                    <div className='payment-select'>{activeVisaPayment === true ?  <i class="fa-solid fa-circle" style={{color: "blue"}}></i> : <i class="fa-regular fa-circle"></i>}</div>
                 </div>
                 <div className= {activeVnPay === true ? 'payment-item active' : "payment-item"} onClick={HandleActiveVnPay} >
                    <div className='payment-image' style={{backgroundImage: `url(data:image/png;base64,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)`}}></div>
                    <div className='payment-text'>Thanh toán với VnPay</div>
                    <div className='payment-select'>{activeVnPay === true ?  <i class="fa-solid fa-circle" style={{color: "blue"}}></i> : <i class="fa-regular fa-circle"></i>}</div>
                 </div>
              </div>
              </Card.Body>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick = {handleHideModal}>
                Đóng
              </Button>
              <Button variant="primary" type="submit" onClick={(e) => handlePayMent(e,props.price)}>
                Thanh toán
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
    </>
  )
}
