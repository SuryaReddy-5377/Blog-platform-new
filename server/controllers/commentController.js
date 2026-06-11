import Comment from "../models/Comment.js";

// Add Comment
export const addComment = async (req, res) => {
  try {

    const comment = await Comment.create({
      comment: req.body.comment,
      user: req.user,
      post: req.params.postId,
    });

    res.status(201).json(comment);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Comments
export const getComments = async (req, res) => {

  try {

    const comments = await Comment.find({
      post: req.params.postId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(comments);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

// Delete Comment
export const deleteComment = async (req, res) => {

  try {

    const comment = await Comment.findById(req.params.id);

    if (!comment)
      return res.status(404).json({
        message: "Comment not found",
      });

    if (comment.user.toString() !== req.user)
      return res.status(401).json({
        message: "Unauthorized",
      });

    await comment.deleteOne();

    res.json({
      message: "Comment Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};