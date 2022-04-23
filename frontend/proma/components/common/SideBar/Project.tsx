import styled from "styled-components";
import { ThemeType } from "../../../interfaces/style";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
import Team from "./Team";
import Link from "next/link";
import { useState } from "react";

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Header = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props: ThemeType) => props.theme.elementBgColor};
  color: ${(props: ThemeType) => props.theme.elementTextColor};
  border-radius: 3px;
  padding: 0 10px 0 15px;
  a {
    font-size: 30px;
    font-weight: 600;
    text-decoration: none;
    color: ${(props: ThemeType) => props.theme.elementTextColor};
  }
  div {
    display: flex;
    align-items: center;
  }
`;

const ChatButton = styled.button`
  border: 2px solid ${(props: ThemeType) => props.theme.mainColor};
  border-radius: 3px;
  background-color: white;
  color: ${(props: ThemeType) => props.theme.mainColor};
  font-size: 15px;
  padding: 2px 5px;
  margin-right: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const ArrowButton = styled.button`
  background-color: inherit;
  border: none;
  color: ${(props: ThemeType) => props.theme.elementTextColor};
  font-size: 20px;
  display: flex;
  align-items: center;
`;

const AddTeamButton = styled.button`
  background-color: inherit;
  color: ${(props: ThemeType) => props.theme.mainColor};
  font-size: 15px;
  text-decoration: underline;
  border: none;
  margin: 20px;
  text-align: start;
  width: fit-content;
  &:hover {
    cursor: pointer;
  }
`;

const TeamBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  ${AddTeamButton} {
    align-self: flex-start;
    padding: 10px;
    margin: 0;
  }
`;

//dummy data
const teams = ["team1", "team2", "team3"];

const Project = ({ projectName }: { projectName: string }) => {
  const [showTeams, setShowTeams] = useState<boolean>(false);

  return (
    <ProjectContainer>
      <Header>
        <Link href="/project/0">
          <a>{projectName}</a>
        </Link>
        <div>
          <ChatButton>Chat</ChatButton>
          <ArrowButton onClick={() => setShowTeams((cur) => !cur)}>
            {showTeams ? <FaAngleDown /> : <FaAngleRight />}
          </ArrowButton>
        </div>
      </Header>
      {showTeams ? (
        <TeamBox>
          {teams.map((team) => (
            <Team teamName={team} />
          ))}
          <AddTeamButton>+ Add Team</AddTeamButton>
        </TeamBox>
      ) : null}
    </ProjectContainer>
  );
};

export default Project;
