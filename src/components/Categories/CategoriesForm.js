import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import _ from "lodash";
import { Button, Form } from "semantic-ui-react";
import styled from "styled-components";
import MessageError from "../MessageError";
import UploadImage from "../UploadImage";
// import imageService from "../../services/imageService";
import TextWarning from "../TextWarning";
import { validateCategory } from "../../validate/validate";
import AddImage from "../AddImage"
import api from "../../api"
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

const categoryInit = {
  name: undefined,
};

function CategoriesForm(props) {
  const [isDistinc, setIsDistinc] = useState(false);
  const [category, setCategory] = useState(categoryInit);
  const [image, setImage] = useState();

  const { id, onUpdateScreen, onCancel } = props;
  const isShowFormFix = !!id;
  const { name } = category || {};
  const images = _.get(category, "images") || [];
  const title = isShowFormFix ? "Sửa chuyên mục" : "Thêm chuyên mục";
  const messageError = validateCategory(category);
  const { name: nameError } = messageError || {};
  let fileInputRef = useRef(null);

  console.log("category", category)

  useEffect(() => {
    if (!!id) {
      api.getCategory(id)
        .then(res => ({ ...res, images: utils.addIdImage(res.images) }))
        .then(setCategory)
    }
  }, [id])

  const onClickCancel = useCallback(() => {
    onCancel()
    setCategory(categoryInit);
    setIsDistinc(false);
  }, [1]);

  const onClickUpdateItem = useCallback(() => {
    const categoryNew = utils.convertCategory(category)
    api.updateCategory(categoryNew).then(() => {
      onUpdateScreen()
      onCancel()
      setImage("");
      setCategory(categoryInit);
      setIsDistinc(false);
    })

  }, [category])

  const onClickCreateItem = useCallback(() => {
    const categoryNew = utils.convertCategory(category)
    api.createCategory(categoryNew).then(() => {
      setCategory(categoryInit);
      setImage("");
      onUpdateScreen();
    }).catch(console.log)
    setIsDistinc(false);
  }, [category]);

  const onChangeText = useCallback((e) => {
    const { name, value } = e.target;
    const categoryNew = { ...category, [name]: value };
    setCategory(categoryNew);
  }, [category])

  const onChangeImageSrc = (e) => {
    const { value } = e.target || {}
    setImage(value)
  }

  const onRemoveImageSrc = (imageId) => {
    const imagesNew = _.filter(images, i => i.id !== imageId)
    const categoryNew = { ...category, images: imagesNew };
    setCategory(categoryNew);
  }

  const onAddImageSrc = () => {
    const imagesNew = [...images, utils.addIdOneImage(image)];
    const categoryNew = { ...category, images: imagesNew };
    setCategory(categoryNew);
  }

  return (
    <Container>
      <FormContainer>
        <FormTitle>{title}</FormTitle>
        <FormField>
          <AddImage
            title="Ảnh chuyên mục"
            images={images}
            value={image}
            onChange={onChangeImageSrc}
            onRemove={onRemoveImageSrc}
            onAdd={onAddImageSrc}
            errors={messageError}
            onFocus={() => setIsDistinc(true)}
          />
        </FormField>
        <FormField>
          <Label>
            Tên chuyên mục
            <TextWarning />
          </Label>
          <Input
            placeholder={"Tên chuyên mục"}
            value={name || ""}
            name="name"
            onInput={onChangeText}
            onFocus={() => setIsDistinc(true)}
          />
          <MessageError isShow={isDistinc && nameError} messages={nameError} />
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
            <WrapperBtn>
              <FormButton
                color="#34c242"
                onClick={onClickCreateItem}
                disabled={!_.isEmpty(messageError)}
              >
                Thêm mới
            </FormButton>
            </WrapperBtn>
          )}
      </FormContainer>
    </Container>
  );
}

export default CategoriesForm;
