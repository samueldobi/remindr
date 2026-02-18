import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const themeColor = "#F48C25";
const faintBg = "rgba(218,61,32,0.08)";

const filters = ["All", "Active", "Pending"];

const TasksFilterNav = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
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
  );
};

export default TasksFilterNav;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1.5,
    borderColor: themeColor,
    backgroundColor: faintBg,
    borderRadius: 30,
    padding: 4,
    alignSelf: "flex-start",
  },

  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 25,
  },

  activeFilterButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: themeColor,
  },

  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },

  activeFilterText: {
    color: themeColor,
  },
});
