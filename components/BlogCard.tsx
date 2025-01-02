import Link from 'next/link';
import Image from 'next/image'; // Import Image from next/image

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  author: { username: string; avatar: string };
  onDelete: () => void;
}

const BlogCard = ({ slug, title, description, author, onDelete }: BlogCardProps) => {
  const { username, avatar } = author || { username: 'Anonymous', avatar: 'https://i.pravatar.cc/150?u=anonymous' };

  return (
    <div className="bg-white p-4 rounded shadow-md hover:shadow-lg transition">
      <div className="flex items-center mb-4">
        <Image 
          src={avatar} 
          alt="Author Avatar" 
          className="w-10 h-10 rounded-full mr-3" 
          width={40} // Specify width for avatar
          height={40} // Specify height for avatar
        />
        <div>
          <h4 className="font-semibold">{username}</h4>
          <span className="text-sm text-gray-500">Just now</span>
        </div>
      </div>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between">
        <Link href={`/posts/${slug}`} className="text-blue-600 hover:underline">
          Read more
        </Link>
        <div>
          <button onClick={onDelete} className="text-red-600 hover:underline">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
