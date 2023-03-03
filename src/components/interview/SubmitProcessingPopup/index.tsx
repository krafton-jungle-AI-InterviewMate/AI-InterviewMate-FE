import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  interviewDataAtom,
  videoBlobAtom,
  videoUrlAtom,
} from "store/interview/atom";

import {
  usePostInitiateVideoUpload,
  usePostSignedVideoUrl,
  usePostCompleteVideoUpload,
} from "hooks/queries/video";
import { formatVideoFileName } from "lib/format";
import { MB } from "constants/common";
import { VideoPart } from "api/video/types";

import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import HamsterLoader from "components/common/HamsterLoader";

import * as Styled from "./styles";

type SubmitProcessingPopupProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleCancel: (fileName: string, uploadId: string) => void;
}

type UploadChunkToAWSParams = {
  preSignedUrl: string;
  blobPart: Blob;
  partNumber: number;
}

const SubmitProcessingPopup = (props: SubmitProcessingPopupProps) => {
  const {
    isOpen,
    handleClose,
    handleCancel,
  } = props;

  const blob = useRecoilValue(videoBlobAtom);
  const interviewData = useRecoilValue(interviewDataAtom);
  const [ videoUrl, setVideoUrl ] = useRecoilState(videoUrlAtom);

  const [ chunkNumber, setChunkNumber ] = useState(0);
  const [ uploadId, setUploadId ] = useState("");
  const [ serverFileName, setServerFileName ] = useState("");
  const [ multiUploadList, setMultiUploadList ] = useState<Array<VideoPart>>([]);
  const [ currBlobPart, setCurrBlobPart ] = useState<null | Blob>(null);
  const [ currPartNumber, setCurrPartNumber ] = useState<number>(0);

  const handleClickCancelButton = () => {
    if (window.confirm("정말 제출을 취소하시겠습니까?")) {
      handleCancel(serverFileName, uploadId);
    }
  };

  const uploadChunkToAWS = async (params: UploadChunkToAWSParams) => {
    const { preSignedUrl, blobPart, partNumber } = params;

    const res = await fetch(preSignedUrl, {
      method: "PUT",
      body: blobPart,
    });

    const awsETag = res.headers.get("ETag")?.replace(/"/g, "") ?? "";
    setMultiUploadList((curr) => ([
      ...curr,
      {
        awsETag,
        partNumber,
      },
    ]));
  };

  const {
    mutate: initiateVideoUpload,
    isLoading: initiateLoading,
    isSuccess: initiateComplete,
    data: initiateVideoUploadResponse,
  } = usePostInitiateVideoUpload();
  const {
    mutate: fetchSignedVideoUrl,
    isSuccess: fetchSignedVideoUrlComplete,
    data: fetchSignedVideoUrlResponse,
  } = usePostSignedVideoUrl();
  const {
    mutate: postComplete,
  } = usePostCompleteVideoUpload();

  useEffect(() => {
    return () => {
      if (serverFileName && uploadId && !videoUrl) {
        handleCancel(serverFileName, uploadId);
      }
    };
  }, []);

  useEffect(() => {
    if (!interviewData) {
      console.log("방 정보가 존재하지 않습니다.");
      return;
    }

    const { roomIdx } = interviewData;

    if (blob) {
      const fileName = formatVideoFileName(roomIdx);

      initiateVideoUpload({
        fileName,
      });
    }
  }, [ blob ]);

  useEffect(() => {
    if (initiateLoading) {
      return;
    }

    if (initiateComplete && initiateVideoUploadResponse) {
      const { uploadId, fileName } = initiateVideoUploadResponse.data;

      setUploadId(uploadId);
      setServerFileName(fileName);

      const chunkSize = 10 * MB;
      const chunkCount = Math.ceil(blob!.size / chunkSize);
      setChunkNumber(chunkCount);

      let nextStart = 0;

      for (let count = 0; count < chunkCount; count++) {
        const blobPart = blob!.slice(nextStart, nextStart + chunkSize);
        setCurrBlobPart(blobPart);
        setCurrPartNumber(count + 1);
        nextStart += chunkSize;

        fetchSignedVideoUrl({
          fileName,
          uploadId,
          partNumber: count + 1,
        },
        {
          onSuccess: () => {
            if (!currBlobPart) {
              return;
            }

            if (fetchSignedVideoUrlComplete && fetchSignedVideoUrlResponse) {
              uploadChunkToAWS({
                preSignedUrl: fetchSignedVideoUrlResponse.data.preSignedUrl,
                blobPart: currBlobPart,
                partNumber: currPartNumber,
              });
            }
          },
        },
        );
      }
    }
  }, [ initiateLoading ]);

  useEffect(() => {
    if (!interviewData) {
      console.log("방 정보가 존재하지 않습니다.");
      return;
    }

    const { roomIdx } = interviewData;
    if (multiUploadList.length && multiUploadList.length === chunkNumber) {
      postComplete({
        parts: multiUploadList,
        fileName: serverFileName,
        uploadId,
        roomIdx,
      },
      {
        onSuccess: (data) => {
          setVideoUrl(data.data.url);
          handleClose();
        },
      });
    }
  }, [ multiUploadList ]);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      closeOnOverlayClick={false}
      showCloseIcon={false}
      styles={Styled.modalStyles}
    >
      <Styled.Container>
        <HamsterLoader />
        <Styled.Message>
          채점 중입니다.
          <br />
          잠시만 기다려 주세요.
        </Styled.Message>
        <Styled.CancelButton
          type="button"
          onClick={handleClickCancelButton}
          disabled={!serverFileName && !uploadId}
        >
          제출 취소하기
        </Styled.CancelButton>
      </Styled.Container>
    </Modal>
  );
};

export default SubmitProcessingPopup;
