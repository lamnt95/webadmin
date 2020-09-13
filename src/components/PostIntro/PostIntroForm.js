import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import _ from "lodash";
import { Button, Form } from "semantic-ui-react";
import styled from "styled-components";
import MessageError from "../MessageError";
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

const postIntroInit = {
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


function PostIntroForm(props) {
  const [isDistinc, setIsDistinc] = useState(false);
  const [postIntro, setPostIntro] = useState(postIntroInit);
  const [image, setImage] = useState();
  const [storyMedia, setStoryMedia] = useState();
  const [storyMediaType, setStoryMediaType] = useState("imageSrc")
  const [videoIntroInput, setVideoIntroInput] = useState()

  const { id, onUpdateScreen, onCancel, data } = props;
  const isShowFormFix = !!id;
  const { intro, story, userManual, policy, videoIntro } = postIntro || {};
  const imageList = _.get(postIntro, "imageList") || [];
  const storyMedias = _.get(postIntro, "storyMedias") || [];

  const title = isShowFormFix ? "Sửa giới thiệu chung" : "Thêm giới thiệu chung";
  const messageError = validateCategory(postIntro);
  const { name: nameError } = messageError || {};

  useEffect(() => {
    setPostIntro(utils.convertPostIntroForm(data));
  }, [id])

  console.log("PostIntroForm", postIntro)

  const onClickCancel = useCallback(() => {
    onCancel()
    setImage("");
    setStoryMedia("");
    setStoryMediaType("imageSrc");
    setVideoIntroInput("")
    setPostIntro(postIntroInit);
    setIsDistinc(false);
  }, [1]);

  const onClickUpdateItem = useCallback(() => {
    const postIntroNew = utils.convertPostIntro(postIntro)
    api.updatePostIntro(postIntroNew).then(() => {
      onUpdateScreen()
      onCancel()
      setImage("");
      setStoryMedia("");
      setStoryMediaType("imageSrc");
      setVideoIntroInput("")
      setPostIntro(postIntroInit);
      setIsDistinc(false);
    })

  }, [postIntro])

  const onClickCreateItem = useCallback(() => {
    const postIntroNew = utils.convertPostIntro(postIntro)
    api.createPostIntro(postIntroNew).then(() => {
      setPostIntro(postIntroInit);
      setImage("");
      setStoryMedia("");
      setStoryMediaType("imageSrc");
      setVideoIntroInput("")
      onUpdateScreen();
    }).catch(console.log)
    setIsDistinc(false);
  }, [postIntro]);

  const onChangeText = useCallback((e) => {
    const { name, value } = e.target;
    const postIntroNew = { ...postIntro, [name]: value };
    setPostIntro(postIntroNew);
  }, [postIntro])

  const onChangeImageSrc = (e) => {
    const { value } = e.target || {}
    setImage(value)
  }

  const onRemoveImageSrc = (imageId) => {
    const imageListNew = _.filter(imageList, i => i.id !== imageId)
    const postIntroNew = { ...postIntro, imageList: imageListNew };
    setPostIntro(postIntroNew);
  }

  const onAddImageSrc = () => {
    const imageListNew = [...imageList, utils.addIdOneImage(image)];
    const postIntroNew = { ...postIntro, imageList: imageListNew };
    setPostIntro(postIntroNew);
  }

  const onChangeStoryMedia = (e) => {
    const { value } = e.target || {}
    setStoryMedia(value)
  }

  const onRemoveStoryMedia = (storyMediaId) => {
    const storyMediasNew = _.filter(storyMedias, i => i.id !== storyMediaId)
    const postIntroNew = { ...postIntro, storyMedias: storyMediasNew };
    setPostIntro(postIntroNew);
  }

  const onAddStoryMedia = () => {
    const storyMediasNew = [...storyMedias, utils.addIdOneStoryMedia(storyMedia, storyMediaType)];
    const postIntroNew = { ...postIntro, storyMedias: storyMediasNew };
    setPostIntro(postIntroNew);
  }

  const onChangeVideoIntro = (e) => {
    const { value } = e.target || {}
    setVideoIntroInput(value)
  }

  const onRemoveVideoIntro = () => {
    const postIntroNew = { ...postIntro, videoIntro: undefined };
    setPostIntro(postIntroNew);
  }

  const onAddVideoIntro = () => {
    const postIntroNew = { ...postIntro, videoIntro: videoIntroInput };
    setPostIntro(postIntroNew);
  }

  return (
    <Container>
      <FormContainer>
        <FormTitle>{title}</FormTitle>

        <FormField>
          <AddImage
            title="Ảnh Slide giới thiệu"
            images={imageList}
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
            Giới thiệu chung
            <TextWarning />
          </Label>
          <Input
            placeholder="Giới thiệu chung"
            value={intro || ""}
            name="intro"
            onInput={onChangeText}
            onFocus={() => setIsDistinc(true)}
          />
          <MessageError isShow={isDistinc && nameError} messages={nameError} />
        </FormField>

        <FormField>
          <Label>
            Câu chuyện ra đời
            <TextWarning />
          </Label>
          <Input
            placeholder="Câu chuyện ra đời"
            value={story || ""}
            name="story"
            onInput={onChangeText}
            onFocus={() => setIsDistinc(true)}
          />
          <MessageError isShow={isDistinc && nameError} messages={nameError} />
        </FormField>

        <FormField>
          <div>Loại Media</div>
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
            errors={messageError}
            onFocus={() => setIsDistinc(true)}
            btnTitle="Thêm ảnh hoặc video"
            errorText="Không có ảnh hoặc video nào"
          />
        </FormField>

        <FormField>
          <Label>
            Hướng dẫn sử dụng
            <TextWarning />
          </Label>
          <Input
            placeholder="Hướng dẫn sử dụng"
            value={userManual || ""}
            name="userManual"
            onInput={onChangeText}
            onFocus={() => setIsDistinc(true)}
          />
          <MessageError isShow={isDistinc && nameError} messages={nameError} />
        </FormField>

        <FormField>
          <Label>
            Chính sách bán hàng
            <TextWarning />
          </Label>
          <Input
            placeholder="Hướng dẫn sử dụng"
            value={policy || ""}
            name="policy"
            onInput={onChangeText}
            onFocus={() => setIsDistinc(true)}
          />
          <MessageError isShow={isDistinc && nameError} messages={nameError} />
        </FormField>

        <FormField>
          <AddImage
            title="Video giới thiệu"
            images={videoIntro ? [{ id: 1, data: videoIntro }] : []}
            value={videoIntroInput}
            onChange={onChangeVideoIntro}
            onRemove={onRemoveVideoIntro}
            onAdd={onAddVideoIntro}
            errors={messageError}
            onFocus={() => setIsDistinc(true)}
            btnTitle="Thêm video"
            errorText="Không có video nào"
          />
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

export default PostIntroForm;
