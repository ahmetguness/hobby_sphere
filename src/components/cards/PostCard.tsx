import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../../theme/colors';
import { User } from '../../models/User';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { 
  togglePostLike, 
  togglePostDislike, 
  getPostComments 
} from '../../services/firebase/firebaseServices';
import { CommentModal } from '../home/CommentModal';

interface PostCardProps {
  id: string;
  description: string;
  image: string;
  topic: string;
  date: Date;
  likes: string[];
  dislikes: string[];
  user: User;
  currentUser: User;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  description,
  image,
  topic,
  date,
  likes,
  dislikes,
  user,
  currentUser,
}) => {
  const [isLiked, setIsLiked] = useState(likes.includes(currentUser.id));
  const [isDisliked, setIsDisliked] = useState(dislikes.includes(currentUser.id));
  const [likesCount, setLikesCount] = useState(likes.length);
  const [commentsCount, setCommentsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await getPostComments(id);
      if (response.success && response.comments) {
        setCommentsCount(response.comments.length);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleLike = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await togglePostLike(id, currentUser.id, isLiked);
      
      if (response.success) {
        if (isDisliked) {
          setIsDisliked(false);
        }
        setIsLiked(!isLiked);
        setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      Alert.alert('Error', 'Failed to update like status');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDislike = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await togglePostDislike(id, currentUser.id, isDisliked);
      
      if (response.success) {
        if (isLiked) {
          setIsLiked(false);
          setLikesCount(prev => prev - 1);
        }
        setIsDisliked(!isDisliked);
      } else {
        Alert.alert('Error', response.message);
      }
    } catch (error) {
      console.error('Error toggling dislike:', error);
      Alert.alert('Error', 'Failed to update dislike status');
    } finally {
      setIsLoading(false);
    }
  };

  const handleComment = () => {
    setIsCommentModalVisible(true);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: user.image || 'https://via.placeholder.com/40' }}
            style={styles.userImage}
          />
          <View>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.postDate}>{formatDate(date)}</Text>
          </View>
        </View>
        <View style={styles.topicContainer}>
          <Text style={styles.topicText}>{topic}</Text>
        </View>
      </View>

      <Text style={styles.description}>{description}</Text>

      {image && (
        <Image
          source={{ uri: image }}
          style={styles.postImage}
          resizeMode="cover"
        />
      )}

      <View style={styles.interactions}>
        <TouchableOpacity 
          style={styles.interactionButton} 
          onPress={handleLike}
          activeOpacity={0.7}
          disabled={isLoading}
        >
          <AntDesign 
            name={isLiked ? "like1" : "like2"} 
            size={22} 
            color={isLiked ? COLORS.primary : COLORS.text} 
          />
          <Text style={[
            styles.interactionText,
            isLiked && styles.interactionTextActive
          ]}>
            {likesCount}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.interactionButton} 
          onPress={handleDislike}
          activeOpacity={0.7}
          disabled={isLoading}
        >
          <AntDesign 
            name={isDisliked ? "dislike1" : "dislike2"} 
            size={22} 
            color={isDisliked ? COLORS.error : COLORS.text} 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.interactionButton}
          onPress={handleComment}
          activeOpacity={0.7}
        >
          <FontAwesome name="comment-o" size={22} color={COLORS.text} />
          <Text style={styles.interactionText}>{commentsCount}</Text>
        </TouchableOpacity>
      </View>

      <CommentModal
        visible={isCommentModalVisible}
        onClose={() => setIsCommentModalVisible(false)}
        postId={id}
        currentUser={currentUser}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  postDate: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  topicContainer: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  topicText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 12,
    lineHeight: 20,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  interactions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  interactionText: {
    fontSize: 14,
    color: COLORS.text,
  },
  interactionTextActive: {
    color: COLORS.primary,
    fontWeight: '500',
  },
});

export default PostCard;
