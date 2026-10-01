import ChatSession from '../models/ChatSession.js';
import { generateSocraticResponse } from '../services/aiService.js';

/**
 * @desc    Send a message to Socratic tutor (or start a new session)
 * @route   POST /api/tutor/chat
 * @access  Private
 */
export const sendMessage = async (req, res, next) => {
  try {
    const { sessionId, message, topic, code, language } = req.body;
    const userId = req.user._id;

    if (!message || message.trim() === '') {
      return res.status(400).json({ message: 'Message content is required.' });
    }

    let session;

    if (sessionId) {
      session = await ChatSession.findOne({ _id: sessionId, userId });
      if (!session) {
        return res.status(404).json({ message: 'Chat session not found.' });
      }
    } else {
      const sessionTitle = message.slice(0, 30) + (message.length > 30 ? '...' : '');
      session = new ChatSession({
        userId,
        title: sessionTitle,
        topic: topic || 'General Technical',
        messages: [],
      });
    }

    // Append user message
    session.messages.push({
      role: 'user',
      content: message.trim(),
    });

    // Call Socratic AI service with conversational history and current code buffer
    const aiReply = await generateSocraticResponse(
      session.messages,
      code || '',
      language || ''
    );

    // Append assistant response
    session.messages.push({
      role: 'assistant',
      content: aiReply,
    });

    await session.save();

    res.status(200).json({
      sessionId: session._id,
      title: session.title,
      messages: session.messages,
      latestReply: aiReply,
    });
  } catch (error) {
    console.error('--- Gemini AI Tutor Error ---');
    console.error(error);
    console.error('-----------------------------');
    next(error);
  }
};

/**
 * @desc    Get all chat sessions for the logged-in user
 * @route   GET /api/tutor/sessions
 * @access  Private
 */
export const getUserSessions = async (req, res, next) => {
  try {
    const sessions = await ChatSession.find({ userId: req.user._id })
      .select('title topic createdAt updatedAt')
      .sort({ updatedAt: -1 });

    res.status(200).json(sessions);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single chat session with full history
 * @route   GET /api/tutor/sessions/:id
 * @access  Private
 */
export const getSessionById = async (req, res, next) => {
  try {
    const session = await ChatSession.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!session) {
      return res.status(404).json({ message: 'Chat session not found.' });
    }

    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a chat session
 * @route   DELETE /api/tutor/sessions/:id
 * @access  Private
 */
export const deleteSession = async (req, res, next) => {
  try {
    const session = await ChatSession.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!session) {
      return res.status(404).json({ message: 'Chat session not found.' });
    }

    res.status(200).json({ message: 'Session deleted successfully.' });
  } catch (error) {
    next(error);
  }
};