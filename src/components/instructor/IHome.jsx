import React, { useEffect, useState } from 'react';
import { getInstructorDashboardApi } from '../../services/apiCalls/profileCall';
import { useSelector } from 'react-redux';
import { FaChalkboardTeacher, FaUsers, FaMoneyBillWave, FaRupeeSign } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function IHome() {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [instructorDashboard, setInstructorDashboard] = useState([]);

  useEffect(() => {
    const getInstructorDashboard = async () => {
      setLoading(true);
      const result = await getInstructorDashboardApi();
      if (result) {
        setInstructorDashboard(result);
      }
      setLoading(false);
    };
    getInstructorDashboard();
  }, []);

  const totalAmt = instructorDashboard?.reduce((acc, course) => acc + course.totalAmountGenerated, 0) || 0;
  const totalStudentsEnrolled = instructorDashboard?.reduce((acc, course) => acc + course.totalStudentsEnrolled, 0) || 0;

  const data = instructorDashboard?.map(course => ({
    name: course.title,
    Students: course.totalStudentsEnrolled *525,
    Income: course.totalAmountGenerated ,
  })) || [];

  console.log("data", data);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-t-8 border-[#3498db] border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className='bg-[#121212] min-h-screen text-white p-6'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-[#f1c40f]'>Hi, {user?.firstName}</h1>
      </div>

      <div className='grid md:grid-cols-3 gap-6 mb-8'>
        <div className='bg-[#1f1f1f] p-6 rounded-lg shadow-md flex items-center gap-4'>
          <FaChalkboardTeacher className='text-4xl text-[#e74c3c]' />
          <div>
            <h3 className='text-lg font-semibold'>Total Courses</h3>
            <p className='text-2xl font-bold'>{instructorDashboard.length}</p>
          </div>
        </div>
        <div className='bg-[#1f1f1f] p-6 rounded-lg shadow-md flex items-center gap-4'>
          <FaUsers className='text-4xl text-[#2ecc71]' />
          <div>
            <h3 className='text-lg font-semibold'>Total Students</h3>
            <p className='text-2xl font-bold'>{totalStudentsEnrolled}</p>
          </div>
        </div>
        <div className='bg-[#1f1f1f] p-6 rounded-lg shadow-md flex items-center gap-4'>
          <FaMoneyBillWave className='text-4xl text-[#f39c12]' />
          <div>
            <h3 className='text-lg font-semibold'>Total Income</h3>
            <p className='text-2xl font-bold flex items-center gap-1'><FaRupeeSign /> {totalAmt}</p>
          </div>
        </div>
      </div>

      <div className='bg-[#1f1f1f] p-6 rounded-lg shadow-md'>
        <h3 className='text-xl font-semibold mb-4 text-center'>Course Statistics</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#f1c40f" />
            <YAxis stroke="#f1c40f" />
            <Tooltip cursor={{ fill: 'rgba(255,255,255,0.1)' }} />
            <Bar dataKey="Students" fill="#3498db" barSize={40} />
            <Bar dataKey="Income" fill="#e74c3c" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default IHome;
