import axios from "axios";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "./Loader";

const Comment = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [editCommentId, setEditCommentId] = useState(null); // Track the comment being edited
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);

  const fetchPostComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get("/api/comment/" + postId + "/", { withCredentials: true });
      setComments(res.data.comment);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchPostComments();
    return () => setComments([]);
  }, [postId]);

  const postComment = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const res = await axios.post("/api/comment/" + postId + "/", { comment }, { withCredentials: true });
      fetchPostComments();
      setComment("");
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  const updateComment = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const res = await axios.put("/api/comment/" + editCommentId, { comment }, { withCredentials: true });
      fetchPostComments();
      setComment("");
      setEditCommentId(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  const deleteComment = async (id) => {
    setLoader(true);
    try {
      await axios.delete("/api/comment/" + id, { withCredentials: true });
      fetchPostComments();
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
  };

  const handleEditClick = (comment) => {
    setEditCommentId(comment._id);
    setComment(comment.comment);
  };

  return (
    <div>
      <div className="flex flex-col mt-4">
        <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
        <div className="px-2 py-2 rounded-lg my-2">
          {loader ? (
            <Loader />
          ) : (
            comments.length === 0 ? "No Comments Available" : comments.map((comment) => (
              <div className="mb-4" key={comment._id}>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-600">@{comment.owner.username}</h3>
                  <div className="flex justify-center items-center space-x-4">
                    <p>{new Date(comment.updatedAt).toString().slice(0, 15)}</p>
                    {user?._id === comment?.owner._id && (
                      <div className="flex items-center justify-center space-x-2">
                        <p className="cursor-pointer" onClick={() => deleteComment(comment._id)}>
                          <MdDelete />
                        </p>
                        <p className="cursor-pointer" onClick={() => handleEditClick(comment)}>
                          <BiEdit />
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {editCommentId === comment._id ? (
                  <input
                    type="text"
                    value={comment.comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mt-2"
                    placeholder=""
                  />
                ) : (
                  <p className="px-4 mt-2">{comment.comment}</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="w-full flex flex-col mt-4 md:flex-row">
        <input
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          type="text"
          placeholder="Write a comment"
          className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"
        />
        <button
          onClick={editCommentId ? updateComment : postComment}
          className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0"
          disabled={loader}
        >
          {loader ? <Loader /> : editCommentId ? "Update Comment" : "Add Comment"}
        </button>
      </div>
    </div>
  );
};

export default Comment;
