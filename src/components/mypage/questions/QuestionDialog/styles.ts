import styled from "@emotion/styled";
import { css } from "@emotion/react";

const commonFlexStyle = css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;

export const FormWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  margin: 0 auto 244px;
`;

export const H2 = styled.h2`
  font-weight: 500;
  font-size: 2rem;
  margin: 0;
  `;

export const InputWrap = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 560px;
  margin-top: 36px;

  & em.questionTitle {
    position: absolute;
    right: -255px;
    width: 240px;
    font-size: 1.2rem;
    line-height: 1.2;
    color: var(--light-alert);
  }
`;

export const Label = styled.label`
  text-align: left;
  font-size: 1.6rem;
  color: var(--main-black);
  width: 100px;
`;

export const Input = styled.input`
  width: 480px;
  height: 60px;
  border-radius: 10px;
  border: 1px solid var(--main-black);
  padding-left: 10px;
  font-size: 1.6rem;
`;

export const KeywordButtonWrap = styled.div`
  position: absolute;
  right: -206px;

  & em {
    position: absolute;
    top: -20px;
    width: 240px;
    font-size: 12px;
    line-height: 1.2;
    color: var(--light-alert);
  }
`;

export const KeywordButton = styled.button`
  ${commonFlexStyle};
  width: 180px;
  height: 52px;
  color: var(--main-white);
  background-color: var(--main-black);
  border-radius: var(--button-border-radius);
  font-size: 1.4rem;
`;

export const Small = styled.small`
  position: absolute;
  bottom: -66px;
  left: 100px;
  font-size: 1.2rem;
  color: var(--font-gray);
  word-break: keep-all;
`;

export const KeywordWrap = styled.div`
  position: absolute;
  ${commonFlexStyle};
  flex-wrap: wrap;
  justify-content: flex-start;
  top: 360px;
  left: 162px;
  margin-top: 26px;
`;

export const Keyword = styled.div`
  ${commonFlexStyle};
  height: 32px;
  background-color: var(--main-white);
  border: 1px solid var(--main-gray);
  border-radius: 3px;
  box-shadow: var(--box-shadow);
  font-size: 1.2rem;
  color: var(--font-gray);
  margin-right: 24px;
  margin-bottom: 10px;
  padding: 6px 8px;

  & .closeButton {
    background-color: transparent;
    padding: 4px;
    color: var(--font-gray);
    transform: translateY(1px);
  }
`;

export const ButtonWrap = styled.div`
  ${commonFlexStyle};
  margin: 0 auto;
`;

export const commonButtonStyle = css`
  ${commonFlexStyle};
  width: 300px;
  height: 54px;
  border-radius: var(--button-border-radius);
  font-size: 1.4rem;
  font-weight: 500;
`;

export const ConfirmButton = styled.button`
  ${commonButtonStyle}
  margin-right: 48px;

  background-color: var(--main-orange);
  color: var(--main-white);

  transition: all 200ms;

  &:hover {
    background-color: var(--light-orange);
  }
  &:active {
    background-color: var(--push-orange);
  }
`;

export const CancelButton = styled.button`
  ${commonButtonStyle}

  background-color: var(--main-white);
  color: var(--main-black);
  border: 1px solid var(--main-black);

  transition: all 200ms;

  &:hover {
    background-color: var(--main-alert);
    color: var(--main-white);
  }
  &:active {
    background-color: var(--push-alert);
  }
`;
