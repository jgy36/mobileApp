// src/screens/FeedScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import PostList from "../components/feed/PostList";
import PostForm from "../components/feed/PostForm";

const FeedScreen = () => {
  const [activeTab, setActiveTab] = useState<
    "for-you" | "following" | "communities"
  >("for-you");
  const [isPostModalVisible, setIsPostModalVisible] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  // Function to handle post creation and refresh feed
  const handlePostCreated = () => {
    setIsPostModalVisible(false);
    // The PostList component will handle refreshing via the refreshFeed event
    window.dispatchEvent(new CustomEvent("refreshFeed"));
  };

  // Tab data for easier management
  const tabs = [
    { id: "for-you", label: "For You" },
    { id: "following", label: "Following" },
    { id: "communities", label: "Communities" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header with App Title */}
      <View className="bg-white dark:bg-gray-800 px-4 pt-2 pb-4 border-b border-gray-200 dark:border-gray-700">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Feed
        </Text>
      </View>

      {/* Main Content Container - matches web max-width approach */}
      <View className="flex-1 px-4">
        {/* Tabs Container - styled like web version */}
        <View className="bg-white dark:bg-gray-800 rounded-xl mt-4 mb-4 shadow-sm">
          <View className="p-4">
            {/* Tab List - matches web TabsList styling */}
            <View className="bg-gray-100 dark:bg-gray-700 rounded-xl p-1 flex-row">
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab.id}
                  onPress={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-3 px-4 rounded-lg ${
                    activeTab === tab.id
                      ? "bg-white dark:bg-gray-800 shadow-sm"
                      : "bg-transparent"
                  }`}
                >
                  <Text
                    className={`text-center text-lg font-medium ${
                      activeTab === tab.id
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Posts List Container */}
        <View className="flex-1">
          <PostList activeTab={activeTab} />
        </View>
      </View>

      {/* Floating Action Button - improved styling */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full items-center justify-center shadow-lg elevation-8"
        onPress={() => setIsPostModalVisible(true)}
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
        }}
      >
        <MaterialIcons name="edit" size={24} color="white" />
      </TouchableOpacity>

      {/* Create Post Modal - improved design */}
      <Modal
        visible={isPostModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsPostModalVisible(false)}
        presentationStyle="pageSheet"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          {/* Modal Background */}
          <View className="flex-1 bg-black/50 justify-end">
            {/* Modal Content - styled like web Dialog */}
            <View className="bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl">
              {/* Modal Header */}
              <View className="flex-row items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <Text className="text-xl font-semibold text-gray-900 dark:text-white">
                  Create a new post
                </Text>
                <TouchableOpacity
                  onPress={() => setIsPostModalVisible(false)}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
                >
                  <MaterialIcons name="close" size={20} color="gray" />
                </TouchableOpacity>
              </View>

              {/* Modal Body */}
              <View className="p-6 max-h-96">
                <ScrollView showsVerticalScrollIndicator={false}>
                  <PostForm onPostCreated={handlePostCreated} />
                </ScrollView>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

export default FeedScreen;
