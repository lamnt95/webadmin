import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import _ from "lodash";
import { Button, Form, Dropdown } from "semantic-ui-react";
import styled from "styled-components";
import MessageError from "../MessageError";
import UploadImage from "../UploadImage";
// import imageService from "../../services/imageService";
import TextWarning from "../TextWarning";
import { validateProduct } from "../../validate/validate";
import api from "../../api"
import AddImage from "../AddImage"
import utils from "../../utils"

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
  margin-top: 5px !important;
`;

const FormTextArea = styled.textarea`
  font-family: Arial !important;
  font-size: 14px !important;
  font-weight: normal;
  color: #575757;
  margin-top: 5px !important;
`;

const styles = {
  dropdown: {
    fontSize: "14px !important",
  },
};

const productInit = {
  name: undefined,
  price: undefined,
  description: undefined,
  categoryId: undefined,
};

function ProductForm(props) {
  const [isDistinc, setIsDistinc] = useState(false);
  const [product, setProduct] = useState(productInit);
  const { categoryId } = product || {}
  const [categories, setCategories] = useState();
  const [subImage, setSubImage] = useState();
  const [avatar, setAvatar] = useState();

  const categoriesDropdown = useMemo(() => {
    return _.map(categories, (item = {}) => ({ key: item.id, value: item.id, text: item.name }))
  }, [categories])

  const { id, onUpdateScreen, onCancel } = props;
  const isShowFormFix = !!id;
  const { name, price, description, unit } = product || {};
  const subImages = _.get(product, "subImages") || [];
  const image = _.get(product, "image") || [];
  const title = isShowFormFix ? "Sửa sản phẩm" : "Thêm sản phẩm";
  const messageError = validateProduct(product);
  const { name: nameError, price: priceError, description: descriptionError, categoryId: categoryIdError } = messageError || {};

  useEffect(() => {
    api.queryCategory({ size: 10000 }).then(({ content }) => setCategories(content));
  }, [id])

  useEffect(() => {
    if (!!id) {
      api.getProduct(id)
        .then(res => ({ ...res, subImages: utils.addIdImage(res.subImages), image: utils.addIdImage([res.image]) }))
        .then(setProduct)
    }
  }, [id])

  console.log("product", product)

  const onChangeDropdown = useCallback((e, data) => {
    const { value } = data || {};
    const productNew = { ...product, categoryId: value };
    setProduct(productNew);
  }, [product])

  const onClickCancel = useCallback(() => {
    onCancel()
    setProduct(productInit);
    setIsDistinc(false);
  }, [1]);

  const onClickUpdateItem = useCallback(() => {
    const productNew = utils.convertProduct(product)
    api.updateProduct(productNew).then(() => {
      onUpdateScreen()
      onCancel()
      setProduct(productInit);
      setIsDistinc(false);
    })

  }, [product])

  const onClickCreateItem = useCallback(() => {
    const productNew = utils.convertProduct(product)
    api.createProduct(productNew).then(() => {
      setProduct(productInit);
      onCancel()
      onUpdateScreen();
    }).catch(console.log)
    setIsDistinc(false);
  }, [product]);

  const onChangeText = useCallback((e) => {
    const { name, value } = e.target;
    const productNew = { ...product, [name]: value };
    setProduct(productNew);
  }, [product])



  // sub images

  const onChangeImageSrc = (e) => {
    const { value } = e.target || {}
    setSubImage(value)
  }

  const onRemoveImageSrc = (imageId) => {
    const imagesNew = _.filter(subImages, i => i.id !== imageId)
    const productNew = { ...product, subImages: imagesNew };
    setProduct(productNew);
  }

  const onAddImageSrc = () => {
    const imagesNew = [...subImages, utils.addIdOneImage(subImage)];
    const productNew = { ...product, subImages: imagesNew };
    setProduct(productNew);
  }

  // image
  const onChangeAvatarSrc = (e) => {
    const { value } = e.target || {}
    setAvatar(value)
  }

  const onRemoveAvatarSrc = (imageId) => {
    setProduct({ ...product, image: [] });
  }

  const onAddAvatarSrc = () => {
    const productNew = { ...product, image: [utils.addIdOneImage(avatar)] };
    setProduct(productNew);
  }


  return (
    <Container>
      <FormContainer>
        <FormTitle>{title}</FormTitle>
        <FormField>
          <AddImage
            title=" Ảnh bìa sản phẩm"
            images={image}
            value={avatar}
            onChange={onChangeAvatarSrc}
            onRemove={onRemoveAvatarSrc}
            onAdd={onAddAvatarSrc}
            errors={messageError}
            onFocus={() => setIsDistinc(true)}
          />
        </FormField>
        <FormField>
          <AddImage
            title=" Ảnh phụ sản phẩm"
            images={subImages}
            value={subImage}
            onChange={onChangeImageSrc}
            onRemove={onRemoveImageSrc}
            onAdd={onAddImageSrc}
            errors={messageError}
            onFocus={() => setIsDistinc(true)}
          />
        </FormField>

        <FormField>
          <Label>
            Chọn loại sản phẩm
            <TextWarning />
          </Label>
          <Dropdown
            style={styles.dropdown}
            placeholder="Chọn loại sản phẩm"
            clearable
            selection
            value={categoryId || ""}
            options={categoriesDropdown}
            onChange={onChangeDropdown}
          />
          <MessageError isShow={isDistinc && nameError} messages={nameError} />
        </FormField>

        <FormField>
          <Label>
            Tên sản phẩm
            <TextWarning />
          </Label>
          <Input
            placeholder={"Tên sản phẩm"}
            value={name || ""}
            name="name"
            onInput={onChangeText}
            onFocus={() => setIsDistinc(true)}
          />
          <MessageError isShow={isDistinc && nameError} messages={nameError} />
        </FormField>

        <FormField>
          <Label>
            Mô tả sản phẩm
            <TextWarning />
          </Label>
          <Input
            placeholder={"Nhập mô tả"}
            value={description || ""}
            name="description"
            onInput={onChangeText}
            onFocus={() => setIsDistinc(true)}
          />
          <MessageError isShow={isDistinc && descriptionError} messages={descriptionError} />
        </FormField>

        <FormField>
          <Label>
            Đơn vị sản phẩm
            <TextWarning />
          </Label>
          <Input
            placeholder={"Nhập đơn vị"}
            value={unit || ""}
            name="unit"
            onInput={onChangeText}
            onFocus={() => setIsDistinc(true)}
          />
          <MessageError isShow={isDistinc && descriptionError} messages={descriptionError} />
        </FormField>

        <FormField>
          <Label>
            Giá sản phẩm
            <TextWarning />
          </Label>
          <Input
            type="number"
            placeholder={"Nhập giá sản phẩm"}
            value={price || ""}
            name="price"
            onInput={onChangeText}
            onFocus={() => setIsDistinc(true)}
          />
          <MessageError isShow={isDistinc && priceError} messages={priceError} />
        </FormField>

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
                disabled={!_.isEmpty(messageError)}
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
