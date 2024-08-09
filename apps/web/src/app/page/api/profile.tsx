"use client"
import React, { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { FiArrowUpRight } from "react-icons/fi";
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import Modal from '@/app/profile/api/modal';


const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'ETH Price',
      data: [1200, 1500, 1400, 1800, 2100, 2300, 2200], // Dữ liệu thực tế hơn
      fill: false,
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      pointBackgroundColor: 'rgba(75, 192, 192, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.4, // Đường cong mượt hơn
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
  interaction: {
    mode: 'nearest',
    intersect: false,
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Month',
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Price in USD',
      },
      beginAtZero: false,
    },
  },
};

const Profile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');
  const [password, setPassword] = useState({ old: '', new: '', confirm: '' });
  const [profile, setProfile] = useState({
    fullName: 'Pham Xuan Hien',
    phone: '0916631752',
    account: 'pxh...@gmail.com',
    password: '**************',
    watchTime: '120 hours',
    earnings: '2.5 ETH'
  });

  const openModal = (title: string, currentValue: string, field: string) => {
    setEditValue(currentValue);
    setModalTitle(title);
    setEditField(field);
    setIsModalOpen(true);
  };

  const openPasswordModal = () => {
    setModalTitle('Change Password');
    setEditField('password');
    setPassword({ old: '', new: '', confirm: '' });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveChanges = () => {
    if (editField === 'password') {
      if (password.old === '' || password.new === '' || password.confirm === '') {
        alert('Please fill in all password fields!');
      } else if (password.new !== password.confirm) {
        alert('New password and confirmation do not match!');
      } else {
        setProfile({ ...profile, password: '**************' }); // Hien thi mat khau da duoc thay doi
        setPassword({ old: '', new: '', confirm: '' }); // Reset password fields
      }
    } else {
      setProfile({ ...profile, [editField]: editValue });
    }
    setIsModalOpen(false);
  };

  return (
    <div className='flex flex-col items-center min-h-screen py-10 px-4'>
      <div className='w-full max-w-4xl bg-white rounded-lg shadow-2xl p-8'>
        <div className='flex flex-col md:flex-row items-center md:items-start'>
          <div className='h-48 w-48 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-6 md:mb-0 md:mr-8'>
            <span className="text-white font-serif text-2xl">Avatar</span>
          </div>
          <div className='flex flex-col space-y-4 w-full'>
            <div className='flex justify-between items-center'>
              <div className='text-xl font-bold text-blue-800'>Full Name: {profile.fullName}</div>
              <button className='text-purple-500 hover:text-purple-700' onClick={() => openModal('Edit Full Name', profile.fullName, 'fullName')}>
                <CiEdit size={20} />
              </button>
            </div>
            <div className='flex justify-between items-center'>
              <div className='text-xl font-bold text-blue-800'>Phone: {profile.phone}</div>
              <button className='text-purple-500 hover:text-purple-700' onClick={() => openModal('Edit Phone', profile.phone, 'phone')}>
                <CiEdit size={20} />
              </button>
            </div>
            <div className='flex justify-between items-center'>
              <div className='text-xl font-bold text-blue-800'>Account: {profile.account}</div>
              <button className='text-purple-500 hover:text-purple-700' onClick={() => openModal('Edit Account', profile.account, 'account')}>
                <CiEdit size={20} />
              </button>
            </div>
            <div className='flex justify-between items-center'>
              <div className='text-xl font-bold text-blue-800'>Password: {profile.password}</div>
              <button className='text-purple-500 hover:text-purple-700' onClick={openPasswordModal}>
                <CiEdit size={20} />
              </button>
            </div>
            <div className='flex justify-between items-center'>
              <div className='text-xl font-bold text-blue-800'>Watch Time: {profile.watchTime}</div>
              <button className='text-purple-500 hover:text-purple-700' onClick={() => openModal('Edit Watch Time', profile.watchTime, 'watchTime')}>
                <CiEdit size={20} />
              </button>
            </div>
            <div className='flex flex-col space-y-1'>
              <div className='flex justify-between items-center'>
                <div className='text-xl font-bold text-blue-800'>Earnings: {profile.earnings}</div>
                <button className='text-purple-500 hover:text-purple-700' onClick={() => openModal('Edit Earnings', profile.earnings, 'earnings')}>
                  <CiEdit size={20} />
                </button>
              </div>
              <div className='flex items-center text-green-500'>
                <FiArrowUpRight className='mr-1' />
                <span className='text-lg font-semibold'>+5%</span>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-32 flex justify-center'>
          <div className='w-full max-w-4xl'>
            <Line data={data} options={options} />
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} onSave={saveChanges} title={modalTitle}>
        {editField === 'password' ? (
          <div className='flex flex-col space-y-4'>
            <div>
              <label className='block text-gray-700'>Old Password</label>
              <input
                type='password'
                value={password.old}
                onChange={(e) => setPassword({ ...password, old: e.target.value })}
                className='w-full p-2 border border-gray-300 rounded'
              />
            </div>
            <div>
              <label className='block text-gray-700'>New Password</label>
              <input
                type='password'
                value={password.new}
                onChange={(e) => setPassword({ ...password, new: e.target.value })}
                className='w-full p-2 border border-gray-300 rounded'
              />
            </div>
            <div>
              <label className='block text-gray-700'>Confirm New Password</label>
              <input
                type='password'
                value={password.confirm}
                onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                className='w-full p-2 border border-gray-300 rounded'
              />
            </div>
          </div>
        ) : (
          <div>
            <label className='block text-gray-700'>{modalTitle}</label>
            <input
              type='text'
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded'
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Profile;
