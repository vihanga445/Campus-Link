import Discussion from '../models/Discussion.js';
// Create a new discussion
export const createDiscussion = async (req, res) => {
  try {
    const { eventId, title, content } = req.body;
    const discussion = await Discussion.create({
      eventId,
      userId: req.user.id, // Assuming user is authenticated
      title,
      content,
    });
    res.status(201).json(discussion);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create discussion' });
  }
};

// Get all discussions for an event
export const getDiscussions = async (req, res) => {
  try {
    const { eventId } = req.params;
    const discussions = await Discussion.find({ eventId }).populate('userId', 'name');
    res.status(200).json(discussions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch discussions' });
  }
};

// Add a comment to a discussion
export const addComment = async (req, res) => {
  try {
    const { discussionId } = req.params;
    const { content } = req.body;
    const discussion = await Discussion.findByIdAndUpdate(
      discussionId,
      {
        $push: {
          comments: { userId: req.user.id, content },
        },
      },
      { new: true }
    ).populate('comments.userId', 'name');
    res.status(200).json(discussion);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add comment' });
  }
};