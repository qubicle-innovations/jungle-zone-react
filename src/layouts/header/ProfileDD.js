import React from 'react';
import { DropdownItem } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Settings } from 'react-feather';
import user1 from '../../assets/images/users/user4.jpg';

const ProfileDD = () => {
  const navigate = useNavigate();
  const login = useSelector((state) => state.login.logData);

  const handleSettingsClick = (e) => {
    e.stopPropagation(); // Prevent the parent DropdownItem from triggering
    navigate('/settings');
  };

  return (
    <div>
      <div className="d-flex gap-3 p-3 border-bottom pt-2 align-items-center">
        <img src={user1} alt="user" className="rounded-circle" width="55" />
        <span>
          <h5 className="mb-0 fw-medium">{login.name}</h5>
          <small className="text-muted">{login.email}</small>
        </span>
      </div>
      {/* <DropdownItem className="px-4 py-3">
        <User size={20} className="text-muted" />
        &nbsp; My Profile
      </DropdownItem>
      <DropdownItem className="px-4 py-3">
        <FileText size={20} className="text-muted" />
        &nbsp; Edit Profile
      </DropdownItem> 
      <DropdownItem divider />*/}
      <DropdownItem className="px-4 py-3"  onClick={handleSettingsClick}>
        <Settings size={20} className="text-muted" />
        &nbsp; Settings
      </DropdownItem>
      <DropdownItem divider />
    </div>
  );
};

export default ProfileDD;
