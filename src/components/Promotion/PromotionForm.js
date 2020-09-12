import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import _ from "lodash";
import { Button, Form, Dropdown, Checkbox } from "semantic-ui-react";
import styled from "styled-components";
import api from "../../api"
import utils from "../../utils"
import ChooseCalendar from "../ChooseCalendar"
import TextWarning from "../TextWarning";

const Container = styled.div`
  display: flex;
  flex: 1;
  padding: 30px;
  border-radius: 3px;
  border: solid 1px #e1dfdf;
  background-color: #f5f5f5;
`;

const FormContainer = styled(Form)`
  flex: 1;
`;

const FormTitle = styled.div`
  font-family: Arial !important;
  font-size: 20px !important;
  font-weight: normal;
  color: #606266;
`;

const Label = styled.label`
  font-family: Arial !important;
  font-size: 14px !important;
  font-weight: normal !important;
  color: #606266 !important;
`;

const Description = styled.label`
  font-family: Arial !important;
  font-size: 13px !important;
  font-style: italic !important;
  font-weight: normal !important;
  color: #8b8d92 !important;
`;

const FormField = styled(Form.Field)`
  margin-top: 35px !important;
  .text {
    font-family: Arial !important;
    font-size: 11px !important;
    font-weight: normal;
    color: #575757;
  }
  div.selected span.text {
    font-weight: bold;
  }
`;

const WrapperBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const GroupBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
`;

const FormButton = styled(Button)`
  font-family: Arial !important;
  font-size: 14px !important;
  color: #fff !important;
  background-color: ${(props) => `${props.color}!important`};
  margin-right: ${(props) => `${props.right}px!important`};
`;

const Input = styled.input`
  font-family: Arial !important;
  font-size: 14px !important;
  font-weight: normal;
  color: #575757;
  width: ${(props) => props.width ? `${props.width}px!important` : "auto"};
  margin-left: ${(props) => `${props.left}px!important`};
  margin-right: ${(props) => `${props.right}px!important`};
`;

const styles = {
  dropdown: {
    fontSize: "14px !important",
  },
};

const PROMOTION_TYPE_COUPON = "COUPON"
const PROMOTION_TYPE_CATEGORY = "CATEGORY"
const PROMOTION_TYPE_PRODUCT = "PRODUCT"

const promotionDropdown = [
  {
    key: PROMOTION_TYPE_CATEGORY,
    text: "Khuyến mại theo loại sản phẩm",
    value: PROMOTION_TYPE_CATEGORY
  },
  {
    key: PROMOTION_TYPE_PRODUCT,
    text: "Khuyến mại theo sản phẩm",
    value: PROMOTION_TYPE_PRODUCT
  },
  {
    key: PROMOTION_TYPE_COUPON,
    text: "Khuyến mại theo Coupon",
    value: PROMOTION_TYPE_COUPON
  }
]

function ProductForm(props) {

  //props
  const { id, onUpdateScreen, onCancel } = props;
  const isShowFormFix = !!id;
  const title = isShowFormFix ? "Sửa khuyến mại" : "Thêm khuyến mại";

  // =================== common ===================
  const [isDistinc, setIsDistinc] = useState(false);
  const [promotion, setPromotion] = useState({
    effectiveDate: new Date(),
    expiredDate: new Date(),
  });
  const {
    effectiveDate,
    expiredDate,
    promotionType,
    productId,
    ratePromotionProduct,
    codeCoupon,
    categoryId,
    ratePromotionCategory,
    minVolumeOrderApplyCoupon,
    ratePromotionCoupon,
    volumeFeeShipPromotionCoupon,
    volumePromotionCoupon
  } = promotion || {};
  console.log("promotion", promotion)

  //
  // =================== category ===================
  //
  const [categories, setCategories] = useState();
  const categoriesDropdown = useMemo(() => {
    return _.map(categories, (item = {}) => ({ key: item.id, value: item.id, text: item.name }))
  }, [categories])
  //
  // =================== product ===================
  //
  const [products, setProducts] = useState();
  const productsDropdown = useMemo(() => _.map(products, (item = {}) => ({ key: item.id, value: item.id, text: item.name })), [products])

  //
  // =================== coupon ===================
  //
  const [couponPolicy, setCouponPolicy] = useState("ratePromotionCoupon");

  useEffect(() => {
    // api.queryPromotions({ size: 10000 }).then(({ content }) => setProducts(content));
    api.queryCategory({ size: 10000 }).then(({ content }) => setCategories(content));
    api.queryProduct({ size: 10000 }).then(({ content }) => setProducts(content));
    api.getPromotion(id).then(res => {
      if (_.isEmpty(res)) return
      const promotion = utils.getPromotionFromBody(res)
      const couponPolicy = utils.getCouponPolicyActive(promotion);
      setCouponPolicy(couponPolicy)
      setPromotion(promotion)
    })
  }, [id])

  // common
  const onClickCancel = useCallback(() => {
    onCancel()
    setPromotion({});
    setIsDistinc(false);
  }, [1]);

  const onClickUpdateItem = () => {
    const promotionBody = utils.getPromotionBody(promotion, couponPolicy)
    api.updatePromotion(promotionBody).then(() => {
      onUpdateScreen()
      onCancel()
      setPromotion({});
      setIsDistinc(false);
    })
  }

  const onClickCreateItem = () => {
    const promotionBody = utils.getPromotionBody(promotion, couponPolicy)
    api.createPromotion(promotionBody).then(() => {
      setPromotion({});
      onCancel()
      onUpdateScreen();
    }).catch(console.log)
    setIsDistinc(false);
  }

  const onChangeDropdown = (e, data, name) => {
    const { value } = data || {};
    const promotionNew = { ...promotion, [name]: value };
    setPromotion(promotionNew);
  }

  const onChangePromotionType = (e, data) => {
    const { value } = data || {};
    const promotionNew = utils.getPromotion(value, promotion);
    setPromotion(promotionNew);
  }

  const onChangeText = (e) => {
    const { name, value } = e.target;
    const promotionNew = { ...promotion, [name]: value };
    setPromotion(promotionNew);
  }

  const onChangeTextCoupon = (e) => {
    const { name, value } = e.target;
    const promotionNew = { ...promotion, [name]: value };
    setPromotion(promotionNew);
  }

  const onChangeEffectiveDate = (effectiveDate) => {
    const promotionNew = { ...promotion, effectiveDate };
    setPromotion(promotionNew);
  }

  const onChangeExpiredDate = (expiredDate) => {
    const promotionNew = { ...promotion, expiredDate };
    setPromotion(promotionNew);
  }

  return (
    <Container>
      <FormContainer>
        <FormTitle>{title}</FormTitle>

        <FormField>
          <Label>
            Chọn lọai khuyến mại
            <TextWarning />
          </Label>
          <Dropdown
            style={styles.dropdown}
            placeholder="Chọn loại khuyến mại"
            clearable
            selection
            value={promotionType || ""}
            options={promotionDropdown}
            onChange={onChangePromotionType}
          />
        </FormField>

        <FormField>
          <Label>
            Chọn ngày bắt đầu
            <TextWarning />
          </Label>
          <ChooseCalendar
            onChange={onChangeEffectiveDate}
            date={effectiveDate}
          />
        </FormField>

        <FormField>
          <Label>
            Chọn ngày kết thúc
            <TextWarning />
          </Label>
          <ChooseCalendar
            onChange={onChangeExpiredDate}
            date={expiredDate}
          />
        </FormField>

        {/* =================== category =================== */}

        {promotionType === PROMOTION_TYPE_CATEGORY && <FormField>
          <Label>
            Chọn loại Sản phẩm
            <TextWarning />
          </Label>
          <Dropdown
            style={styles.dropdown}
            placeholder="Chọn loại sản phẩm"
            clearable
            selection
            value={categoryId || ""}
            options={categoriesDropdown}
            onChange={(e, data) => onChangeDropdown(e, data, "categoryId")}
          />
        </FormField>}

        {promotionType === PROMOTION_TYPE_CATEGORY && <FormField>
          <Label>
            Phần trăm chiết khấu của khuyến mại theo loại sản phẩm
            <TextWarning />
          </Label>
          <Input
            type="number"
            placeholder="Nhập Phần trăm chiết khấu"
            value={ratePromotionCategory || ""}
            name="ratePromotionCategory"
            onInput={onChangeText}
            onFocus={() => setIsDistinc(true)}
          />
        </FormField>}



        {/* =================== product =================== */}

        {promotionType === PROMOTION_TYPE_PRODUCT && <FormField>
          <Label>
            Chọn Sản phẩm
            <TextWarning />
          </Label>
          <Dropdown
            style={styles.dropdown}
            placeholder="Chọn sản phẩm"
            clearable
            selection
            value={productId || ""}
            options={productsDropdown}
            onChange={(e, data) => onChangeDropdown(e, data, "productId")}
          />
        </FormField>}

        {promotionType === PROMOTION_TYPE_PRODUCT && <FormField>
          <Label>
            Phần trăm chiết khấu của khuyến mại theo sản phẩm
            <TextWarning />
          </Label>
          <Input
            type="number"
            placeholder="Nhập Phần trăm chiết khấu"
            value={ratePromotionProduct || ""}
            name="ratePromotionProduct"
            onInput={onChangeText}
            onFocus={() => setIsDistinc(true)}
          />
        </FormField>}

        {/* =================== coupon =================== */}

        {
          promotionType === PROMOTION_TYPE_COUPON && <FormField>
            <Label>
              Mã coupon
          <TextWarning />
            </Label>
            <Input
              placeholder={"Nhập mã coupon"}
              value={codeCoupon || ""}
              name="codeCoupon"
              onInput={onChangeText}
              onFocus={() => setIsDistinc(true)}
            />
            {/* <MessageError isShow={isDistinc && nameError} messages={nameError} /> */}
          </FormField>
        }

        {promotionType === PROMOTION_TYPE_COUPON && <FormField>
          <Label>
            Phần giá trị đơn hàng nhỏ nhất được áp dụng
            <TextWarning />
          </Label>
          <Input
            type="number"
            placeholder="Nhập giá trị đơn hàng"
            value={minVolumeOrderApplyCoupon || ""}
            name="minVolumeOrderApplyCoupon"
            onInput={onChangeText}
            onFocus={() => setIsDistinc(true)}
          />
        </FormField>}

        {promotionType === PROMOTION_TYPE_COUPON && <FormField>
          <Label>
            Áp dụng 1 trong 3 chính sách coupon bên dưới
          </Label>
        </FormField>}

        {promotionType === PROMOTION_TYPE_COUPON && <FormField>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Form.Radio
              value='ratePromotionCoupon'
              checked={couponPolicy === 'ratePromotionCoupon'}
              onChange={() => setCouponPolicy("ratePromotionCoupon")}
              style={{ marginRight: 20 }}
            />
            <Label>
              Phần trăm chiết khấu của khuyến mại theo mã coupon
            <TextWarning />
            </Label>
          </div>
          <Input
            type="number"
            placeholder="Nhập Phần trăm chiết khấu"
            value={ratePromotionCoupon || ""}
            name="ratePromotionCoupon"
            onInput={onChangeTextCoupon}
            onFocus={() => setIsDistinc(true)}
          />
        </FormField>}

        {promotionType === PROMOTION_TYPE_COUPON && <FormField>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Form.Radio
              value='volumeFeeShipPromotionCoupon'
              checked={couponPolicy === 'volumeFeeShipPromotionCoupon'}
              onChange={() => setCouponPolicy("volumeFeeShipPromotionCoupon")}
              style={{ marginRight: 20 }}
            />
            <Label>
              Phần số tiền Freeship của khuyến mại theo mã coupon
            <TextWarning />
            </Label>
          </div>
          <Input
            type="number"
            placeholder="Phần số tiền Freeship"
            value={volumeFeeShipPromotionCoupon || ""}
            name="volumeFeeShipPromotionCoupon"
            onInput={onChangeTextCoupon}
            onFocus={() => setIsDistinc(true)}
          />
        </FormField>}

        {promotionType === PROMOTION_TYPE_COUPON && <FormField>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Form.Radio
              value='volumePromotionCoupon'
              checked={couponPolicy === 'volumePromotionCoupon'}
              onChange={() => setCouponPolicy("volumePromotionCoupon")}
              style={{ marginRight: 20 }}
            />
            <Label>
              Phần số tiền được giảm của khuyến mại theo mã coupon
            <TextWarning />
            </Label>
          </div>
          <Input
            type="number"
            placeholder="Nhập số tiền được giảm"
            value={volumePromotionCoupon || ""}
            name="volumePromotionCoupon"
            onInput={onChangeTextCoupon}
            onFocus={() => setIsDistinc(true)}
          />
        </FormField>}

        {isShowFormFix ? (
          <GroupBtn>
            <WrapperBtn>
              <FormButton color="#676561" right={24} onClick={onClickCancel}>
                Huỷ
              </FormButton>
            </WrapperBtn>
            <WrapperBtn>
              <FormButton
                color="#f7a100"
                onClick={onClickUpdateItem}
              // disabled={!_.isEmpty(messageError)}
              >
                Cập nhật
              </FormButton>
            </WrapperBtn>
          </GroupBtn>
        ) : (
            <GroupBtn>
              <WrapperBtn>
                <FormButton color="#676561" right={24} onClick={onClickCancel}>
                  Huỷ
              </FormButton>
              </WrapperBtn>
              <WrapperBtn>
                <FormButton
                  color="#34c242"
                  onClick={onClickCreateItem}
                // disabled={!_.isEmpty(messageError)}
                >
                  Thêm mới
            </FormButton>
              </WrapperBtn>
            </GroupBtn>
          )}
      </FormContainer>
    </Container>
  );
}

export default ProductForm;
