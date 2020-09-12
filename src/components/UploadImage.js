import _ from "lodash";
import styled from "styled-components";
import MessageError from "./MessageError";
import ToolTip, { IconToolTipContent } from "./tooltip/IconTooltip";

const Container = styled.div`
  display: flex;
  margin-top: ${(props) => (props.top ? `${props.top}px` : "auto")};
  justify-content: center;
`;

const UploadImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ImageWrapperWitError = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: ${(props) => (props.width ? `${props.width}px` : "auto")};
  max-height: ${(props) => (props.height ? `${props.height}px` : "auto")};
  overflow: hidden;
`;

const BlankImage = styled.div`
  width: ${(props) => (props.width ? `${props.width}px` : "auto")};
  height: ${(props) => (props.height ? `${props.height}px` : "auto")};
  border-radius: 5px;
  border: solid 1px #707070;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  display: flex;
  cursor: pointer;
`;

const Image = styled.img`
  width: ${(props) => (props.width ? `${props.width}px` : "auto")};
  display: flex;
  object-fit: contain;
  border-radius: 5px;
`;

const IconPlus = styled.i`
  font-size: 60px;
  font-size: ${(props) => (props.iconSize ? `${props.iconSize}px` : "auto")};
  display: flex;
  color: #e1dfdf;
`;

export const IconContainer = styled.div`
  display: flex;
  min-width: ${(props) => (props.width ? `${props.width}px` : null)};
  margin-left: ${(props) => (props.left ? `${props.left}px` : "0px")};
`;

export const IconGroup = styled.div`
  display: ${(props) => (props.isActive ? "flex" : "none")};
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

export const IconWrapper = styled.div`
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  margin-left: 5px;
  margin-right: 5px;
  justify-content: center;
  background-color: ${(props) => {
    if (props.isDisable) return "#f1daaf";
    if (props.color) return props.color;
    return "transparent";
  }};
  cursor: ${(props) => {
    if (props.isDisable) return "auto";
    return "pointer";
  }};
  &:hover {
    filter: ${(props) => {
    if (!props.isDisable) return "brightness(120%)";
    return "brightness(100%)";
  }};
  }
  &:hover ${IconToolTipContent} {
    display: flex;
  }
`;

function UploadImage(props) {
  const {
    image,
    message,
    isError,
    onChoose,
    onRemove,
    width,
    height,
    iconSize,
    top,
  } = props || {};
  return _.isEmpty(image) ? (
    <Container top={top}>
      <ImageWrapperWitError>
        <BlankImage onClick={onChoose} width={width} height={height}>
          <IconPlus className="fa  fa-plus" iconSize={iconSize} />
        </BlankImage>
        <MessageError isShow={isError} message={message} />
      </ImageWrapperWitError>
    </Container>
  ) : (
      <Container top={top}>
        <UploadImageContainer>
          <ImageWrapper width={width} height={height}>
            <Image src={image} width={width} />
          </ImageWrapper>
          <IconContainer left={30}>
            <IconGroup isActive>
              <IconWrapper color="#f7a100" onClick={onChoose}>
                {/* <FontAwesomeIcon
                icon={faEdit}
                fontSize={20}
                color="#fff"
                style={{ marginBottom: "1px" }}
              /> */}
                <div>edit</div>
                <ToolTip text="Sửa" />
              </IconWrapper>
              <IconWrapper color="#4c5054" onClick={onRemove}>
                <div>trash</div>
                {/* <FontAwesomeIcon
                icon={faTrash}
                fontSize={20}
                color="#fff"
                style={{ marginBottom: "1px" }}
              /> */}
                <ToolTip text="Xoá" />
              </IconWrapper>
            </IconGroup>
          </IconContainer>
        </UploadImageContainer>
      </Container>
    );
}

export default UploadImage;
