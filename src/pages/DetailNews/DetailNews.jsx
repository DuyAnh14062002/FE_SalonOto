import React, { useEffect, useState } from "react";
import "./DetailNews.scss";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import newApi from "../../apis/news.api";
export default function DetailNews() {
  const [news, setNews] = useState([]);
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    const loading = async () => {
      let res = await newApi.getDetailArticle(id);
      console.log("res : ", res);
      if (res?.data) {
        setNews(res.data);
      }
    };
    loading();
  }, []);
  return (
    <>
      <Header otherPage={true} />
      <div className="detail-new-container">
        <div className="detail-new-title">
          {news?.title}
        </div>
        <div className="detail-new-author">
          <span className="author">{news?.meta?.author}</span>{" "}
          <span className="detail-new-time">
            {news?.meta?.publish}
          </span>
        </div>
        <div className="detail-new-summary">
          {news?.summary}
        </div>
        {news?.articleBodyContent && news.articleBodyContent.length > 0 && news.articleBodyContent.map((item => {
         if(!item?.imgUrls && !item?.caption){
          if(item?.heading){
            return(
              <div className="detail-new-Text">
               <strong style={{fontSize: "35px"}}>{item.heading}</strong>
             </div>
            )
          }else{
            return (
              <div className="detail-new-Text">
               {item}
            </div>
            )
          }
         }else{
          return(
            <div className="detail-new-item">
            <div
              className="detail-new-image"
              style={{
                backgroundImage: `url(${item&& item.imgUrls &&item.imgUrls[0]})`,
              }}
            ></div>
            <div className="detail-new-caption">
             {item?.caption}
            </div>
          </div>
          )
         }
        }))}
      </div>
    </>
  );
}
