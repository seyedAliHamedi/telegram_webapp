import React, { useState } from "react";
import api from "../api";
import "./../../static/style/blog.css";

function Blog({ blog, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(blog.title);
  const [updatedDescription, setUpdatedDescription] = useState(
    blog.description
  );
  const [updatedCategory, setUpdatedCategory] = useState(blog.category);
  const [updatedTags, setUpdatedTags] = useState(blog.tags);
  const [commentBody, setCommentBody] = useState("");

  const formattedDate = new Date(blog.created_at).toLocaleDateString("en-US");

  const handleUpdate = (e) => {
    e.preventDefault();
    onUpdate(
      blog.id,
      updatedTitle,
      updatedDescription,
      updatedCategory,
      updatedTags
    );
    setIsEditing(false);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/comments/create/", {
        blog: blog.id,
        body: commentBody,
      });

      if (response.status === 201) {
        alert("Comment added!");
        setCommentBody("");
        setIsCommenting(false);
      } else {
        alert("Failed to add comment");
      }
    } catch (error) {
      alert("Failed to add comment");
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="blog-container">
      {isEditing ? (
        <form onSubmit={handleUpdate} className="update-form">
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            className="form-input"
            placeholder="Update Title"
          />
          <textarea
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            className="form-input"
            placeholder="Update Description"
          />
          <select
            value={updatedCategory}
            onChange={(e) => setUpdatedCategory(e.target.value)}
            className="form-input"
          >
            <option value="TECH">Technology</option>
            <option value="LIFE">Lifestyle</option>
            <option value="FOOD">Food</option>
            <option value="TRVL">Travel</option>
            <option value="EDU">Education</option>
          </select>
          <input
            type="text"
            value={updatedTags}
            onChange={(e) => setUpdatedTags(e.target.value)}
            className="form-input"
            placeholder="Update Tags"
          />
          <button type="submit" className="update-button">
            Save
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="cancel-button"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <p className="blog-title">{blog.title}</p>
          <p className="blog-content">{blog.description}</p>
          <p className="blog-category">Category: {blog.category}</p>
          <p className="blog-tags">Tags: {blog.tags}</p>
          <p className="blog-date">Published on: {formattedDate}</p>
          {onDelete && onUpdate ? (
            <>
              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => onDelete(blog.id)}
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <p className="blog-author">Author: {blog.author}</p>
              <button
                className="comment-button"
                onClick={() => setIsCommenting(!isCommenting)}
              >
                Comment
              </button>
              <button
                className="show-comments-button"
                onClick={() => setShowComments(!showComments)}
              >
                {showComments ? "Hide Comments" : "Show Comments"}
              </button>
            </>
          )}
        </>
      )}

      {isCommenting && (
        <div className="comment-form-popup">
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              className="form-input"
              placeholder="Write your comment here"
            />
            <button type="submit" className="comment-submit-button">
              Submit
            </button>
            <button
              type="button"
              onClick={() => setIsCommenting(false)}
              className="comment-cancel-button"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {showComments && (
        <div className="comments-container">
          {blog.comments && blog.comments.length > 0 ? (
            blog.comments.map((comment) => (
              <div key={comment.id} className="comment">
                <p className="comment-body">{comment.body}</p>
                <p className="comment-author">Commented by: {comment.author}</p>
                <p className="comment-date">
                  On: {new Date(comment.created_at).toLocaleDateString("en-US")}
                </p>
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Blog;
