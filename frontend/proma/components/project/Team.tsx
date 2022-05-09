/* eslint-disable */
import Issue from "./Issue";
import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import { ThemeType } from "../../interfaces/style";
import IssueCreateModal from "../Modals/IssueCreateModal";
import { getIssueList } from "../../store/modules/issue";
import { connect } from "react-redux";
import { RootState } from "../../store/modules";
import { useRouter } from "next/router";

//styled-components
const TeamBox = styled.div`
  border-radius: 3px;
  background-color: ${(props: ThemeType) => props.theme.bgColor};
  padding: 0px 15px 10px 15px;
  display: flex;
  flex-direction: column;
`;
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 10px 0;
`;
const TeamName = styled.a`
  color: white;
  margin: 5px 0;
  &:hover {
    cursor: pointer;
    color: black;
  }
`;
const Title = styled.span`
  color: ${(props: ThemeType) => props.theme.textColor};
  font-weight: 400;
  font-size: 22px;
`;
const AddButton = styled.button`
  background-color: inherit;
  text-decoration: underline;
  border: none;
  font-size: 13px;
  align-self: end;
  color: ${(props: ThemeType) => props.theme.textColor};
  &:hover {
    cursor: pointer;
  }
`;

const mapStateToProps = (state: RootState) => {
  return {
    onlyMyIssue: state.modeReducer.onlyMyIssue,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getIssueList: (params: any) => dispatch(getIssueList(params)),
  };
};

const Team = ({
  team,
  sprintNo,
  getIssueList,
  onlyMyIssue,
}: {
  team: any;
  sprintNo: any;
  onlyMyIssue: boolean;
  getIssueList?: any;
}) => {
  const router = useRouter();
  //DOM 준비되었을 때 렌더링
  const [isReady, setIsReady] = useState<boolean>(false);
  const [issueCreateModal, setIssueCreateModal] = useState<boolean>(false);
  const showIssueCreateModal = () => setIssueCreateModal((cur) => !cur);
  const [issueList, setIssueList] = useState<any>([]);

  useEffect(() => {
    if (!router.isReady) return;
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (sprintNo === undefined) return;

    let params = {};
    if (sprintNo === null) {
      params = {
        teamNo: team.teamNo,
        onlyMyIssue,
      };
    } else {
      params = {
        teamNo: team.teamNo,
        sprintNo,
        onlyMyIssue,
      };
    }

    getIssueList(params).then((res: any) => {
      //   const issues = res.issueList;
      console.log(res.payload.issueList);
      const issues = res.payload.issueList;

      setIssueList(issues);
    });
  }, [sprintNo, onlyMyIssue]);

  const droppableId = `${sprintNo}_${team.teamName}`;

  return (
    <>
      {isReady ? (
        <Droppable droppableId={droppableId}>
          {(provided) => (
            <TeamBox ref={provided.innerRef} {...provided.droppableProps}>
              <TopBar>
                <Link href={`/project/${team.projectNo}/team/${team.teamNo}`}>
                  <TeamName>
                    <Title>{team.title}</Title>
                  </TeamName>
                </Link>
                {team.isMember ? (
                  <AddButton onClick={showIssueCreateModal}>
                    + Add Issue
                  </AddButton>
                ) : null}
                <IssueCreateModal
                  issueCreateModal={issueCreateModal}
                  showIssueCreateModal={showIssueCreateModal}
                  teamNo={team.teamNo}
                  sprintNo={sprintNo}
                />
              </TopBar>
              {issueList ? (
                issueList.map((issue: any, index: number) => (
                  <Issue issue={issue} key={index} droppableId={droppableId} />
                ))
              ) : (
                <p>No issues yet.</p>
              )}
              {provided.placeholder}
            </TeamBox>
          )}
        </Droppable>
      ) : null}
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Team);
