import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { setCourse } from '../../../../redux/slices/courseSlice';
import { createSubSection, updateSubSection } from '../../../../services/apiCalls/courseCall';
import { RxCross1 } from 'react-icons/rx';
import FileUpload from './FileUpload.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { FiPlusCircle } from 'react-icons/fi';

function SubSectionModal({ modalData, setModalData, edit = false, view = false, add = false }) {
    console.log("modal data", modalData);
    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { course } = useSelector((state) => state.course);

    useEffect(() => {
        if (edit || view) {
            setValue("lectureTitle", modalData?.title);
            setValue("lectureDescription", modalData?.description);
            setValue("lectureVideo", modalData?.videoUrl);
        }
    }, [edit, view, modalData, setValue]);

    const isFormUpdate = () => {
        const currentValues = getValues();
        return (
            currentValues.lectureTitle !== modalData?.title ||
            currentValues.lectureDescription !== modalData?.description ||
            currentValues.lectureVideo !== modalData?.videoUrl
        );
    };

    const handleEditSubSection = async (data) => {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("subSectionId", modalData.sectionId);
        formData.append("sectionId", modalData._id);
        formData.append("courseId", course._id);

        if (currentValues.lectureTitle !== modalData.title) formData.append("title", data.lectureTitle);
        if (currentValues.lectureDescription !== modalData.description) formData.append("description", data.lectureDescription);
        if (currentValues.lectureVideo !== modalData.videoUrl) formData.append("image", data.lectureVideo);

        setLoading(true);
        console.log("Update subsection data" +[...formData])
        const result = await updateSubSection(formData);
        if (result) {
            console.log("result", result)
            dispatch(setCourse(result?.data?.data));
        }
        setModalData(null);
        setLoading(false);
    };

    const onSubmit = async (data) => {
        if (view) return;

        if (edit) {
            if (!isFormUpdate()) {
                toast.error("No changes made so far.");
            } else {
                handleEditSubSection(data);
            }
            return;
        }

        // Add new sub-section
        const formData = new FormData();
        formData.append("courseId", course._id);
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDescription);
        formData.append("image", data.lectureVideo);

        setLoading(true);
        const result = await createSubSection(formData);
        console.log("result", result)
        if (result) {
            dispatch(setCourse(result?.data?.data));
        }
        setModalData(null);
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-75">
            <div className="relative bg-richblack-800 p-6 rounded-lg shadow-lg w-11/12 max-w-lg">
                <div className="flex justify-between items-center mb-6">
                    <p className="text-xl font-semibold text-white">
                        {view ? "Viewing" : add ? "Adding" : "Editing"} Lecture
                    </p>
                    <button
                        onClick={() => (!loading ? setModalData(null) : null)}
                        className="text-white hover:text-pink-500 transition"
                    >
                        <RxCross1 size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FileUpload
                        label={"lectureVideo"}
                        name={"lectureVideo"}
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        video={true}
                        viewData={view ? modalData?.videoUrl : null}
                        editData={edit ? null : modalData?.videoUrl}
                    />

                    <div className="mt-4">
                        <label className='text-sm text-richblack-5' htmlFor="lectureTitle">
                            Lecture Title <sup className='text-pink-200'>*</sup>
                        </label>
                        <input
                            type="text"
                            className="w-full mt-2 p-3 bg-richblack-800 text-white border border-richblue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-richblue-300 transition-all duration-300"
                            placeholder="Enter the lecture title"
                            {...register("lectureTitle", { required: "Lecture Title is required" })}
                        />
                        {errors.lectureTitle && <p className="text-pink-500 text-sm mt-1">{errors.lectureTitle.message}</p>}
                    </div>

                    <div className="mt-4">
                        <label className='text-sm text-richblack-5' htmlFor="lectureDescription">
                            Lecture Description <sup className='text-pink-200'>*</sup>
                        </label>
                        <textarea
                            className="w-full mt-2 p-3 bg-richblack-800 text-white border border-richblue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-richblue-300 transition-all duration-300"
                            placeholder="Describe what the lecture is about"
                            {...register("lectureDescription", { required: "Lecture Description is required" })}
                        />
                        {errors.lectureDescription && <p className="text-pink-500 text-sm mt-1">{errors.lectureDescription.message}</p>}
                    </div>

                    {!view && (
                      !loading ? (  <button
                        type="submit"
                        className="w-full mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-richblue-500 to-[#260948] text-white py-3 rounded-lg transition-colors hover:from-pink-500 hover:to-purple-700 focus:ring-2 focus:ring-richblue-300"
                    >
                        {add ? "Add Lecture" : "Edit Lecture"}
                        <FiPlusCircle className="text-lg" />
                    </button>) : (
                          <div className="flex justify-center items-center mt-4">
                          <AiOutlineLoading3Quarters className="animate-spin text-white text-3xl" />
                      </div>
                    )
                    )}
                </form>


            </div>
        </div>
    );
}

export default SubSectionModal;
