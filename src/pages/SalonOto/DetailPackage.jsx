import React from 'react'
import Header from '../../components/Header'
import "./DetailPackage.scss"
export default function DetailPackage() {
  return (
    <div>
      <Header otherPage={true} />
      <div className='container-detail-package'>
        <h4 style={{textAlign: "center" , margin: "20px 0" , }}>Chi tiết gói</h4>
      </div>
    </div>
  )
}
