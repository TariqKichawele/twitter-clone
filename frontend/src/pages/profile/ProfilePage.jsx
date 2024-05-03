import { useRef, useState } from "react"
import { FaArrowLeft, FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";
import { POSTS } from "../../utils/db/dummy";
import { MdEdit } from "react-icons/md";
import EditProfileModal from "./EditProfileModal";
import ProfileHeaderSkeleton from '../../components/skeletons/ProfileHeaderSkeleton'
import { IoCalendarOutline } from "react-icons/io5";

const ProfilePage = () => {
    const [ coverImg, setCoverImg ] = useState(null);
    const [ profileImg, setProfileImg ] = useState(null);
    const [ feedType, setFeedType ] = useState('posts');


    const coverImgRef = useRef(null);
    const profileImgRef = useRef(null);

    const isLoading = false;
    const isMyProfile = true;

    const user = {
		_id: "1",
		fullName: "John Doe",
		username: "johndoe",
		profileImg: "/avatars/boy2.png",
		coverImg: "/cover.png",
		bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
		link: "https://youtube.com/@asaprogrammer_",
		following: ["1", "2", "3"],
		followers: ["1", "2", "3"],
	};

    const handleImgChange = (e, state) => {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = () => {
                state === 'coverImg' && setCoverImg(reader.result);
                state === 'profileImg' && setProfileImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

  return (
    <>
        <div className="flex-[4_4_0] border-r border-gray-700 min-h-screen">
            {isLoading && <ProfileHeaderSkeleton />}
            {!isLoading && !user && <p className="text-center text-lg mt-4">User not found</p>}
            <div className="flex flex-col">
                {!isLoading && user && (
                    <>
                        <div className="flex gap-10 px-4 py-2 items-center">
                            <Link to={'/'}>
                                <FaArrowLeft className="w-4 h-4"/>
                            </Link>
                            <div className="flex flex-col">
                                <p className="font-bold text-lg">{user?.fullName}</p>
                                <span className="text-sm text-slate-500">{POSTS?.length} posts</span>
                            </div>
                        </div>
                        <div className="relative">
                            <img 
                                src={coverImg || user?.coverImg || "/cover.png" } 
                                alt="cover_img" 
                                className="h-52 w-full object-cover"
                            />
                            {isMyProfile && (
                                <div
                                    className="absolute top-2 right-2 rounded-full p-2 bg-gray-800 bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200"
                                    onClick={() => coverImgRef.current.click()}
                                >
                                    <MdEdit className="w-5 h-5 text-white" />
                                </div>
                            )}
                            <input 
                                type="file" 
                                hidden
                                ref={coverImgRef}
                                onChange={(e) => handleImgChange(e, "coverImg")}
                            />
                            <input 
                                type="file" 
                                hidden
                                ref={profileImgRef}
                                onChange={(e) => handleImgChange(e, "profileImg")}
                            />
                            <div className="avatar absolute -bottom-16 left-4">
                                <div className="relative w-32 rounded-full group/avatar">
                                    <img 
                                        src={profileImg || user?.profileImg || "/avatar-placeholder.png"} 
                                    />
                                    <div className="absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer">
                                        {isMyProfile && (
                                            <MdEdit 
                                                className="w-4 h-4 text-white"
                                                onClick={() => profileImgRef.current.click()}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end px-4 mt-5">
                            {isMyProfile && <EditProfileModal />}
                            {!isMyProfile && (
                                <button
                                    className="btn btn-outline rounded-full btn-sm"
                                    onClick={() => alert('Followed successfully')}
                                >
                                    Follow
                                </button>
                            )}
                            {(coverImg || profileImg) && (
                                <button
                                    className="btn btn-primary rounded-full btn-sm text-white px-4 ml-2"
                                    onClick={() => alert('Profile update successfully')}
                                >
                                    Update
                                </button>
                            )}
                        </div>
                        <div className="flex flex-col gap-4 mt-14 px-4">
                            <div className="flex flex-col">
                                <span className="font-bold text-lg">{user?.fullName}</span>
                                <span className="text-sm text-slate-500">@{user?.username}</span>
                                <span className="text-sm my-1">{user?.bio}</span>
                            </div>

                            <div className="flex gap-2 flex-wrap">
                                {user?.link && (
                                    <div className="flex gap-1 items-center">
                                        <>
                                            <FaLink className="w-3 h-3 text-slate-500" />
                                            <a 
                                                href="https://tk.com"
                                                target="_blank"
                                                rel="noreffer"
                                                className="text-sm text-blue-500 hover:underline"
                                            
                                            >
                                                youtube.com/@asaprogrammer_
                                            </a>
                                        </>
                                    </div>
                                )}
                                <div className="flex gap-2 items-center">
                                    <IoCalendarOutline className="w-4 h-4 text-slate-500" />
                                    <span className="text-sm text-slate-500">Joined July 1993</span>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <div className="flex gap-1 items-center">
                                    <span className="font-bold text-xs">{user?.following.length}</span>
                                    <span className="text-slate-500">Following</span>
                                </div>
                                <div className="flex gap-1 items-center">
                                    <span className="font-bold text-xs">{user?.followers.length}</span>
                                    <span className="text-slate-500">Followers</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full border-b border-gray-700 mt-4">
                            <div 
                                className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 relative cursor-pointer"
                                onClick={() => setFeedType('posts')}
                            >
                                Posts
                                {feedType === 'posts' && (
                                    <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary"/>
                                )}
                            </div>
                            <div
									className='flex justify-center flex-1 p-3 text-slate-500 hover:bg-secondary transition duration-300 relative cursor-pointer'
									onClick={() => setFeedType("likes")}
								>
									Likes
									{feedType === "likes" && (
										<div className='absolute bottom-0 w-10  h-1 rounded-full bg-primary' />
									)}
								</div>
                        </div>
                    </>
                )}
            </div>
        </div>
    </>
  )
}

export default ProfilePage