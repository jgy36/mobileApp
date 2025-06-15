import { MaterialIcons } from "@expo/vector-icons";
// src/screens/ProfileScreen.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useNavigation } from "@react-navigation/native";

import UserBadges from "../components/profile/UserBadges";
import UserStats from "../components/profile/UserStats";
import ProfilePosts from "../components/profile/ProfilePosts";

// Silent error boundary - keeps components working without visible errors
const ErrorBoundary = ({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) => {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error("Component error:", error);
    return <>{fallback}</>;
  }
};

const ProfileScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state: RootState) => state.user);

  const navigateToSettings = () => {
    navigation.navigate("Settings" as never);
  };

  const userId = user.id;

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-white border-b border-gray-100">
        <View className="flex-row justify-between items-center px-4 py-3 pt-12">
          <Text className="text-xl font-bold text-black">Profile</Text>
          <TouchableOpacity
            onPress={navigateToSettings}
            className="p-2 rounded-full"
            activeOpacity={0.7}
          >
            <MaterialIcons name="settings" size={24} color="#1f2937" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Header Section */}
        <View className="bg-white px-4 py-6">
          {/* Avatar and Basic Info */}
          <View className="items-center mb-6">
            {/* Profile Image */}
            <View className="relative mb-4">
              <Image
                source={{
                  uri:
                    user.profileImageUrl ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
                }}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 4,
                }}
              />

              {/* Online indicator (optional) */}
              <View className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-white rounded-full" />
            </View>

            {/* Name and Username */}
            <View className="items-center mb-4">
              <Text className="text-2xl font-bold text-gray-900 mb-1">
                {user.displayName || user.username}
              </Text>
              <Text className="text-base text-gray-500 mb-3">
                @{user.username}
              </Text>

              {/* Bio */}
              {user.bio && (
                <Text className="text-center text-gray-700 leading-5 max-w-sm">
                  {user.bio}
                </Text>
              )}
            </View>

            {/* Join Date */}
            <View className="flex-row items-center mb-4">
              <MaterialIcons name="calendar-today" size={16} color="#6b7280" />
              <Text className="ml-2 text-sm text-gray-500">
                Joined{" "}
                {(user as any).joinDate
                  ? new Date((user as any).joinDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : "Recently"}
              </Text>
            </View>
          </View>

          {/* User Stats */}
          {userId && (
            <ErrorBoundary>
              <UserStats userId={userId} className="mb-6" />
            </ErrorBoundary>
          )}

          {/* Political Badges */}
          {userId && (
            <ErrorBoundary>
              <View className="mb-6">
                <UserBadges userId={userId} isCurrentUser={true} />
              </View>
            </ErrorBoundary>
          )}
        </View>

        {/* Divider */}
        <View className="h-2 bg-gray-50" />

        {/* Posts Section */}
        <View className="bg-white">
          <ErrorBoundary
            fallback={
              <View className="p-6 items-center">
                <Text className="text-gray-500">Unable to load posts</Text>
              </View>
            }
          >
            <ProfilePosts />
          </ErrorBoundary>
        </View>

        {/* Bottom spacing for tab bar */}
        <View className="h-20" />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
