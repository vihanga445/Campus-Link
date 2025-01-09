import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight, HiDocumentText, HiLogout,HiX } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
export default function DashSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState('');
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state)=>state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const handleSignout = async () => {
    try {
      const res = await fetch('/Back/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile'>
          <Sidebar.Item
            active={tab === 'profile'}
            icon={HiUser}
            label={
              currentUser.isAdmin 
                ? 'Admin' 
                : currentUser.moderatorRole?.isModerator
                  ? `Moderator (${currentUser.moderatorRole.category})`
                  : 'User'
            }
            labelColor="dark"
          >
            Profile
          </Sidebar.Item>
          </Link>
          {currentUser.moderatorRole?.isModerator && (
            <Link to='/dashboard?tab=pending'>
              <Sidebar.Item
                active={tab === 'pending'}
                icon={HiDocumentText}
              >
                Pending Posts
              </Sidebar.Item>
            </Link>
          )}
                      
          <Link to ='/dashboard?tab=posts'>
              <Sidebar.Item
                active={tab === 'posts'}
                icon={HiDocumentText}
              >
              My posts
              </Sidebar.Item>
          </Link>
          {(!currentUser.isAdmin && !currentUser.moderatorRole?.isModerator) && (
    <Link to='/dashboard?tab=rejected'>
        <Sidebar.Item
            active={tab === 'rejected'}
            icon={HiX}
        >
            My Rejected Posts
        </Sidebar.Item>
    </Link>
)}
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

