import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const CARD_WIDTH = width * 0.75;
const CARD_SPACING = 16;

const themeColor = "#F48C25";

const reminderTypeIcons = {
  bill: { name: "receipt-outline" },
  event: { name: "calendar-outline" },
  appointment: { name: "medical-outline" },
  utility: { name: "flash-outline" },
  personal: { name: "person-outline" },
};

const reminders = [
  {
    id: 1,
    status: "overdue",
    days: 3,
    type: "Home & Utility",
    description: "Pay electricity bill",
    iconType: "bill",
  },
  {
    id: 2,
    status: "dueToday",
    days: 0,
    type: "Event",
    description: "Attend PTA meeting",
    iconType: "event",
  },
  {
    id: 3,
    status: "dueSoon",
    days: 2,
    type: "Appointment",
    description: "Dental checkup",
    iconType: "appointment",
  },
  {
    id: 4,
    status: "dueSoon",
    days: 5,
    type: "Personal",
    description: "Go and pick up the kids",
    iconType: "personal",
  },
  {
    id: 5,
    status: "dueToday",
    days: 0,
    type: "Home & Utility",
    description: "Water bill payment",
    iconType: "utility",
  },
];

const statusStyles = {
  overdue: {
    label: "Overdue",
    color: "#DA3D20",
    faintBg: "rgba(218,61,32,0.08)",
  },
  dueToday: {
    label: "Due Today",
    color: themeColor,
    faintBg: "#fff",
  },
  dueSoon: {
    label: "Due Soon",
    color: "#C9D400",
    faintBg: "#fff",
  },
};

const getBottomText = (status, days) => {
  if (status === "overdue") return `Was due ${days} day${days > 1 ? "s" : ""} ago`;
  if (status === "dueSoon") return `Will be due in ${days} day${days > 1 ? "s" : ""}`;
  return "Due today";
};

const UpcomingReminders = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Reminders Due Soon</Text>
        <Text style={styles.seeAll}>See all</Text>
      </View>

      {/* Scroll Cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        decelerationRate="fast"
      >
        {reminders.map((item) => {
          const status = statusStyles[item.status];

          return (
            <View
              key={item.id}
              style={[
                styles.card,
                {
                  borderColor: status.color,
                  backgroundColor: status.faintBg,
                },
              ]}
            >
              {/* Top Row */}
              <View style={styles.cardHeader}>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: status.color },
                  ]}
                >
                  <Text style={styles.statusText}>{status.label}</Text>
                </View>

                <View style={styles.iconWrapper}>
                  <Ionicons
                    name={reminderTypeIcons[item.iconType].name}
                    size={22}
                    color={status.color}
                  />
                </View>
              </View>

              {/* Type */}
              <Text style={styles.reminderType}>{item.type}</Text>

              {/* Description */}
              <Text style={styles.description}>{item.description}</Text>

              {/* Bottom Text */}
              <Text style={[styles.bottomText, { color: status.color }]}>
                {getBottomText(item.status, item.days)}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default UpcomingReminders;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },

  seeAll: {
    fontSize: 15,
    fontWeight: "600",
    color: themeColor,
  },

  card: {
    width: CARD_WIDTH,
    marginRight: CARD_SPACING,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },

  iconWrapper: {
    borderRadius: 50,
    padding: 8,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    backgroundColor: "#F7F7F7",
  },

  reminderType: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    color: "#333",
  },

  description: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 14,
    color: "#111",
  },

  bottomText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
