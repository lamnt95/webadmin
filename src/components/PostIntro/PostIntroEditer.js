import { Component } from "react";
import _ from "lodash";
import { Button, Form, Dropdown } from "semantic-ui-react";
import styled from "styled-components";
import { checkIsServer } from "../../utils/server";

const DropdownContainer = styled(Dropdown)`
  font-family: Arial !important;
  font-size: 14px !important;
  margin-top: 5px;
`;

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
  margin-left: ${(props) => (props.left ? `${props.left}px` : "0px")};
  margin-right: ${(props) => (props.right ? `${props.right}px` : "0px")};
`;

const Label = styled.label`
  font-family: Arial !important;
  font-size: 14px !important;
  font-weight: normal !important;
  color: #606266 !important;
`;

const FormField = styled(Form.Field)`
  margin-top: 35px !important;
  .text {
    font-family: Arial !important;
    font-size: 14px !important;
    font-weight: normal;
    color: #575757;
  }
  div.selected span.text {
    font-weight: bold;
  }
`;

const Description = styled.label`
  font-family: Arial !important;
  font-size: 13px !important;
  font-style: italic !important;
  font-weight: normal !important;
  color: #8b8d92 !important;
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
  color: #fff !important;
  font-family: Arial !important;
  font-size: 14px !important;
  background-color: ${(props) => `${props.color}!important`};
  margin-right: ${(props) => `${props.right}px!important`};
  margin-top: ${(props) => `${props.top}px!important`};
  margin-bottom: ${(props) => `${props.bottom}px!important`};
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


const FormTitle = styled.div`
  font-family: Arial !important;
  font-size: 20px !important;
  font-weight: normal;
  color: #606266;
`;

class PostIntroEditer extends Component {
  constructor(props) {
    super(props);
    this.state = { Editer: undefined, isDistinc: false, imageSrc: "" };
    this.onChangeText = this.onChangeText.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.lazyLoadEditor = this.lazyLoadEditor.bind(this);
    this.setIsDistincFalse = this.setIsDistincFalse.bind(this);
    this.setIsDistincTrue = this.setIsDistincTrue.bind(this);
    this.addImage = this.addImage.bind(this);
    this.addImageToPost = this.addImageToPost.bind(this);
  }

  componentDidMount() {
    this.lazyLoadEditor();
  }

  addImage(imageSrc) {
    this.setState({ imageSrc })
  }

  addImageToPost() {
    const { content = "", onChange } = this.props;
    const img = `<p><img src="${this.state.imageSrc}" /></p>`
    const newContent = content + img;
    onChange(newContent);
  }

  clearInput() {
    try {
      this.inputTitle.value = "";
      this.inputImageSrc.value = "";
      this.inputViewQuantity.value = "";
      this.inputSummary.value = "";
      this.inputCategory.value = "";
      this.inputContent.value = "";
    } catch (e) { }
  }

  onChangeText(e) {
    const { name, value } = e.target;
    const { onChange } = this.props;
    onChange(value);
  }

  lazyLoadEditor = async () => {
    const isServer = checkIsServer();
    if (!isServer) {
      const { default: Editer } = await import("../Editer").then(
        (res) => {
          return res;
        }
      );
      this.setState({ Editer });
    }
  };

  setIsDistincFalse() {
    this.setState({ isDistinc: false });
  }

  setIsDistincTrue() {
    this.setState({ isDistinc: true });
  }

  render() {
    const { Editer, isDistinc, imageSrc } = this.state;
    const isServer = checkIsServer();
    const { content, messageError } = this.props;
    const { content: contentError } = messageError || {};

    return (
      <Container>
        <FormContainer left={15}>
          <FormField>
            <Label>
              Thêm ảnh vào bài viết
            </Label>
            <Input
              placeholder="Nhập đường dẫn ảnh"
              value={imageSrc}
              name="imageSrc"
              onInput={(e) => this.addImage(e.target.value)}
              onFocus={this.setIsDistincTrue}
              ref={(element) => (this.inputImageSrc = element)}
            />
            <FormButton
              top={10}
              color="#f7a100"
              onClick={this.addImageToPost}
            >
              Thêm ảnh
                </FormButton>
          </FormField>
          <FormField>
            <Label>
              Nội dung
          </Label>
            {!isServer && Editer && (
              <Editer
                onEdit={this.onChangeText}
                data={content}
                onFocus={this.setIsDistincTrue}
              />
            )}
          </FormField>
        </FormContainer>
      </Container>
    );
  }
}

export default PostIntroEditer;
