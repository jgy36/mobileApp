// src/components/feed/SaveButton.tsx - FIXED version
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useNavigation } from '@react-navigation/native';
import { savePost, checkPostSaveStatus } from '@/api/posts';

interface SaveButtonProps {
  postId: number;
  isSaved: boolean;
}

const SaveButton = ({ postId, isSaved: initialIsSaved }: SaveButtonProps) => {
  const [saved, setSaved] = useState(initialIsSaved);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const navigation = useNavigation();

  // Check the actual saved status when component mounts
  useEffect(() => {
    const fetchSavedStatus = async () => {
      if (!user.token) return;
      
      try {
        const status = await checkPostSaveStatus(postId);
        if (status) {
          setSaved(status.isSaved);
        }
      } catch (err) {
        console.error("Error checking save status:", err);
        setSaved(initialIsSaved);
      }
    };
    
    if (user.token) {
      fetchSavedStatus();
    }
  }, [postId, user.token, initialIsSaved]);

  const handleSave = async () => {
    setIsLoading(true);
    
    if (!user.token) {
      (navigation as any).navigate('Login');
      setIsLoading(false);
      return;
    }
    
    try {
      await savePost(postId);
      
      const newSavedState = !saved;
      setSaved(newSavedState);
      
      // You might want to show a toast notification here
      console.log(newSavedState ? "Post saved successfully" : "Post removed from saved items");
    } catch (error) {
      console.error("Error saving post:", error);
      // Show error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={handleSave}
      disabled={isLoading}
      className="flex-row items-center"
    >
      <MaterialIcons 
        name={saved ? "bookmark" : "bookmark-border"}
        size={20} 
        color={saved ? "#eab308" : "#6B7280"}
      />
      {/* Optional: Show text label */}
      {/*
      <Text className="ml-1 text-gray-600 dark:text-gray-400 text-sm">
        {isLoading ? "..." : saved ? "Saved" : "Save"}
      </Text>
      */}
    </TouchableOpacity>
  );
};

export default SaveButton;