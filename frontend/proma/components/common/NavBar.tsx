import * as React from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { FaRegUserCircle } from "react-icons/fa";
import Image from "next/image";
import { ThemeType } from "../../interfaces/style";
import Link from "next/link";

const NavBarContainer = styled.div`
  background-color: ${(props: ThemeType) => props.theme.mainColor};
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  color: white;
`;

const Logo = styled.a`
  &:hover {
    cursor: pointer;
  }
`;

const MenuBox = styled.div`
  display: flex;
  align-items: center;
`;

const MenuButton = styled.button`
  background-color: inherit;
  border: none;
  font-size: 20px;
  color: white;
  margin-right: 20px;
`;

const MenuIconButton = styled(MenuButton)`
  font-size: 30px;
  margin-top: 10px;
`;

const MenuToggleBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
`;


{
  /* 로그인 모달 */
}
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

{
  /* 마이페이지 모달 */
}
const style2 = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  paddingTop: "80px",
  paddingBottom: "80px",
};

const ModalBox = styled(Modal)`
  .MuiBox-root {
    padding: 0px;
    border: 0px;
  }
`;

const Header = styled.div`
  height: 50px;
  padding: 0px 0px 0px 10px;
  background: #6667AB;
  color: white;
  font-size: 25px;
  display: flex;
  align-items: center;
  text-decoration: underline;
`;

const Login = styled.div`
  height: 50px;
  justify-content: center;
  background: lightgrey;
  font-weight: bold;
  font-size: 20px;
  display: flex;
  margin: 32px 32px 32px 32px;
  align-items: center;
`;

const Profile = styled.div`
  align-self: center;
  margin: 32px 32px 0px 32px;
`;

const Profileimg = styled.div`
  text-align: -webkit-center;
`;

const Username = styled.div`
  width: 40%;
  height: 40px;
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 32px;
`;

const NavBar = ({
  toggleDarkMode,
  darkMode,
}: {
  toggleDarkMode: any;
  darkMode: boolean;
  }) => {
  // 1은 로그인 관련, 2는 개인 프로필 관련 선언들
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState("");

  return (
    <>
      <NavBarContainer>
        <Link href="/">
          <Logo>
            <Image src="/logo.png" width={130} height={55} />
          </Logo>
        </Link>

        <MenuBox>
          {name == "" ? (
            <MenuToggleBox>
              <MenuButton onClick={handleOpen}>Login</MenuButton>
              <MenuButton onClick={handleOpen2}>Join</MenuButton>
            </MenuToggleBox>
          ) : (
            <MenuToggleBox>
              <MenuIconButton onClick={handleOpen2}>
                <FaRegUserCircle />
              </MenuIconButton>
              <MenuButton onClick={() => location.reload()}>Logout</MenuButton>
            </MenuToggleBox>
          )}
          <MenuButton onClick={toggleDarkMode}>
            {darkMode ? "dark" : "light"}
          </MenuButton>
        </MenuBox>

        {/* 로그인 모달 */}
        <ModalBox
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Header>Login</Header>
            <Login
              onClick={() => {
                setName("박주한");
                setImage(
                  "https://cdn.pixabay.com/photo/2021/10/24/21/34/profile-pic-6739366_960_720.png"
                );
                handleClose();
              }}
            >
              Github
            </Login>
          </Box>
        </ModalBox>

        {/* 마이페이지 모달 */}
        <ModalBox
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style2}>
          <Header>Profile</Header>
            <Profile>
              <Profileimg>
                {image == "" ? (
                  <img
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                    }}
                    src="/profileimg.png"
                  />
                ) : (
                  <img
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "50%",
                    }}
                    onClick={handleOpen2}
                    src={image}
                  />
                )}
              </Profileimg>
            </Profile>
            <Username>{name}</Username>
          </Box>
        </ModalBox>
      </NavBarContainer>
    </>
  );
};

export default NavBar;
