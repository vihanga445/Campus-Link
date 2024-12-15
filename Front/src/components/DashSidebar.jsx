import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function DashSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            active={tab === 'profile'}
            icon={HiUser}
            label={'User'}
            labelColor="dark"
            onClick={() => navigate('/dashboard?tab=profile')}
          >
            Profile
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={() => {
              // Add sign-out logic here (e.g., clearing tokens or user data)
              navigate('/sign-out'); // Example redirect
            }}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

