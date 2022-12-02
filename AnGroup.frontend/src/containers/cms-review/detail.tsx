import React from 'react'
import CMSReviewDetailForm from './components/detail-form'
import { CMSReviewHeaderForDetails } from './components/header/for-details'

export default function CMSDReviewDetailContainer() {
  return (
    <div>
      <CMSReviewHeaderForDetails />
      <CMSReviewDetailForm />
    </div>
  )
}
