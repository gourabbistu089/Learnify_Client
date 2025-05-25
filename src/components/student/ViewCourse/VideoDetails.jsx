import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/apiCalls/profileCall";
import { updateCompletedLectures } from "../../../redux/slices/viewCourseSlice";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import { FaCirclePlay } from "react-icons/fa6";
import { FaStepBackward, FaStepForward } from "react-icons/fa";
import { MdCheckCircle, MdReplay } from "react-icons/md";
import ReviewModal from "./ReviewModal";

export default function VideoDetails() {
  const { courseId, sectionId, subSectionId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playRef = useRef(null);
  const [videoData, setVideoData] = useState([]);
  const [videoEnd, setVideoEnd] = useState(false);
  const [loading, setLoading] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  useEffect(() => {
    const setVideoSpecificDetails = () => {
      if (courseSectionData.length === 0) return;
      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        const filteredSection = courseSectionData?.filter(
          (section) => section._id === sectionId
        );
        const filteredSubSection = filteredSection[0]?.subSection?.filter(
          (subsection) => subsection._id === subSectionId
        );
        setVideoData(filteredSubSection?.[0]);
        setVideoEnd(false);
      }
    };
    setVideoSpecificDetails();
  }, [courseSectionData, sectionId, subSectionId]);

  const isFirstVideo = () => {
    const currSectionInd = courseSectionData?.findIndex(
      (section) => section?._id === sectionId
    );
    const currSubSectionInd = courseSectionData[
      currSectionInd
    ]?.subSection?.findIndex((subsection) => subsection?._id === subSectionId);
    if (currSubSectionInd === 0 && currSectionInd === 0) {
      return true;
    } else {
      return false;
    }
  };
  const isLastVideo = () => {
    const currSectionInd = courseSectionData?.findIndex(
      (section) => section?._id === sectionId
    );
    const currSubSectionInd = courseSectionData[
      currSectionInd
    ]?.subSection?.findIndex((subsection) => subsection?._id === subSectionId);
    if (
      currSubSectionInd ===
        courseSectionData[currSectionInd]?.subSection?.length - 1 &&
      currSectionInd === courseSectionData?.length - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const goToNextVideo = () => {
    const currSectionInd = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );
    const currSubSectionInd = courseSectionData[
      currSectionInd
    ].subSection.findIndex((subsection) => subsection._id === subSectionId);

    const noOfSubSections = courseSectionData[currSectionInd].subSection.length;

    if (currSubSectionInd !== noOfSubSections - 1) {
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${
          courseSectionData[currSectionInd].subSection[currSubSectionInd + 1]
            ._id
        }`
      );
    } else {
      navigate(
        `/view-course/${courseId}/section/${
          courseSectionData[currSectionInd + 1]._id
        }/sub-section/${
          courseSectionData[currSectionInd + 1].subSection[0]._id
        }`
      );
    }
  };
  const goToPreviousVideo = () => {
    const currSectionInd = courseSectionData.findIndex(
      (section) => section._id === sectionId
    );
    const currSubSectionInd = courseSectionData[
      currSectionInd
    ].subSection.findIndex((subsection) => subsection._id === subSectionId);

    const noOfSubSections = courseSectionData[currSectionInd].subSection.length;

    if (currSubSectionInd !== 0) {
      // same section previous video
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${
          courseSectionData[currSectionInd].subSection[currSubSectionInd - 1]
            ._id
        }`
      );
    } else {
      // previous section last video
      const previousSubsectionLength =
        courseSectionData[currSectionInd - 1].subSection.length;
      navigate(
        `/view-course/${courseId}/section/${
          courseSectionData[currSectionInd - 1]._id
        }/sub-section/${
          courseSectionData[currSectionInd - 1].subSection[
            previousSubsectionLength - 1
          ]._id
        }`
      );
    }
  };

  const handleLectureCompleted = async () => {
    setLoading(true);
    const result = await markLectureAsComplete(
      { courseId, subSectionId },
      token
    );

    if (result) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };
  return (
    <div className="w-full flex flex-col items-center bg-[#1A1A1A] p-8 rounded-xl shadow-2xl">
      {!videoData ? (
        <p className="text-2xl text-[#FFD60A] font-semibold animate-pulse">
          No Video Found...
        </p>
      ) : (
        <div className="w-full max-w-6xl">
          <div className="relative bg-[#1A1A1A]  rounded-xl overflow-hidden shadow-inner">
            <Player
              ref={playRef}
              autoPlay={false}
              controls
              playsInline
              aspectRatio={window.innerWidth < 768 ? undefined : "16:9"}
              onEnded={() => setVideoEnd(true)}
              src={videoData.videoUrl}
            />
            {!isFirstVideo() && (
              <FaStepBackward
                className="absolute top-1/2 left-8 text-4xl text-[#FFD60A] cursor-pointer drop-shadow-lg transform -translate-y-1/2 hover:scale-110 transition-transform duration-200"
                onClick={goToPreviousVideo}
              />
            )}
            {!isLastVideo() && (
              <FaStepForward
                className="absolute top-1/2 right-8 text-4xl text-[#FFD60A] cursor-pointer drop-shadow-lg transform -translate-y-1/2 hover:scale-110 transition-transform duration-200"
                onClick={goToNextVideo}
              />
            )}

            {videoEnd && (
              <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-6 bg-black/70 backdrop-blur-sm">
                {!completedLectures.includes(subSectionId) && (
                  <button
                    className="bg-[#097d52] text-[#1A1A1A] font-semibold py-3 px-8 rounded-lg flex items-center gap-3 hover:bg-[#019e45] transition-colors duration-200 shadow-lg"
                    disabled={loading}
                    onClick={handleLectureCompleted}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <MdCheckCircle className="text-2xl animate-spin" />
                        Loading...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <MdCheckCircle className="text-2xl" />
                        Complete
                      </span>
                    )}
                  </button>
                )}
                <button
                  disabled={loading}
                  onClick={() => {
                    if (playRef?.current) {
                      playRef.current.seek(0);
                      setVideoEnd(false);
                    }
                  }}
                  className="bg-[#07b77f] text-[#1A1A1A] font-semibold py-3 px-8 rounded-lg flex items-center gap-3 hover:bg-[#06a06d] transition-colors duration-200 shadow-lg"
                >
                  <MdReplay className="text-2xl" />
                  Replay
                </button>
              </div>
            )}
          </div>

          <h1 className="text-3xl font-bold text-[#FFFFFF] mt-6 capitalize">
            {videoData.title}
          </h1>
          <p className="text-lg text-[#E0E0E0] mt-2 mb-8">
            {videoData.description}
          </p>
        </div>
      )}

      <ReviewModal />
    </div>
  );
}
