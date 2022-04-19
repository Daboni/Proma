import * as React from 'react';
import styled from "styled-components";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const SideBarContainer = styled.div`
    width: 200px;
    height: 79vh;
    padding: 30px;
    background-color: #C4C4C4;
`;

const Title = styled.div`
    font-size: 25px;
    font-weight:
    width: 90%;
    background: white;
    padding-left: 5%;
    padding-right: 5%;
    border-bottom: 3px solid black;
    display: flex;
    place-items: center;
`;

const Team = styled.div`
    font-size: 20px;
    margin-left: 30px; 
    margin-right: 30px; 
`

const TeamDetail = styled.div`
    display: flex;
    place-items: center;
`

const TeamName = styled.a`
    text-decoration: underline;
    font-size: 20px;
`

const ChatButton = styled.button`
    margin-left: auto;
    height: 25px;
`

const AddTeam = styled.div`
    font-size: 20px;
    margin-left: 30px; 
    margin-right: 30px; 
    position: fixed; 
    bottom: 60px;
    width: 100%;
`

const Member = styled.div`
    font-size: 20px;
    margin-top: 5px;
    margin-left: 20px;
    display: flex;
    place-items: center;
`

const MemberName = styled.a`
    font-size: 15px;
    margin-left: 30px;
`

// 팀 생성 모달 
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const TeamAdd = styled.div`
    height: 50px;
    justify-content: center;
    background: lightgrey;
    font-weight: bold;
    font-size: 20px;
    display: flex;
    align-items: center;
`;

// 더미파일
const member = [
    {
        name: "김일환",
        image: "https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_960_720.png",
    },
    {
        name: "장소명",
        image: "https://cdn.pixabay.com/photo/2014/03/24/17/19/teacher-295387_960_720.png",
    },
    {
        name: "장다빈",
        image: "https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png",
    },
    {
        name: "서은민",
        image: "https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397_960_720.png",
    },
]

const SideBar = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    return (
        <>
            <SideBarContainer>
                <Title>
                    <a>Proma</a> <ChatButton>chat</ChatButton> <a onClick={handleOpen}>+</a>
                </Title>

                {/* 팀 생성 모달 */}
                <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <TeamAdd>
                            생성할 팀 입력
                        </TeamAdd>
                    </Box>
                </Modal>
                
                <Team>
                    <TeamDetail>
                        <TeamName>FrontEnd</TeamName> <ChatButton>chat</ChatButton>
                    </TeamDetail>
                    <TeamDetail>
                        <TeamName>BackEnd</TeamName> <ChatButton>chat</ChatButton>
                    </TeamDetail>
                    <TeamDetail>
                        <TeamName>DB</TeamName> <ChatButton>chat</ChatButton>
                    </TeamDetail>
                    <TeamDetail>
                        <TeamName>Deploy</TeamName> <ChatButton>chat</ChatButton>
                        
                    </TeamDetail>
                    <Member>
                        <img style={{width: "20%"}} src="/profileimg.png"/> <MemberName>김일환</MemberName>
                    </Member>
                    <Member>
                        <img style={{width: "20%"}} src="/profileimg.png"/> <MemberName>서은민</MemberName>
                    </Member>
                    <Member>
                        <img style={{width: "20%"}} src="/profileimg.png"/> <MemberName>장다빈</MemberName>
                    </Member>
                    <Member>
                        <img style={{width: "20%"}} src="/profileimg.png"/> <MemberName>장소명</MemberName>
                    </Member>
                </Team>
                <AddTeam>
                    <a style={{textDecoration: "underline", fontSize: "20px"}}>+ create new Team</a>
                </AddTeam>
            </SideBarContainer>
        </>
    );
};

export default SideBar;
