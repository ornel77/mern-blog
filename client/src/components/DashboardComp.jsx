import { useEffect, useState } from 'react';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

const DashboardComp = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getComments?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);
  return (
    <div className='p-3 md:mx-auto'>
      {/* Recap TOTAL */}
      <div className='flex flex-wrap gap-4 justify-center'>
        <div className='flex flex-col p-3 dark:bg-sky-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
              <p className='text-2xl'>{totalUsers} </p>
            </div>
            <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
        <div className='flex flex-col p-3 dark:bg-sky-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>
                Total Comments
              </h3>
              <p className='text-2xl'>{totalComments} </p>
            </div>
            <HiAnnotation className='bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
        <div className='flex flex-col p-3 dark:bg-sky-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
              <p className='text-2xl'>{totalPosts} </p>
            </div>
            <HiDocumentText className='bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
      </div>

      {/* List of everything */}
      <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
        {/* USERS */}
        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent Users</h1>
            <Button outline gradientDuoTone={'purpleToPink'}>
              <Link to={'/dashboard?tab=users'}>See All</Link>
            </Button>
          </div>
          {/* table users */}
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {users &&
                users.map((user) => (
                  <Table.Row
                    className='bg-white dark:border-gray-700 dark:bg-gray-800'
                    key={user._id}
                  >
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt=''
                        className='w-10 h-10 rounded-full object-cover bg-gray-500'
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/profile/${user.username}`}>
                        {user.username}
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
        {/* COMMENTS */}
        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent Comments</h1>
            <Button outline gradientDuoTone={'purpleToPink'}>
              <Link to={'/dashboard?tab=comments'}>See All</Link>
            </Button>
          </div>
          {/* table comments */}
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>likes</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {comments &&
                comments.map((comment) => (
                  <Table.Row
                    className='bg-white dark:border-gray-700 dark:bg-gray-800'
                    key={comment._id}
                  >
                    <Table.Cell className='w-96'>
                      <p className="line-clamp-2">{comment.content} </p>
                    </Table.Cell>
                    <Table.Cell>
                      {comment.numberOfLikes}
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
        {/* POSTS */}
        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent Posts</h1>
            <Button outline gradientDuoTone={'purpleToPink'}>
              <Link to={'/dashboard?tab=posts'}>See All</Link>
            </Button>
          </div>
          {/* table posts */}
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>cateogry</Table.HeadCell>
            </Table.Head>
            <Table.Body className='divide-y'>
              {posts &&
                posts.map((post) => (
                  <Table.Row
                    className='bg-white dark:border-gray-700 dark:bg-gray-800'
                    key={post._id}
                  >
                    <Table.Cell>
                     <img src={post.image} alt="" className='w-14 h-10 rounded-md bg-gray-500'/>
                    </Table.Cell>
                    <Table.Cell className='w-96'>
                        {post.title}
                    </Table.Cell>
                    <Table.Cell className='w-5'>
                    {post.category}
                    
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
        
      </div>
    </div>
  );
};
export default DashboardComp;
