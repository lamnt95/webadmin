import _ from "lodash"
import React, { useState, useEffect, useCallback } from "react"
import styled from "styled-components";
import PostTable from "./PostTable";
import PostFormEditer from "./PostFormEditer";
import Filter from "../Filter"
import api from "../../api"
import Paging from "../Paging"

import { useSelector } from "react-redux"
import axios from "axios"
import { selectors } from "../../app-redux"

const Container = styled.div`
  flex: 1;
  display: flex;
  padding-top: 28px;
  padding-left: 50px;
  padding-right: 50px;
  user-select: none;
`;

const WrapperTable = styled.div`
  display: flex;
  flex: 60;
  margin-right: 36px;
  flex-direction: column;
`;

const WrapperForm = styled.div`
  flex: 30;
`;

const optionsDropdown = [
  {
    key: "APPROVE",
    text: "Đã duyệt",
    value: "APPROVE"
  },
  {
    key: "PENDING",
    text: "Chờ duyệt",
    value: "PENDING"
  },
  {
    key: "REJECT",
    text: "Từ chối duyệt",
    value: "REJECT"
  }
]

const filterInit = {
  activeDropdown: "APPROVE"
}

function PostScreen(props) {

  const [post, setPost] = useState();
  const [pageInfo, setPageInfo] = useState({});
  const [isShowPostForm, setIsShowForm] = useState(false);
  const [posts, setPosts] = useState();
  const [updateAt, setUpdateAt] = useState();
  const [filter, setFilter] = useState(filterInit);
  const [isLoading, setLoading] = useState(false);
  const [postActive, setPostActive] = useState();

  const activeDropdown = _.get(filter, "activeDropdown")
  const accessToken = useSelector(selectors.auth.getAccessToken)


  useEffect(() => {
    if (_.isEmpty(accessToken)) return;
    axios.defaults.headers.common['Authorization'] = accessToken;
    setLoading(true)
    const { number: page } = pageInfo || {}
    api.queryPost({ checkedStatus: activeDropdown, page }).then(({ content, number, totalPages }) => {
      setPosts(content)
      setLoading(false)
      if (page !== number) {
        setPageInfo({ number, totalPages });
      }
    }).catch(() => setLoading(false))
  }, [updateAt, pageInfo,accessToken])

  const onChangePost = (postInput = {}) => {
    const newPost = { ...(post || {}), ...postInput }
    setPost(newPost)
  }

  const onChangeFilter = useCallback((item) => {
    const newFilter = { ...filter, ...item }
    setFilter(newFilter)
    onUpdateScreen()
  }, [filter])

  const onUpdateScreen = useCallback((res) => {
    setUpdateAt(new Date())
  }, [1])

  const onEditPost = useCallback((id) => {
    const postNew = _.head(_.filter(posts, i => i.id == id) || []) || {}
    setPost(postNew)
    setPostActive(id)
    setIsShowForm(true)
  }, [posts])

  const onClearFilter = useCallback(() => {
    setFilter(filterInit)
    onUpdateScreen()
  }, [1])

  const onCancelPost = useCallback(() => {
    setPostActive("")
    setIsShowForm(false)
    setPost({})
  }, [1])

  const onCreateNew = () => {
    setIsShowForm(true)
  }

  const onCreatePost = ({ onSuccess }) => {
    api.createPost(post).then(() => {
      onSuccess();
      onCancelPost();
      onUpdateScreen();
    })
  }

  const onUpdatePost = ({ onSuccess }) => {
    api.updatePost(post).then(() => {
      onSuccess();
      onCancelPost();
      onUpdateScreen()
    })
  }

  const onBack = () => {
    const number = (pageInfo.number - 1 < 0) ? 0 : pageInfo.number;
    setPageInfo({ ...pageInfo, number })
  }

  const onNext = () => {
    const number = (pageInfo.number + 1 > pageInfo.totalPages) ? pageInfo.totalPages : pageInfo.number;
    setPageInfo({ ...pageInfo, number })
  }

  const onClickPaging = (number) => {
    setPageInfo({ ...pageInfo, number })
  }


  return (
    <Container>
      <WrapperTable>
        <Filter
          dropdownPlaceholder="Trạng thái"
          optionsDropdown={optionsDropdown}
          activeDropdown={activeDropdown}
          onChangeFilter={onChangeFilter}
          onSubmit={onUpdateScreen}
          onClear={onClearFilter}
          onNew={!isShowPostForm ? onCreateNew : isShowPostForm}
          onCancel={isShowPostForm ? onCancelPost : isShowPostForm}
        />
        {!isShowPostForm && <><PostTable
          data={posts}
          isLoading={isLoading}
          onHideItem={() => { }}
          onDeleteItem={() => { }}
          activeItem={postActive}
          onUpdateScreen={onUpdateScreen}
          onEdit={onEditPost}
          activeDropdown={activeDropdown}
        />
          <Paging
            total={pageInfo.totalPages}
            current={pageInfo.number}
            onBack={onBack}
            onNext={onNext}
            onClickPaging={onClickPaging}
          />
        </>}
        {isShowPostForm &&
          <div style={{ marginTop: 15 }}>
            <PostFormEditer
              id={postActive}
              postData={post}
              onCreate={onCreatePost}
              onCancel={onCancelPost}
              onUpdate={onUpdatePost}
              onUpdateScreen={onUpdateScreen}
              onChange={onChangePost}
            />
          </div>
        }
      </WrapperTable>

    </Container>
  );
}

export default PostScreen;
