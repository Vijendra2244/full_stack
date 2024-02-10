import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);
  const [updatedPostTitle, setUpdatedPostTitle] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "https://real-ruby-lemming-suit.cyclic.app/posts/",
        { withCredentials: true }
      );
      setPosts(res.data.data.postData);
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  const deletePost = async (id) => {
    try {
      const res = await axios.delete(
        `https://real-ruby-lemming-suit.cyclic.app/posts/delete/${id}`,
        { withCredentials: true }
      );
      console.log("Post deleted successfully:", res);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.log("Error deleting post:", error);
    }
  };

  const editPost = (id) => {
    setEditingPostId(id);
    const postToEdit = posts.find((post) => post._id === id);
    setUpdatedPostTitle(postToEdit.title);
  };

  const updatePost = async (id) => {
    try {
      const res = await axios.patch(
        `https://real-ruby-lemming-suit.cyclic.app/posts/update/${id}`,
        { title: updatedPostTitle },
        { withCredentials: true }
      );
      console.log("Post updated successfully:", res);
      setEditingPostId(null);
      // Fetch updated posts
      fetchData();
    } catch (error) {
      console.log("Error updating post:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <div key={post._id}>
            {editingPostId === post._id ? (
              <div>
                <input
                  type="text"
                  value={updatedPostTitle}
                  onChange={(e) => setUpdatedPostTitle(e.target.value)}
                />
                <button onClick={() => updatePost(post._id)}>Update</button>
              </div>
            ) : (
              <div>
                <li>{post.title}</li>
                <button onClick={() => deletePost(post._id)}>Delete</button>
                <button onClick={() => editPost(post._id)}>Edit</button>
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Home;
