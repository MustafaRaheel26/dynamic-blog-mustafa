import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import CommentSection from '../../components/CommentSection';

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  avatar: string;
  image?: string;
  createdAt: string;
}

interface User {
  name: string;
  avatar: string;
}

const BlogDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Get the current logged-in user
    const storedUser = JSON.parse(localStorage.getItem('currentUser') || 'null') as User | null;
    setCurrentUser(storedUser);

    if (id) {
      const storedBlogs = JSON.parse(localStorage.getItem('blogs') || '[]') as Blog[];
      const foundBlog = storedBlogs.find((blog) => blog.id === id);
      setBlog(foundBlog || null);
    }
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <h1 className="text-2xl text-gray-700">Blog not found!</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {blog.image && (
            <div className="w-full h-64 relative">
              <Image
                src={blog.image}
                alt={blog.title}
                layout="fill"
                objectFit="cover"
                className="rounded"
              />
            </div>
          )}
          <div className="p-6">
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            <p className="text-gray-700 text-lg mb-6">{blog.content}</p>
            <div className="flex items-center mb-4">
              <Image
                src={blog.avatar}
                alt={blog.author}
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <div>
                <p className="font-medium">{blog.author}</p>
                <p className="text-sm text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
        <CommentSection blogId={id} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default BlogDetails;
