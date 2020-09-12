import _ from 'lodash'
import date from "./date"

function getPromotionBody(promotion = {}, couponPolicy) {
  const promotionFromCoupon = getPromotionFromCoupon(promotion, couponPolicy)
  const { effectiveDate, expiredDate } = promotionFromCoupon
  return { ...promotionFromCoupon, effectiveDate: date.formatYYYMMDD(effectiveDate), expiredDate: date.formatYYYMMDD(expiredDate) };
}

function getPromotionFromBody(promotion = {}) {
  const { effectiveDate, expiredDate } = promotion
  return { ...promotion, effectiveDate: new Date(effectiveDate), expiredDate: new Date(expiredDate) };
}

const couponPolicy = ["ratePromotionCoupon", "volumeFeeShipPromotionCoupon", "volumePromotionCoupon"]

function getCouponPolicyActive(promotion) {
  for (let i = 1; i <= couponPolicy.length; i += 1) {
    if(!_.isNull(promotion[couponPolicy[i]])) return couponPolicy[i];
  }
}

function getPromotionFromCoupon(promotion = {}, couponPolicyType) {
  let newPromotion = { ...promotion }
  const couponPolicyWithout = _.filter(couponPolicy, i => i !== couponPolicyType) || []
  _.forEach(couponPolicyWithout, i => {
    delete newPromotion[i]
  })
  return { ...newPromotion }
}

export default {
  getPromotionBody,
  getPromotionFromCoupon,
  getPromotionFromBody,
  getCouponPolicyActive
}