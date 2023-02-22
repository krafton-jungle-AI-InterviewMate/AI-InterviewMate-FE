import { RecoilRoot } from "recoil";
import RecoilNexus from "recoil-nexus";

const RecoilProvider = ({ children }) => {
  return (
    <RecoilRoot>
      <RecoilNexus />
      {children}
    </RecoilRoot>
  );
};

export default RecoilProvider;
