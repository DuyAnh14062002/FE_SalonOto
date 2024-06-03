import React, { useEffect, useState } from 'react'
import Header from '../Header'
import "./PromotionDetail.scss"
import promotionApi from '../../apis/promotion.api'
import { useParams, useNavigate } from "react-router-dom";
import { FacebookIcon, FacebookShareButton } from 'react-share';

export default function PromotionDetail() {
  const [promotion, setPromotion] = useState({})
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate()
  const loadingDetailPromotion = async () => {
      try{
          let res = await promotionApi.getDetailPromotion(id)
          if(res?.data?.promotion){
            setPromotion(res.data.promotion)
          }
      }catch(e){
        console.log(e)
      }
  }
  useEffect(() => {
     loadingDetailPromotion()
  }, [])
  console.log("promotion : ", promotion)
  const handleNavigateSalon = async () => {
    navigate(`/salonOto/${promotion.salon.salon_id}`)
  }
  return (
    <>
       <Header otherPage = {true}/>
       <div className='promotion-detail-container'>
          <div className='promotion-text'>🎉 Khuyến mãi 🎉</div>
          <div className='promotion-detail-title'>Tuần lễ gầm cao – Chào hè rực rỡ</div>
          <div className='promotion-detail-date'>Từ ngày: <span>{promotion.startDate}</span> - <span>{promotion.endDate}</span></div>
          <div className='promotion-detail-thumnail' style={{backgroundImage : `url(${promotion?.banner?.[0]})`}}></div>
          <div dangerouslySetInnerHTML={{__html: promotion.contentHtml}} style={{marginLeft: "53px"}}></div>
          <div className='promotion-detail-btn-box'>
             <button className='btn-navigate-salon' onClick={handleNavigateSalon}> Khám phá ngay 🔎 </button>
             <FacebookShareButton
                url={`https://fe-salon-oto.vercel.app/promotionDetail/${promotion.promotion_id}`}
                className="mt-3 facebook-share"

              >
                <FacebookIcon size={32} round /> Chia sẻ lên Facebook
              </FacebookShareButton>
          </div>
       </div>
    </>
  )
}
