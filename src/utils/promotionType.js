import _ from "lodash"

const PROMOTION_TYPE_COUPON = "COUPON"
const PROMOTION_TYPE_CATEGORY = "CATEGORY"
const PROMOTION_TYPE_PRODUCT = "PRODUCT"

function getPromotion(promotionType, promotion = {}) {
  let promotionNew = { promotionType };
  switch (promotionType) {
    case PROMOTION_TYPE_CATEGORY: {
      const {
        effectiveDate,
        expiredDate,
        categoryId,
        ratePromotionCategory,
      } = promotion || {};
      return { promotionType, effectiveDate, expiredDate, categoryId, ratePromotionCategory }
    }

    case PROMOTION_TYPE_PRODUCT: {
      const {
        effectiveDate,
        expiredDate,
        productId,
        ratePromotionProduct,
      } = promotion || {};
      return { promotionType, effectiveDate, expiredDate, productId, ratePromotionProduct }
    }

    case PROMOTION_TYPE_COUPON: {
      const {
        effectiveDate,
        expiredDate,
        codeCoupon,
        minVolumeOrderApplyCoupon,
        ratePromotionCoupon,
        volumeFeeShipPromotionCoupon,
        volumePromotionCoupon,
      } = promotion || {};
      return {
        promotionType, effectiveDate, expiredDate, codeCoupon,
        minVolumeOrderApplyCoupon,
        ratePromotionCoupon,
        volumeFeeShipPromotionCoupon,
        volumePromotionCoupon
      }
    }

    default:
      return {}
  }
}

export default {
  getPromotion
}