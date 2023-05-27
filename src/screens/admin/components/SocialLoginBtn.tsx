import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { common } from "../../../common/api";
import { AppDispatch } from "../../../features/store";
import { ButtonDefault } from "./Button";
import { useLocation } from "react-router-dom";
import KakaoLogin from "react-kakao-login";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import {
  FACEBOOK_CLIENT_ID,
  GOOGLE_CLIENT_ID,
  KAKAO_CLIENT_ID,
  NAVER_CLIENT_ID,
} from "../../../common/env";

const SocialLoginBtn = () => {
  const social = ["구글", "페북"];
  const dispatch = useDispatch<AppDispatch>();

  const COMMON_REDIRECT = (social: string) => {
    return `https://localhost/auth/${social}/callback`;
  };
  const REDIRECT_URIS = {
    kakao: COMMON_REDIRECT("kakao"),
    naver: COMMON_REDIRECT("naver"),
    google: COMMON_REDIRECT("google"),
    facebook: COMMON_REDIRECT("facebook"),
  };

  const SOCIAL_URL = {
    kakao: `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URIS.kakao}&response_type=code`,
    naver: `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=false&redirect_uri=${REDIRECT_URIS.naver}`,
    google: `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URIS.google}&scope=profile email`,
    facebook: `https://www.facebook.com/v13.0/dialog/oauth?response_type=code&client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${REDIRECT_URIS.facebook}&scope=email`,
  };

  const getRedirectURI = async (redirect: string) => {
    const res = await axios.get(redirect);
    console.log(res);
  };

  const handleKakaoLogin = async () => {
    window.location.href = SOCIAL_URL.kakao;
    getRedirectURI(REDIRECT_URIS.kakao);
  };

  const handleNaverLogin = async () => {
    window.location.href = SOCIAL_URL.naver;
    getRedirectURI(REDIRECT_URIS.naver);
  };

  const handleGoogleLogin = async () => {
    window.location.href = SOCIAL_URL.google;
    getRedirectURI(REDIRECT_URIS.google);
  };

  const handleFacebookLogin = async () => {
    window.location.href = SOCIAL_URL.facebook;
    getRedirectURI(REDIRECT_URIS.facebook);
  };
  return (
    <>
      <div className="flex flex-col gap-y-3 pt-3 text-white font-bold">
        <button
          className="bg-[rgb(246,232,38)] p-3 flex justify-center items-center gap-x-3"
          onClick={handleKakaoLogin}
        >
          <img src="/images/kakao.jpg" className="w-6 inline-block" />
          <span>카카오로그인</span>
        </button>
        <button
          className="bg-[rgb(85,196,48)] p-3 flex justify-center items-center gap-x-3 "
          onClick={handleNaverLogin}
        >
          <img src="/images/naver.png" className="w-6 inline-block" />
          <span>네이버로그인</span>
        </button>
      </div>
      <div className="w-full flex justify-center gap-x-3 pt-12">
        {social?.map((el) => (
          <span
            className="block border rounded-full p-3"
            key={el}
            onClick={() => {
              if (el === "구글") {
                handleGoogleLogin();
              } else {
                handleFacebookLogin();
              }
            }}
          >
            {el}
          </span>
        ))}
      </div>
    </>
  );
};

export default SocialLoginBtn;
