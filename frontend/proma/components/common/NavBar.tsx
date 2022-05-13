/* eslint-disable */
import styled from "styled-components";
import { ThemeType } from "../../interfaces/style";
import { FaRegUserCircle, FaRegBell, FaBell } from "react-icons/fa";
import "react-sliding-pane/dist/react-sliding-pane.css";

import Toggle from "./Toggle";
import { LoginModal, JoinModal, UserProfileModal } from "./Modal";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { connect } from "react-redux";
import { RootState } from "../../store/modules";
import { getLogout } from "../../store/modules/member";
import {
  getNotificationList,
  updateNotificationConfirmed,
} from "../../store/modules/notify";

const NavBarContainer = styled.div`
  background-color: ${(props: ThemeType) => props.theme.mainColor};
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  color: white;
  position: relative;
  button {
    &:hover {
      cursor: pointer;
    }
  }
`;
const NotiElement = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 15px;
  color: black;
  padding: 15px 20px;
  span {
    font-size: 12px;
  }
  p {
    align-self: flex-start;
    margin: 0;
    text-decoration: underline;
  }
  .mainText {
    font-weight: 500;
    padding: 10px 0;
    text-decoration: none;
  }
  button {
    color: ${(props: ThemeType) => props.theme.mainColor};
    background-color: ${(props: ThemeType) => props.theme.subBeigeColor};
    border: none;
    border-radius: 3px;
    padding: 3px 5px;
    font-size: 12px;
  }
`;
const NotiBox = styled.div`
  position: absolute;
  width: 300px;
  max-height: 400px;
  right: 0;
  top: 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 0 0 0 3px;
  z-index: 2;
  background-color: ${(props: ThemeType) => props.theme.subPurpleColor};
  overflow-y: scroll;
  border: 1px solid ${(props: ThemeType) => props.theme.subPurpleColor};
  ${NotiElement} {
    width: 88%;
    border-bottom: 1px solid ${(props: ThemeType) => props.theme.subBeigeColor};
    &:last-child {
      border: none;
    }
  }
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
  font-size: 25px;
  margin-top: 10px;
`;
const MenuToggleBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
`;

const mapStateToProps = (state: RootState) => {
  return {
    userInfo: state.userReducer.userInfo,
    isLogin: state.userReducer.isLogin,
    notificationList: state.notifyReducer.notificationList,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getLogout: () => dispatch(getLogout()),
    getNotificationList: () => dispatch(getNotificationList()),
    updateNotificationConfirmed: (notificationNo: number) =>
      dispatch(updateNotificationConfirmed(notificationNo)),
  };
};

const NavBar = ({
  userInfo,
  isLogin,
  getLogout,
  notificationList,
  getNotificationList,
  updateNotificationConfirmed,
}: {
  userInfo: any;
  isLogin: boolean;
  getLogout: any;
  notificationList: any;
  getNotificationList: any;
  updateNotificationConfirmed: any;
}) => {
  const router = useRouter();

  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [joinModal, setJoinModal] = useState<boolean>(false);
  const [userProfileModal, setUserProfileModal] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Array<Object>>([]);

  const showLoginModal = () => setLoginModal((cur) => !cur);
  const showJoinModal = () => setJoinModal((cur) => !cur);
  const showUserProfileModal = () => setUserProfileModal((cur) => !cur);
  const showNotificationBox = () => setShowNotifications((cur) => !cur);

  const onLogOut = () => {
    router.push("/");
    getLogout();
  };

  const confirmNotification = (notificationNo: number) => {
    updateNotificationConfirmed(notificationNo).then((res: any) =>
      getNotificationList()
    );
  };

  useEffect(() => {
    if (!router.isReady) return;
    getNotificationList();
  }, [router.isReady]);

  useEffect(() => {
    if (!notificationList) return;
    setNotifications(notificationList);
  }, [notificationList]);

  return (
    <NavBarContainer>
      <Link href="/">
        <Logo>
          <Image src="/logo.png" width={130} height={55} />
        </Logo>
      </Link>

      <MenuBox>
        {!isLogin ? (
          <MenuToggleBox>
            <MenuButton onClick={showLoginModal}>Login</MenuButton>
            <LoginModal
              loginModal={loginModal}
              showLoginModal={showLoginModal}
              showJoinModal={showJoinModal}
              toggleLoginStatus={isLogin}
            />
            <JoinModal
              joinModal={joinModal}
              showJoinModal={showJoinModal}
              toggleLoginStatus={isLogin}
            />
          </MenuToggleBox>
        ) : (
          <MenuToggleBox>
            <MenuIconButton onClick={showUserProfileModal}>
              <FaRegUserCircle />
            </MenuIconButton>
            <UserProfileModal
              userProfileModal={userProfileModal}
              showUserProfileModal={showUserProfileModal}
              userInfo={userInfo}
            />
            <MenuIconButton>
              {showNotifications ? (
                <FaBell onClick={showNotificationBox} />
              ) : (
                <FaRegBell onClick={showNotificationBox} />
              )}
            </MenuIconButton>
            {showNotifications ? (
              <NotiBox>
                {notifications && notifications.length > 0 ? (
                  notifications?.map((notification: any) => (
                    <NotiElement key={notification.notificationNo}>
                      <span>
                        {notification.notificationTime.split("T").join(" / ")}
                      </span>
                      <p>{notification.message.split("\n")[0]}</p>
                      <p className="mainText">
                        {notification.message.split("\n")[1]}
                      </p>
                      <button
                        onClick={() =>
                          confirmNotification(notification.notificationNo)
                        }
                      >
                        Confirm
                      </button>
                    </NotiElement>
                  ))
                ) : (
                  <NotiElement>
                    <p>There are no new notifications.</p>
                  </NotiElement>
                )}
              </NotiBox>
            ) : null}
            <MenuButton onClick={onLogOut}>Logout</MenuButton>
          </MenuToggleBox>
        )}

        <Toggle />
      </MenuBox>
    </NavBarContainer>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
