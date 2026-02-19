import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const themeColor = "#F48C25";
const faintBg = "rgba(218,61,32,0.08)";
const strong = "rgb(241, 55, 22)";

const filters = ["All", "Active", "Pending"];

const TasksFilterNav = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {filters.map((filter) => {
          const isActive = activeFilter === filter;

          return (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                isActive && styles.activeFilterButton,
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  isActive && styles.activeFilterText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default TasksFilterNav;

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: 10, 
  },

  container: {
    flexDirection: "row",
    borderWidth: 1.5,
    borderColor: themeColor,
    backgroundColor: faintBg,
    borderRadius: 30,
    padding: 4,
    // alignSelf: "center",
    // justifyContent:"space-evenly",
    // width:"100%",
    marginTop:10,
    marginHorizontal: 16,
    marginBottom: 12,
  },

  filterButton: {
    flex: 1,
    alignItems:"center",
    justifyContent:"center",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 15,
  },

  activeFilterButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: themeColor,
  },

  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: strong,
  },

  activeFilterText: {
    color: themeColor,
  },
});
