import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import _ from "lodash";
import { Button, Form } from "semantic-ui-react";
import styled from "styled-components";
import UploadImage from "../UploadImage";
// import imageService from "../../services/imageService";
import TextWarning from "../TextWarning";
import { validateCategory } from "../../validate/validate";
import AddImage from "../AddImage"
import api from "../../api"
import utils from "../../utils"
import CategoryEditer from "./CategoryEditer"
import MessageError from "../MessageError"

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
  font-weight: 600 !important;
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

const categoryInit = {
  name: undefined,
};

function storyMediasToImages(storyMedias) {
  return _.map(storyMedias, i => ({ id: i.id, data: _.isEmpty(i.videoSrc) ? i.imageSrc : i.videoSrc, type: _.isEmpty(i.videoSrc) ? "imageSrc" : "videoSrc" }))
}

const STORY_MEDIA_TYPE = {
  imageSrc: "Ảnh",
  videoSrc: "Video",
}

function mapTypeMediaStory(type) {
  return _.get(STORY_MEDIA_TYPE, type);
}


function CategoriesForm(props) {
  const [isDistinc, setIsDistinc] = useState(false);
  const [messageError, setMessageError] = useState({});
  const [category, setCategory] = useState(categoryInit);
  const [image, setImage] = useState();
  const [storyMedia, setStoryMedia] = useState();
  const [storyMediaType, setStoryMediaType] = useState("imageSrc")
  const [videoIntroInput, setVideoIntroInput] = useState()

  const { id, onUpdateScreen, onCancel } = props;
  const isShowFormFix = !!id;
  const { name, intro, story, userManual, policy, videoIntro } = category || {};
  const images = _.get(category, "images") || [];
  const storyMedias = _.get(category, "storyMedias") || [];

  const title = isShowFormFix ? "Sửa chuyên mục" : "Thêm chuyên mục";

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
    setImage("");
    setStoryMedia("");
    setStoryMediaType("imageSrc");
    setVideoIntroInput("")
    setCategory(categoryInit);
    setIsDistinc(false);
  }, [1]);

  const onClickUpdateItem = useCallback(() => {
    const messageError = validateCategory(category) || {};
    setMessageError(messageError)
    if (!_.isEmpty(messageError)) return;
    const categoryNew = utils.convertCategory(category)
    api.updateCategory(categoryNew).then(() => {
    })
    setTimeout(() => {
      // onClickCancel()
      onUpdateScreen()
      onCancel()
    }, 1000)
  }, [category])

  const onClickCreateItem = useCallback(() => {
    const messageError = validateCategory(category) || {};
    setMessageError(messageError)
    if (!_.isEmpty(messageError)) return;
    const categoryNew = utils.convertCategory(category)
    api.createCategory(categoryNew).then(() => {
    }).catch(console.log)
    setTimeout(() => {
      // onClickCancel()
      onUpdateScreen()
      onCancel()
    }, 1000);
  }, [category]);

  const onChangeText = useCallback((e) => {
    const { name, value } = e.target;
    const categoryNew = { ...category, [name]: value };
    setCategory(categoryNew);
    if (!_.isEmpty(messageError)) {
      const messageErrorNew = validateCategory(categoryNew) || {};
      setMessageError(messageErrorNew)
    }
  }, [category, messageError])

  const onChangeTextEditer = (value, name) => {
    const categoryNew = { ...category, [name]: value };
    setCategory(categoryNew);
    if (!_.isEmpty(messageError)) {
      const messageErrorNew = validateCategory(categoryNew) || {};
      setMessageError(messageErrorNew)
    }
  }


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
    if (!_.isEmpty(messageError)) {
      const messageErrorNew = validateCategory(categoryNew) || {};
      setMessageError(messageErrorNew)
    }
  }

  const onChangeStoryMedia = (e) => {
    const { value } = e.target || {}
    setStoryMedia(value)
  }

  const onRemoveStoryMedia = (storyMediaId) => {
    const storyMediasNew = _.filter(storyMedias, i => i.id !== storyMediaId)
    const categoryNew = { ...category, storyMedias: storyMediasNew };
    setCategory(categoryNew);
  }

  const onAddStoryMedia = () => {
    const storyMediasNew = [...storyMedias, utils.addIdOneStoryMedia(storyMedia, storyMediaType)];
    const categoryNew = { ...category, storyMedias: storyMediasNew };
    setCategory(categoryNew);
    if (!_.isEmpty(messageError)) {
      const messageErrorNew = validateCategory(categoryNew) || {};
      setMessageError(messageErrorNew)
    }
  }

  const onChangeVideoIntro = (e) => {
    const { value } = e.target || {}
    setVideoIntroInput(value)
  }

  const onRemoveVideoIntro = () => {
    const categoryNew = { ...category, videoIntro: undefined };
    setCategory(categoryNew);
  }

  const onAddVideoIntro = () => {
    const categoryNew = { ...category, videoIntro: videoIntroInput };
    setCategory(categoryNew);
    if (!_.isEmpty(messageError)) {
      const messageErrorNew = validateCategory(categoryNew) || {};
      setMessageError(messageErrorNew)
    }
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
            onFocus={() => setIsDistinc(true)}
          />
          <MessageError messages={_.get(messageError, "images") || {}} />
        </FormField>

        <FormField>
          <Label>
            Tên chuyên mục
            <TextWarning />
          </Label>
          <MessageError messages={_.get(messageError, "name") || {}} />
          <Input
            placeholder={"Tên chuyên mục"}
            value={name || ""}
            name="name"
            onInput={onChangeText}
            onFocus={() => setIsDistinc(true)}
          />
        </FormField>


        <FormField>
          <Label>
            Giới thiệu về chuyên mục
            <TextWarning />
          </Label>
          <MessageError messages={_.get(messageError, "intro") || {}} />
          <CategoryEditer onChange={value => onChangeTextEditer(value, "intro")} content={intro} />
        </FormField>

        <FormField>
          <Label>
            Câu chuyện ra đời của chuyên mục
            <TextWarning />
          </Label>
          <MessageError messages={_.get(messageError, "story") || {}} />
          <CategoryEditer onChange={value => onChangeTextEditer(value, "story")} content={story} />
        </FormField>

        <FormField>
          <div>Loại Media</div>
          <MessageError messages={_.get(messageError, "storyMedias") || {}} />
          <Form.Group inline>
            <Form.Radio
              label='Ảnh'
              value='imageSrc'
              checked={storyMediaType === 'imageSrc'}
              onChange={() => setStoryMediaType("imageSrc")}
            />
            <Form.Radio
              label='Video'
              value='videoSrc'
              checked={storyMediaType === 'videoSrc'}
              onChange={() => setStoryMediaType("videoSrc")}
            />
          </Form.Group>
          <AddImage
            title="Slide Media của câu chuyện ra đời chuyên mục"
            images={storyMediasToImages(storyMedias)}
            mapType={mapTypeMediaStory}
            value={storyMedia}
            onChange={onChangeStoryMedia}
            onRemove={onRemoveStoryMedia}
            onAdd={onAddStoryMedia}
            onFocus={() => setIsDistinc(true)}
            btnTitle="Thêm ảnh hoặc video"
            errorText="Không có ảnh hoặc video nào"
          />
        </FormField>

        <FormField>
          <Label>
            Hướng dẫn sử dụng của chuyên mục
            <TextWarning />
          </Label>
          <MessageError messages={_.get(messageError, "userManual") || {}} />
          <CategoryEditer onChange={value => onChangeTextEditer(value, "userManual")} content={userManual} />
        </FormField>

        <FormField>
          <Label>
            Chính sách bán hàng của chuyên mục
            <TextWarning />
          </Label>
          <MessageError messages={_.get(messageError, "policy") || {}} />
          <CategoryEditer onChange={value => onChangeTextEditer(value, "policy")} content={policy} />
        </FormField>

        <FormField>
          <AddImage
            title="Video giới thiệu chuyên mục"
            images={videoIntro ? [{ id: 1, data: videoIntro }] : []}
            value={videoIntroInput}
            onChange={onChangeVideoIntro}
            onRemove={onRemoveVideoIntro}
            onAdd={onAddVideoIntro}
            onFocus={() => setIsDistinc(true)}
            btnTitle="Thêm video"
            errorText="Không có video nào"
          />
        </FormField>
        <MessageError messages={_.get(messageError, "videoIntro") || {}} />

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
