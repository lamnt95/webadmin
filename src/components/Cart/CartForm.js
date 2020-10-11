import { useState, useCallback, useEffect, useMemo } from "react";
import _ from "lodash";
import { Button, Form, Dropdown } from "semantic-ui-react";
import styled from "styled-components";
import TextWarning from "../TextWarning";
import CartFormProduct from "./CartFormProduct";
import api from "../../api"
import provinceJSON from "../quanhuyen/tinh_tp.json"
import districtJSON from "../quanhuyen/quan_huyen.json"
import utils from "../../utils"

const provinceData = _.values(provinceJSON);

function getDistrictData() {
  const districts = _.values(districtJSON);
  const districtGroup = _.groupBy(districts, "parent_code");
  return districtGroup
}
const district = getDistrictData();

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

const cartInit = {
  coupon: undefined,
  sex: "MALE",
  payment: "CASH",
};

function orderToCartState(order, products) {
  const { coupon, receivedDate, productDetails, userInfoOrder, totalCost, totalCostAfterPromotion, totalRatePromotion, paidStatus, valueCoupon, valuePayment, orderStatus, payment } = order || {};
  const { email, fullName, phone, sex, address } = userInfoOrder || {}
  const { addressDetail, addressType, provinceCode, districCode } = address || {}
  const productsKeyBy = _.keyBy(products, "id")
  const productDetailsConverted = _.map(productDetails, ({ productId, productQuantity }) => ({ productId, productQuantity }))
  const productDetailsView = _.map(productDetails, ({ productId, productQuantity, price, priceAfterPromotion, totalCost, totalCostAfterPromotion, totalRatePromotion }) => ({ totalRatePromotion, totalCost, totalCostAfterPromotion, productId, productQuantity, price, priceAfterPromotion, productName: _.get(productsKeyBy, [productId, "name"]) }))
  const cart = { payment, orderStatus, valueCoupon, valuePayment, coupon, receivedDate, email, fullName, phone, addressDetail, addressType, productDetails: productDetailsConverted, productDetailsView, sex, provinceCode, districCode, totalCost, totalCostAfterPromotion, totalRatePromotion, paidStatus };
  return cart;
}

const PROVINCE_HANOI = "01"
const DISTRIC_BADINH = "001"
const DICTRIC_IN_HANOI = district[PROVINCE_HANOI]

function ProductForm(props) {
  const [districtData, setDistricData] = useState(DICTRIC_IN_HANOI)
  const [products, setProducts] = useState();
  const productsKeyBy = useMemo(() => _.keyBy(products, "id"), [products]);
  const [cart, setCart] = useState(cartInit);
  const productDetailsView = _.get(cart, "productDetailsView") || []
  const productDetails = _.get(cart, "productDetails") || []
  const sex = _.get(cart, "sex") || "MALE"
  const { payment, orderStatus, valueCoupon, valuePayment, coupon, receivedDate, email, fullName, phone, addressDetail, addressType, provinceCode, districCode, totalCost, totalCostAfterPromotion, totalRatePromotion, paidStatus } = cart || {};
  const [product, setProduct] = useState();

  const { id, onCancel } = props;

  const title = "Xem đơn hàng";


  useEffect(() => {
    setDistricData(district[provinceCode])
  }, [provinceCode])

  useEffect(() => {
    api.queryProduct({ size: 10000 }).then(({ content: products }) => {
      setProducts(products)
      if (!_.isUndefined(id)) {
        api.getOrder(id).then(order => {
          const cart = orderToCartState(order, products);
          setCart(cart)
        })
      } else {
        const cartNew = orderToCartState(cart, products);
        setCart(cartNew)
      }
    });

  }, [id])
  const onClickCancel = useCallback(() => {
    onCancel()
  }, [1]);

  return (
    <Container>
      <FormContainer>
        <FormTitle>{title}</FormTitle>
        <FormField>
          <Label>
            Sản phẩm
            <TextWarning />
          </Label>
          {_.size(productDetailsView) > 0 && <CartFormProduct data={productDetailsView} productsKeyBy={productsKeyBy} />}
        </FormField>

        {totalCost && <FormField>
          <Label>
            Tổng thành tiền
          <TextWarning />
          </Label>
          <Input
            disabled
            value={utils.formatMoney(totalCost) || ""}
          />
        </FormField>}

        {totalCostAfterPromotion && <FormField>
          <Label>
            Tổng thành tiền sau chiết khấu
          <TextWarning />
          </Label>
          <Input
            disabled
            value={utils.formatMoney(totalCostAfterPromotion) || ""}
          />
        </FormField>}

        {totalCost && <FormField>
          <Label>
            Tổng chiết khấu
          <TextWarning />
          </Label>
          <Input
            disabled
            value={utils.formatMoney(totalCost - totalCostAfterPromotion) || "0"}
          />
        </FormField>}

        {!_.isNull(totalRatePromotion) && <FormField>
          <Label>
            Tổng % chiết khấu
          <TextWarning />
          </Label>
          <Input
            disabled
            value={utils.formatMoney(totalRatePromotion)}
          />
        </FormField>}


        <FormField>
          <Label>
            Mã giảm giá
            <TextWarning />
          </Label>
          <Input
            placeholder={"Nhập mã giảm giá"}
            value={coupon || ""}
            name="coupon"
            disabled
          />
        </FormField>


        {valueCoupon && <FormField>
          <Label>
            Khuyến mại theo coupon
          <TextWarning />
          </Label>
          <Input
            disabled
            value={utils.formatMoney(valueCoupon) || ""}
          />
        </FormField>}

        {valuePayment && <FormField>
          <Label>
            Tổng thanh toán
          <TextWarning />
          </Label>
          <Input
            disabled
            value={valuePayment || ""}
          />
        </FormField>}

        <FormField>
          <Label>
            Ngày nhận hàng
            <TextWarning />
          </Label>
          <Input
            placeholder="Chọn ngày nhận hàng"
            value={receivedDate || ""}
            name="receivedDate"
            disabled
          />
        </FormField>
        {/*  */}

        {orderStatus && <FormField>
          <Label>
            Trạng thái đơn hàng
          <TextWarning />
          </Label>
          <Input
            disabled
            value={orderStatus || ""}
          />
        </FormField>}

        {paidStatus && <FormField>
          <Label>
            Trạng thái thanh toán
          <TextWarning />
          </Label>
          <Input
            disabled
            value={paidStatus || ""}
          />
        </FormField>}

        {payment && <FormField>
          <Label>
            Hình thức thanh toán
            <TextWarning />
          </Label>
          <Button primary={payment === "CASH"} disabled>Tiền mặt</Button>
          <Button primary={payment === "ONLINE"} disabled>Chuyển khoản</Button>

        </FormField>}


        {/*  */}
        <FormField>
          <Label>
            Họ tên khách hàng
            <TextWarning />
          </Label>
          <Input
            placeholder="Nhập họ tên khách hàng"
            value={fullName || ""}
            name="fullName"
            disabled
          />
        </FormField>

        <FormField>
          <Label>
            Giới tính
            <TextWarning />
          </Label>
          <Form.Group inline>
            <Form.Radio
              label='Anh'
              value='MALE'
              checked={sex === 'MALE'}
              disabled
            />
            <Form.Radio
              label='Chị'
              value='FEMALE'
              disabled
              checked={sex === 'FEMALE'}
            />
          </Form.Group>
        </FormField>

        <FormField>
          <Label>
            Số điện thoại
            <TextWarning />
          </Label>
          <Input
            type="number"
            placeholder="Nhập số điện thoại"
            value={phone || ""}
            disabled
            name="phone"
          />
        </FormField>

        <FormField>
          <Label>
            Email
            <TextWarning />
          </Label>
          <Input
            type="email"
            placeholder="Nhập email"
            value={email || ""}
            disabled
            name="email"
          />
        </FormField>

        <FormField>
          <Label>
            Tỉnh thành phố
            <TextWarning />
          </Label>
          <Dropdown
            placeholder='Chọn tỉnh thành phố'
            fluid
            selection
            value={provinceCode}
            disabled
            options={provinceData}
          />
        </FormField>

        <FormField>
          <Label>
            Quận huyện
            <TextWarning />
          </Label>
          <Dropdown
            placeholder='Chọn quận huyện'
            fluid
            disabled
            value={districCode}
            selection
            options={districtData}
          />
        </FormField>

        <FormField>
          <Label>
            Địa chỉ
            <TextWarning />
          </Label>
          <Input
            placeholder="Nhập địa chỉ"
            value={addressDetail || ""}
            name="addressDetail"
            disabled
          />
        </FormField>

        <FormField>
          <Label>
            Loại địa chỉ
            <TextWarning />
          </Label>
          <Button primary={addressType === "COMPANY"} disabled>Công ty</Button>
          <Button primary={addressType === "HOME"} disabled>Nhà riêng</Button>

        </FormField>
          <GroupBtn>
            <WrapperBtn>
              <FormButton color="#676561" right={24} onClick={onClickCancel}>
                Thoát
              </FormButton>
            </WrapperBtn>
          </GroupBtn>
      </FormContainer>
    </Container>
  );
}

export default ProductForm;
