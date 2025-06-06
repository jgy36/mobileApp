// src/screens/MapScreen.tsx
import React, { useState, useCallback, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Politician } from "@/types/politician";
import { getAllRelevantPoliticians } from "@/api/politicians";
import PoliticianCard from "@/components/politicians/PoliticianCard";
import ElectionMap from "@/components/map/ElectionMap";

const MapScreen = () => {
  const [selectedCounty, setSelectedCounty] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedFips, setSelectedFips] = useState<string>("");
  const [politicians, setPoliticians] = useState<Politician[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  // Function to fetch politicians data
  const fetchPoliticians = useCallback(
    async (county: string, state: string) => {
      if (!county || !state) return;

      setIsLoading(true);
      setError(null);

      try {
        console.log(`Fetching politicians for ${county}, ${state}`);
        const relevantPoliticians = await getAllRelevantPoliticians(
          county,
          state
        );
        setPoliticians(relevantPoliticians);
      } catch (err) {
        console.error("Error fetching politicians:", err);
        setError("Failed to load politicians data. Please try again later.");
        setPoliticians([]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Handle county selection from ElectionMap
  const handleCountySelected = useCallback(
    (county: string, state: string, fips: string) => {
      console.log(`County selected: ${county}, ${state}, FIPS: ${fips}`);
      setSelectedCounty(county);
      setSelectedState(state);
      setSelectedFips(fips);
    },
    []
  );

  // Track when map component mounts
  const handleMapComponentReady = useCallback(() => {
    console.log("📊 ElectionMap component is ready and visible");
    setMapLoaded(true);
  }, []);

  // Fetch politicians when county/state selection changes
  useEffect(() => {
    if (selectedCounty && selectedState) {
      fetchPoliticians(selectedCounty, selectedState);
    }
  }, [selectedCounty, selectedState, fetchPoliticians]);

  // Retry handler
  const handleRetry = useCallback(() => {
    if (selectedCounty && selectedState) {
      fetchPoliticians(selectedCounty, selectedState);
    }
  }, [selectedCounty, selectedState, fetchPoliticians]);

  console.log(
    "🔍 MapScreen render - mapLoaded:",
    mapLoaded,
    "selectedCounty:",
    selectedCounty
  );

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="bg-white dark:bg-gray-800 pt-12 pb-4 px-4 border-b border-gray-200 dark:border-gray-700">
        <Text className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Political Representatives
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 text-center mt-1">
          Select any county to view local and state representatives
        </Text>

        {/* Debug Status */}
        <View className="mt-2 p-2 bg-blue-50 dark:bg-blue-900 rounded">
          <Text className="text-xs text-blue-800 dark:text-blue-300 text-center">
            🔍 Debug: Map loaded: {mapLoaded ? "✅ Yes" : "⏳ Loading..."} |
            Selected: {selectedCounty || "None"} | Data:{" "}
            {selectedCounty ? "✅ Ready" : "⏳ Waiting"}
          </Text>
        </View>
      </View>

      {/* Network error alert */}
      {error && (
        <View className="bg-red-50 dark:bg-red-900 p-4 m-4 rounded-lg">
          <View className="flex-row items-center">
            <MaterialIcons name="error-outline" size={24} color="#DC2626" />
            <Text className="ml-2 text-red-800 dark:text-red-200 font-medium">
              Error
            </Text>
          </View>
          <Text className="text-red-600 dark:text-red-300 mt-1">{error}</Text>
          <TouchableOpacity
            onPress={handleRetry}
            className="mt-2 bg-red-600 px-3 py-2 rounded-md"
          >
            <Text className="text-white text-sm font-medium">Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      <View className="flex-1">
        {/* Map Container - Takes up more space */}
        <View className="flex-1 bg-white dark:bg-gray-900 m-4 rounded-lg overflow-hidden shadow-sm">
          <ElectionMap onCountySelected={handleCountySelected} />
        </View>

        {/* Politicians List - Collapsible bottom section */}
        <View className="h-80 bg-white dark:bg-gray-900 mx-4 mb-4 rounded-lg shadow-sm">
          <View className="p-4 border-b border-gray-200 dark:border-gray-700">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-900 dark:text-white">
                  Representatives
                </Text>
                {selectedCounty && selectedState ? (
                  <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {selectedCounty}, {selectedState}
                    {selectedFips && (
                      <Text className="text-xs text-gray-500">
                        {" "}
                        • FIPS: {selectedFips}
                      </Text>
                    )}
                  </Text>
                ) : (
                  <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Select a county above to view representatives
                  </Text>
                )}
              </View>

              {/* Count indicator */}
              {politicians.length > 0 && (
                <View className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
                  <Text className="text-blue-800 dark:text-blue-200 text-sm font-medium">
                    {politicians.length}
                  </Text>
                </View>
              )}
            </View>
          </View>

          <ScrollView
            className="flex-1 p-4"
            showsVerticalScrollIndicator={false}
          >
            {isLoading ? (
              <View className="flex-1 items-center justify-center py-8">
                <MaterialIcons
                  name="hourglass-empty"
                  size={48}
                  color="#3B82F6"
                />
                <Text className="mt-2 text-gray-500 dark:text-gray-400">
                  Loading politicians...
                </Text>
              </View>
            ) : error ? (
              <View className="flex-1 items-center justify-center py-8">
                <MaterialIcons name="error-outline" size={48} color="#EF4444" />
                <Text className="text-red-500 text-center mt-2">{error}</Text>
                <TouchableOpacity
                  onPress={handleRetry}
                  className="bg-red-500 px-4 py-2 rounded-lg mt-4"
                >
                  <Text className="text-white font-medium">Retry</Text>
                </TouchableOpacity>
              </View>
            ) : politicians.length > 0 ? (
              <>
                {politicians.map((politician, index) => (
                  <View key={politician.id || index} className="mb-4">
                    <PoliticianCard politician={politician} />
                  </View>
                ))}

                {/* End indicator */}
                <View className="items-center py-4">
                  <Text className="text-xs text-gray-400 dark:text-gray-600">
                    End of representatives list
                  </Text>
                </View>
              </>
            ) : selectedCounty ? (
              <View className="flex-1 items-center justify-center py-8">
                <MaterialIcons name="how-to-vote" size={48} color="#6B7280" />
                <Text className="text-gray-500 dark:text-gray-400 text-center mt-2">
                  No representatives found for {selectedCounty}, {selectedState}
                </Text>
                <Text className="text-xs text-gray-400 dark:text-gray-600 text-center mt-2">
                  This area may not have complete data available
                </Text>
              </View>
            ) : (
              <View className="flex-1 items-center justify-center py-8">
                <MaterialIcons name="touch-app" size={48} color="#6B7280" />
                <Text className="text-gray-500 dark:text-gray-400 text-center">
                  Browse counties in the map above
                </Text>
                <Text className="text-xs text-gray-400 dark:text-gray-600 text-center mt-2">
                  Your election data is loaded! Search, filter, or select any
                  county to see representatives
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default MapScreen;
