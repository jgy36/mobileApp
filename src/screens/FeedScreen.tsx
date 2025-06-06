// src/screens/FeedScreen.tsx - FINAL FIXED VERSION
import React, { useState, useEffect } from "react";
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
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("refreshFeed"));
    }
  };

  // Tab data for easier management
  const tabs = [
    { id: "for-you", label: "For You" },
    { id: "following", label: "Following" },
    { id: "communities", label: "Communities" },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
        {/* Header with App Title - Elevated design */}
        <View className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md px-6 pt-3 pb-5 border-b border-gray-200/60 dark:border-gray-700/60">
          <Text className="text-3xl font-bold text-gray-900 dark:text-white text-center tracking-tight">
            Feed
          </Text>
          <View
            className="absolute bottom-0 left-1/2 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            style={{ transform: [{ translateX: -24 }] }}
          />
        </View>

        {/* Main Content Container */}
        <View className="flex-1 px-4">
          {/* Tabs Container - Modern glassmorphism design */}
          <View className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl mt-6 mb-6 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 border border-white/20">
            <View className="p-6">
              {/* Tab List - Sleek pill design */}
              <View className="bg-gray-50/80 dark:bg-gray-700/80 rounded-2xl p-2 flex-row backdrop-blur-sm">
                {tabs.map((tab) => (
                  <TouchableOpacity
                    key={tab.id}
                    onPress={() => setActiveTab(tab.id as any)}
                    className="flex-1 py-4 px-6 rounded-xl"
                    style={{
                      backgroundColor:
                        activeTab === tab.id ? "white" : "transparent",
                      shadowColor:
                        activeTab === tab.id ? "#3b82f6" : "transparent",
                      shadowOffset:
                        activeTab === tab.id
                          ? { width: 0, height: 4 }
                          : { width: 0, height: 0 },
                      shadowOpacity: activeTab === tab.id ? 0.15 : 0,
                      shadowRadius: activeTab === tab.id ? 8 : 0,
                      elevation: activeTab === tab.id ? 3 : 0,
                      borderWidth: activeTab === tab.id ? 1 : 0,
                      borderColor:
                        activeTab === tab.id ? "#e0e7ff" : "transparent",
                    }}
                  >
                    <Text
                      className="text-center text-base font-semibold tracking-wide"
                      style={{
                        color: activeTab === tab.id ? "#1e40af" : "#6b7280",
                      }}
                    >
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Active tab indicator */}
              <View className="mt-4 flex-row justify-center">
                <View
                  className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                  style={{
                    width: activeTab === "communities" ? 90 : 60,
                  }}
                />
              </View>
            </View>
          </View>

          {/* Posts List Container - Modern card design */}
          <View className="flex-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 border border-white/20 overflow-hidden">
            <PostList activeTab={activeTab} />
          </View>
        </View>

        {/* Floating Action Button - Enhanced with gradient */}
        <TouchableOpacity
          className="absolute bottom-8 right-6 w-16 h-16 rounded-2xl items-center justify-center shadow-2xl"
          style={{
            backgroundColor: "#3b82f6",
            shadowColor: "#3b82f6",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.4,
            shadowRadius: 16,
            elevation: 12,
          }}
          onPress={() => setIsPostModalVisible(true)}
        >
          {/* Gradient overlay */}
          <View
            className="absolute inset-0 rounded-2xl"
            style={{
              backgroundColor: "#3b82f6",
            }}
          />
          <MaterialIcons
            name="edit"
            size={28}
            color="white"
            style={{ zIndex: 1 }}
          />

          {/* Pulse animation ring */}
          <View
            className="absolute inset-0 rounded-2xl border-2 border-blue-400/30"
            style={{
              transform: [{ scale: 1.2 }],
            }}
          />
        </TouchableOpacity>

        {/* Create Post Modal - Modern design */}
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
            {/* Modal Background with blur effect */}
            <View
              className="flex-1 justify-end"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
            >
              {/* Modal Content - Modern card design */}
              <View className="bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl border-t border-gray-200/30 dark:border-gray-700/30">
                {/* Modal Header - Enhanced design */}
                <View className="flex-row items-center justify-between p-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                  <View>
                    <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                      Create Post
                    </Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Share your thoughts with the community
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => setIsPostModalVisible(false)}
                    className="w-10 h-10 rounded-2xl items-center justify-center"
                    style={{ backgroundColor: "#f3f4f6" }}
                  >
                    <MaterialIcons name="close" size={22} color="#6b7280" />
                  </TouchableOpacity>
                </View>

                {/* Modal Body - Elegant content area */}
                <View className="px-6 py-4" style={{ maxHeight: 420 }}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    className="flex-1"
                    bounces={false}
                  >
                    <PostForm onPostCreated={handlePostCreated} />
                  </ScrollView>
                </View>

                {/* Modal footer - Safe area for iPhone */}
                <View className="h-8 bg-gray-50 dark:bg-gray-800 rounded-t-3xl" />
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default FeedScreen;
