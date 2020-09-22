import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import _ from "lodash";
import { Button, Form, Dropdown } from "semantic-ui-react";
import styled from "styled-components";
import MessageError from "../MessageError";
import UploadImage from "../UploadImage";
import TextWarning from "../TextWarning";
import CartFormProduct from "./CartFormProduct";
import { validateCart } from "../../validate/validate";
import api from "../../api"
import provinceJSON from "../quanhuyen/tinh_tp.json"
import districtJSON from "../quanhuyen/quan_huyen.json"

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
};

function convertCartStateToBody(cart) {
  const { coupon, receivedDate, email, fullName, phone, addressDetail, addressType, productDetails, sex } = cart || {};
  const cartBody = {
    coupon, productDetails, receivedDate,
    userInfoOrder: {
      email, fullName, phone, sex,
      address: {
        addressDetail, addressType
      }
    }
  }
  return cartBody
}

function orderToCartState(order, products) {
  const { coupon, receivedDate, productDetails, userInfoOrder, totalCost, totalCostAfterPromotion, totalRatePromotion, paidStatus } = order || {};
  const { email, fullName, phone, sex, address } = userInfoOrder || {}
  const { addressDetail, addressType, provinceCode, districCode } = address || {}
  const productsKeyBy = _.keyBy(products, "id")
  const productDetailsConverted = _.map(productDetails, ({ productId, productQuantity }) => ({ productId, productQuantity }))
  const productDetailsView = _.map(productDetails, ({ productId, productQuantity }) => ({ productId, productQuantity, productName: _.get(productsKeyBy, [productId, "name"]) }))
  const cart = { coupon, receivedDate, email, fullName, phone, addressDetail, addressType, productDetails: productDetailsConverted, productDetailsView, sex, provinceCode, districCode, totalCost, totalCostAfterPromotion, totalRatePromotion, paidStatus };
  return cart;
}

const PROVINCE_HANOI = "01"
const DISTRIC_BADINH = "001"
const DICTRIC_IN_HANOI = district[PROVINCE_HANOI]

function ProductForm(props) {
  const [messageError, setMessageError] = useState({});
  const [districtData, setDistricData] = useState(DICTRIC_IN_HANOI)
  const [products, setProducts] = useState();
  const productsKeyBy = useMemo(() => _.keyBy(products, "id"), [products]);
  const [cart, setCart] = useState(cartInit);
  const productDetailsView = _.get(cart, "productDetailsView") || []
  const productDetails = _.get(cart, "productDetails") || []
  const sex = _.get(cart, "sex") || "MALE"
  const { coupon, receivedDate, email, fullName, phone, addressDetail, addressType, provinceCode, districCode, totalCost, totalCostAfterPromotion, totalRatePromotion, paidStatus } = cart || {};
  console.log("cart", cart)
  const [product, setProduct] = useState();
  const [isDistinc, setIsDistinc] = useState(false);
  const productId = _.get(product, "productId")
  const productQuantity = _.get(product, "productQuantity")

  const productsDropdown = useMemo(() => {
    return _.map(products, (item = {}) => ({ key: item.id, value: item.id, text: item.name }))
  }, [products])

  const { id, onUpdateScreen, onCancel } = props;

  const isShowFormFix = !!id;
  const title = isShowFormFix ? "Sửa đơn hàng" : "Thêm đơn hàng";

  console.log("CART", cart)

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
      }
    });

  }, [id])

  const onChangeProductQuantity = useCallback((productQuantity) => {
    setProduct({ ...product, productQuantity: _.parseInt(productQuantity) });
  }, [product])

  const onChangeDropdown = useCallback((e, data) => {
    const { value } = data || {};
    const productName = _.get(productsKeyBy, [value, "name"]) || ""
    setProduct({ ...product, productId: value, productName });
  }, [product, productsKeyBy])

  const onClickCancel = useCallback(() => {
    onCancel()
  }, [1]);

  const onAddProduct = useCallback(() => {
    const { productId, productQuantity } = product || {}
    const cartNew = { ...cart, productDetailsView: [...productDetailsView, product], productDetails: [...productDetails, { productId, productQuantity }] }
    setCart(cartNew);

    if (!_.isEmpty(messageError)) {
      const messageError = validateCart(cartNew) || {};
      setMessageError(messageError)
    }
  }, [product, cart, messageError]);

  const onRemoveProduct = useCallback((productId) => {
    const { productDetailsView, productDetails } = cart || {}
    const productDetailsViewNew = _.filter(productDetailsView, i => i.productId != productId)
    const productDetailsNew = _.filter(productDetails, i => i.productId != productId)
    const cartNew = { ...cart, productDetailsView: productDetailsViewNew, productDetails: productDetailsNew }
    setCart(cartNew);

    if (!_.isEmpty(messageError)) {
      const messageError = validateCart(cartNew) || {};
      setMessageError(messageError)
    }
  }, [product, cart, messageError]);

  const onClickCreateItem = useCallback(() => {

    const messageError = validateCart(cart) || {};
    setMessageError(messageError)
    if (!_.isEmpty(messageError)) return;

    const cartBody = convertCartStateToBody(cart)
    api.createOrder(cartBody).then(() => {
      onUpdateScreen()
      onCancel()
    });
  }, [cart, messageError]);

  const onChangeText = useCallback((e) => {
    const { name, value } = e.target;
    const cartNew = { ...cart, [name]: value }
    setCart(cartNew);

    if (!_.isEmpty(messageError)) {
      const messageError = validateCart(cartNew) || {};
      setMessageError(messageError)
    }
  }, [cart, messageError])

  const onChangeSex = useCallback((sex) => {
    const cartNew = { ...cart, sex }
    setCart(cartNew);

    if (!_.isEmpty(messageError)) {
      const messageError = validateCart(cartNew) || {};
      setMessageError(messageError)
    }
  }, [cart, messageError])

  const onChangeProvinceCode = (e, data) => {
    const { value } = data || {}
    const cartNew = { ...cart, provinceCode: value }
    setCart(cartNew);
    setDistricData(district[value])

    if (!_.isEmpty(messageError)) {
      const messageError = validateCart(cartNew) || {};
      setMessageError(messageError)
    }
  }

  return (
    <Container>
      <FormContainer>
        <FormTitle>{title}</FormTitle>
        <FormField>
          <Label>
            Sản phẩm
            <TextWarning />
          </Label>
          <div style={{ flexDirection: "row", display: "flex" }}>
            <Dropdown
              style={styles.dropdown}
              placeholder="Chọn sản phẩm"
              clearable
              selection
              value={productId || ""}
              options={productsDropdown}
              onChange={onChangeDropdown}
            />
            <Input
              left={20}
              right={20}
              width={200}
              placeholder={"Nhập số lượng"}
              value={productQuantity || ""}
              name="productQuantity"
              onInput={(e) => onChangeProductQuantity(e.target.value)}
              type="number"
              onFocus={() => setIsDistinc(true)}
            />
            <FormButton
              color="#34c242"
              onClick={onAddProduct}
            >
              Thêm sản phẩm
            </FormButton>
          </div>
          {_.size(productDetailsView) > 0 && <CartFormProduct data={productDetailsView} onRemove={onRemoveProduct} />}
        </FormField>

        <FormField>
          <Label>
            Mã giảm giá
            <TextWarning />
          </Label>
          <Input
            placeholder={"Nhập mã giảm giá"}
            value={coupon || ""}
            name="coupon"
            onInput={onChangeText}
            onFocus={() => setIsDistinc(true)}
          />
        </FormField>

        <FormField>
          <Label>
            Ngày nhận hàng
            <TextWarning />
          </Label>
          <Input
            placeholder="Chọn ngày nhận hàng"
            value={receivedDate || ""}
            name="receivedDate"
            onInput={onChangeText}
            onFocus={() => setIsDistinc(true)}
          />
        </FormField>
        {/*  */}
        {totalCost && <FormField>
          <Label>
            Tổng giá trị đơn hàng
          <TextWarning />
          </Label>
          <Input
            disabled
            value={totalCost || ""}
          />
        </FormField>}

        {totalRatePromotion && <FormField>
          <Label>
            Chiết khấu
          <TextWarning />
          </Label>
          <Input
            disabled
            value={totalRatePromotion || ""}
          />
        </FormField>}

        {totalCostAfterPromotion && <FormField>
          <Label>
            Tổng giá trị đơn hàng sau khuyến mại
          <TextWarning />
          </Label>
          <Input
            disabled
            value={totalCostAfterPromotion || ""}
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


        {/*  */}
        <FormField>
          <Label>
            Họ tên khách hàng
            <TextWarning />
          </Label>
          <MessageError messages={_.get(messageError, "fullName") || {}} />
          <Input
            placeholder="Nhập họ tên khách hàng"
            value={fullName || ""}
            name="fullName"
            onInput={onChangeText}
            onFocus={() => setIsDistinc(true)}
          />
        </FormField>

        <FormField>
          <Label>
            Giới tính
            <TextWarning />
          </Label>
          <MessageError messages={_.get(messageError, "sex") || {}} />
          <Form.Group inline>
            <Form.Radio
              label='Anh'
              value='MALE'
              checked={sex === 'MALE'}
              onChange={() => onChangeSex("MALE")}
            />
            <Form.Radio
              label='Chị'
              value='FEMALE'
              checked={sex === 'FEMALE'}
              onChange={() => onChangeSex("FEMALE")}
            />
          </Form.Group>
        </FormField>

        <FormField>
          <Label>
            Số điện thoại
            <TextWarning />
          </Label>
          <MessageError messages={_.get(messageError, "phone") || {}} />
          <Input
            type="number"
            placeholder="Nhập số điện thoại"
            value={phone || ""}
            name="phone"
            onInput={onChangeText}
            onFocus={() => setIsDistinc(true)}
          />
        </FormField>

        <FormField>
          <Label>
            Email
            <TextWarning />
          </Label>
          <MessageError messages={_.get(messageError, "email") || {}} />
          <Input
            type="email"
            placeholder="Nhập email"
            value={email || ""}
            name="email"
            onInput={onChangeText}
            onFocus={() => setIsDistinc(true)}
          />
        </FormField>

        <FormField>
          <Label>
            Tỉnh thành phố
            <TextWarning />
          </Label>
          <MessageError messages={_.get(messageError, "provinceCode") || {}} />
          <Dropdown
            placeholder='Chọn tỉnh thành phố'
            fluid
            selection
            value={provinceCode}
            options={provinceData}
            onChange={onChangeProvinceCode}
          />
        </FormField>

        <FormField>
          <Label>
            Quận huyện
            <TextWarning />
          </Label>
          <MessageError messages={_.get(messageError, "districCode") || {}} />
          <Dropdown
            placeholder='Chọn quận huyện'
            fluid
            value={districCode}
            selection
            options={districtData}
            onChange={(e, { value }) => {
              setCart({ ...cart, districCode: value })
            }}
          />
        </FormField>

        <FormField>
          <Label>
            Địa chỉ
            <TextWarning />
          </Label>
          <MessageError messages={_.get(messageError, "addressDetail") || {}} />
          <Input
            placeholder="Nhập địa chỉ"
            value={addressDetail || ""}
            name="addressDetail"
            onInput={onChangeText}
            onFocus={() => setIsDistinc(true)}
          />
        </FormField>

        <FormField>
          <Label>
            Loại địa chỉ
            <TextWarning />
          </Label>
          <MessageError messages={_.get(messageError, "addressType") || {}} />
          <Button primary={addressType === "COMPANY"} onClick={() => onChangeText({ target: { value: "COMPANY", name: "addressType" } })}>Công ty</Button>
          <Button primary={addressType === "HOME"} onClick={() => onChangeText({ target: { value: "HOME", name: "addressType" } })}>Nhà riêng</Button>

        </FormField>

        {isShowFormFix ? (
          <GroupBtn>
            <WrapperBtn>
              <FormButton color="#676561" right={24} onClick={onClickCancel}>
                Thoát
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
                  disabled={!_.isEmpty(messageError)}
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
