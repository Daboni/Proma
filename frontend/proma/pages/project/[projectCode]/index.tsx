//프로젝트 워크스페이스
import styled from "styled-components";
import Sprint from "../../../components/project/Sprint";
import { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { ThemeType } from "../../../interfaces/style";
import { FaPen, FaCheck } from "react-icons/fa";
import {
  SprintCreateModal,
  TopicListModal,
  TopicCreateModal,
  WarningModal,
} from "../../../components/common/Modal";

import { connect } from "react-redux";
import {
  getProjectInfo,
  updateProjectInfo,
} from "../../../store/modules/project";
import { RootState } from "../../../store/modules";
import { useRouter } from "next/router";

//dummy data
const sprints: any[] = [
  {
    sprintNo: 0,
    sprintName: "1주차",
  },
  {
    sprintNo: 1,
    sprintName: "2주차",
  },
  {
    sprintNo: 2,
    sprintName: "Backlog",
  },
];

//styled-components
const Button = styled.button`
  font-size: 15px;
  &:hover {
    cursor: pointer;
  }
`;
const FilledButton = styled(Button)`
  padding: 5px 10px;
  background-color: ${(props: ThemeType) => props.theme.mainColor};
  color: white;
  border: none;
  border-radius: 3px;
`;
const UnfilledButton = styled(Button)`
  background-color: inherit;
  border: none;
  text-decoration: underline;
  color: ${(props: ThemeType) => props.theme.textColor};
`;
const WarnButton = styled(Button)`
  background-color: inherit;
  border: none;
  color: ${(props: ThemeType) => props.theme.warnColor};
  align-self: flex-end;
  margin-top: 20px;
`;
const WorkSpace = styled.div`
  width: inherit;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  background-color: ${(props: ThemeType) => props.theme.bgColor};
  color: ${(props: ThemeType) => props.theme.textColor};
`;
const FlexBox = styled.div`
  width: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TopBar = styled(FlexBox)`
  justify-content: flex-start;
  height: 70px;
  * {
    font-size: 20px;
    &:hover {
      cursor: pointer;
    }
  }
  h1 {
    margin-right: 15px;
    font-size: 30px;
    &:hover {
      cursor: text;
    }
  }
  input {
    width: auto;
    margin: 25px 15px 25px 0;
    font-size: 20px;
    padding: 5px 10px;
    border-radius: 3px;
    border: 1px solid ${(props: ThemeType) => props.theme.subPurpleColor};
    opacity: 0.7;
    &:focus {
      opacity: 1;
      outline: 1px solid ${(props: ThemeType) => props.theme.mainColor};
    }
    &:hover {
      cursor: text;
    }
  }
`;
const InitialBox = styled(FlexBox)`
  /* margin-top: 300px; */
  justify-content: center;
  height: inherit;
  ${Button} {
    background-color: #a589c7;
    color: white;
    border: 1px solid #a589c7;
    border-radius: 7px;
    padding: 7px 10px;
    font-size: 20px;
    font-weight: 600;
  }
`;
const ButtonBox = styled.div`
  ${UnfilledButton} {
    margin-left: 10px;
  }
`;
const SprintsBox = styled.div`
  margin-top: 10px;
  height: 100%;
  overflow-y: scroll;
  background-color: ${(props: ThemeType) => props.theme.bgColor};
`;

const mapStateToProps = (state: RootState) => {
  return {
    projectName: state.projectReducer.projectName,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getProjectInfo: (projectNo: string) => dispatch(getProjectInfo(projectNo)),
    updateProjectInfo: (projectNewInfo: any) =>
      dispatch(updateProjectInfo(projectNewInfo)),
  };
};

const ProjectSpace = ({
  getProjectInfo,
  projectName,
  updateProjectInfo,
}: {
  getProjectInfo: any;
  projectName: string;
  updateProjectInfo: any;
}) => {
  const router = useRouter();

  const [isReady, setIsReady] = useState<boolean>(false);

  const [projectNo, setProjectNo] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [comment, setComment] = useState<string>(
    "프로젝트 종료 시<br/> 프로젝트 내 활동 정보가 모두 삭제되며, <br/> 삭제된 데이터는 복구가 불가합니다.<br/><br/> 정말 종료하시겠습니까?"
  );

  const [updateTitle, setUpdateTitle] = useState<boolean>(false);
  const [topicListModal, setTopicListModal] = useState<boolean>(false);
  const [topicCreateModal, setTopicCreateModal] = useState<boolean>(false);
  const [sprintCreateModal, setSprintCreateModal] = useState<boolean>(false);
  const [warningListModal, setWarningListModal] = useState<boolean>(false);
  const [warningCreateModal, setWarningCreateModal] = useState<boolean>(false);

  const showTopicListModal = () => setTopicListModal((cur) => !cur);
  const showTopicCreateModal = () => setTopicCreateModal((cur) => !cur);
  const showSprintCreateModal = () => setSprintCreateModal((cur) => !cur);
  const showWarningListModal = () => setWarningListModal((cur) => !cur);
  const showWarningCreateModal = () => setWarningCreateModal((cur) => !cur);

  //DOM 준비되었을 때 렌더링
  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    const value = router.query.projectCode as string;
    setProjectNo(value);
  }, [router.isReady]);

  useEffect(() => {
    if (!projectNo) return;
    getProjectInfo(projectNo);
  }, [projectNo]);

  useEffect(() => {
    if (!projectName) return;
    setTitle(projectName);
  }, [projectName]);

  const onKeyUpProjectName = (e: any) => {
    if (e.key !== "Enter") return;
    updateProjectName();
  };
  const updateProjectName = () => {
    updateProjectInfo({
      projectNo,
      title,
    });
    setUpdateTitle((cur) => !cur);
  };

  //최초 프로젝트 시작 시 생성 => 백로그 생성됨
  const onStartProject = () => {
    //백로그라는 스프린트 생성 post api 로직 필요
  };

  //유저가 드래그를 끝낸 시점에 불리는 함수
  const onDragEnd = (args: any) => {
    console.log(args);
    //이슈 옮겨졌을 때 이슈 수정 post api 로직 필요
    //그 후 재렌더링 로직 필요
  };

  return (
    <>
      {isReady ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <WorkSpace>
            {updateTitle ? (
              <TopBar>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyUp={onKeyUpProjectName}
                  value={title}
                  placeholder="Type Project Name"
                  required
                  autoFocus
                />
                <FaCheck onClick={updateProjectName} />
              </TopBar>
            ) : (
              <TopBar>
                <h1>{title}</h1>
                <FaPen onClick={() => setUpdateTitle((cur) => !cur)} />
              </TopBar>
            )}
            <FlexBox>
              <UnfilledButton>Only My Issues</UnfilledButton>
              <ButtonBox>
                <FilledButton onClick={showSprintCreateModal}>
                  Create Sprint
                </FilledButton>
                <SprintCreateModal
                  sprintCreateModal={sprintCreateModal}
                  showSprintCreateModal={showSprintCreateModal}
                />
                <UnfilledButton onClick={showTopicListModal}>
                  Topic
                </UnfilledButton>
                <TopicListModal
                  topicListModal={topicListModal}
                  showTopicListModal={showTopicListModal}
                  showTopicCreateModal={showTopicCreateModal}
                />
                <TopicCreateModal
                  topicCreateModal={topicCreateModal}
                  showTopicListModal={showTopicListModal}
                  showTopicCreateModal={showTopicCreateModal}
                />
              </ButtonBox>
            </FlexBox>
            <SprintsBox>
              {sprints.length > 0 ? (
                sprints.map((sprint, index) => (
                  <Sprint sprint={sprint} key={index} />
                ))
              ) : (
                <InitialBox>
                  <Button onClick={onStartProject}>프로젝트 시작하기</Button>
                </InitialBox>
              )}
            </SprintsBox>
            <WarnButton onClick={showWarningCreateModal}>
              프로젝트 종료
            </WarnButton>
            <WarningModal
              warningCreateModal={warningCreateModal}
              showWarningListModal={showWarningListModal}
              showWarningCreateModal={showWarningCreateModal}
              comment={comment}
            />
          </WorkSpace>
        </DragDropContext>
      ) : null}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSpace);
