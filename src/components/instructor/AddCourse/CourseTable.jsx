import { useDispatch } from 'react-redux';
import { FaRupeeSign } from 'react-icons/fa';
import { MdOutlineDrafts, MdOutlinePublishedWithChanges } from 'react-icons/md';
import { useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import ConfirmationModal from '../../common/ConfirmationModal';
import { deleteCourse } from '../../../services/apiCalls/courseCall';
import { useNavigate } from 'react-router-dom';

const CoursesTable = ({ courses,setCourses }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const colors = {
    primary: '#06D6A0',
    danger: '#EF476F',
    textPrimary: '#F9FAFB',
    textSecondary: '#D1D5DB',
  };
  const handleCourseDelate = async (courseId) => {
    // console.log("Course Id : ", courseId);
    const response = await deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
    setConfirmationModal(false);
  }

  const [confirmationModal, setConfirmationModal] = useState(false);

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <Table className="table-auto w-full text-lg">
        <Thead>
          <Tr className="bg-gradient-to-r from-[#3A3C5A] to-[#1F2937] text-white">
            <Th className="py-4 px-4 text-left uppercase">Course Name</Th>
            <Th className="py-4 px-4 text-left uppercase">Duration</Th>
            <Th className="py-4 px-4 text-left uppercase">Price</Th>
            <Th className="py-4 px-4 text-center uppercase">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses.length === 0 ? (
            <Tr>
              <Td className="py-6 text-center text-xl text-gray-400" colSpan={4}>
                No Courses Found
              </Td>
            </Tr>
          ) : (
            courses.map((course) => (
              <Tr
                key={course._id}
                className="border-t border-gray-700 transition-all hover:bg-gray-800"
              >
                <Td className="flex gap-x-6 py-6 px-4">
                  <img
                    src={course.thumbnail}
                    alt="Course Thumbnail"
                    className="h-56 w-80 rounded-lg object-cover shadow-2xl"
                  />
                  <div className="flex flex-col justify-center">
                    <p className="text-3xl font-bold text-gray-100">{course.name}</p>
                    <p className="text-xl text-gray-400 line-clamp-2">{course.description}</p>
                    <p className="text-sm mt-2 text-gray-300">
                      Created: {course.createdAt.substring(0, 10)}
                    </p>
                    <p className="text-base mt-2 flex items-center gap-x-2">
                      {course.status === 'published' ? (
                        <>
                          <MdOutlinePublishedWithChanges className=" text-caribbeangreen-400 text-xl" />
                          <span className="font-semibold text-green-500">Published</span>
                        </>
                      ) : (
                        <>
                          <MdOutlineDrafts className="text-yellow-400 text-xl" />
                          <span className="font-semibold text-yellow-400">Draft</span>
                        </>
                      )}
                    </p>
                  </div>
                </Td>

                <Td className="py-6 px-4 text-gray-300">{course.duration || '2:30 hrs'}</Td>

                <Td className="py-6 px-4">
                  <div className="flex items-center text-gray-300 gap-x-2">
                    <FaRupeeSign className="text-secondary text-lg" />
                    <span>{course.price}</span>
                  </div>
                </Td>

                <Td className="py-6 px-4 text-center">
                  <div className="flex flex-col items-center gap-y-3">
                    <button
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-[#06D6A0] to-[#2E8B57] text-white px-4 py-3 rounded-lg transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#2E8B57] hover:to-[#06D6A0] focus:ring-4 focus:ring-[#06D6A0]"
                      onClick={()=>{
                        navigate(`/dashboard/edit-course/${course._id}`)
                      }}
                    >
                      Edit
                    </button>
                    <button
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-[#EF476F] to-[#D13350] text-white px-4 py-3 rounded-lg transition-colors duration-300 hover:bg-gradient-to-r hover:from-[#d12828e8] hover:to-[#EF476F] focus:ring-4 focus:ring-[#EF476F]"
                      onClick={()=>{
                        setConfirmationModal({
                          text1: "Are you sure you want to delete this course?",
                          text2: "This action cannot be undone.",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () => {
                           handleCourseDelate(course._id);
                           setConfirmationModal(false);
                          },
                          btn2Handler: () => {
                            setConfirmationModal(false);
                          },
                        });
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} setConfirmationModal={setConfirmationModal} />}
      
    </div>
  );
};

export default CoursesTable;
