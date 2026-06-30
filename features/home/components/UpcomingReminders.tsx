import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import type { Reminder } from "@/features/reminders/types";

const { width } = Dimensions.get("window");

const CARD_WIDTH = width * 0.75;
const CARD_SPACING = 16;

const themeColor = "#F48C25";

const categoryIconMap: Record<string, string> = {
  Finance: "receipt-outline",
  Personal: "person-outline",
  Health: "medical-outline",
  Work: "calendar-outline",
  Home: "flash-outline",
  Utility: "flash-outline",
  Event: "calendar-outline",
  Appointment: "medical-outline",
  Bill: "receipt-outline",
};

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

function getReminderStatus(dueDate: string, dueTime: string) {
  const now = new Date();
  const due = new Date(dueDate + "T" + (dueTime || "12:00"));
  const diffTime = due.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { status: "overdue" as const, days: Math.abs(diffDays) };
  if (diffDays === 0) return { status: "dueToday" as const, days: 0 };
  return { status: "dueSoon" as const, days: diffDays };
}

const getBottomText = (status: string, days: number) => {
  if (status === "overdue") return `Was due ${days} day${days > 1 ? "s" : ""} ago`;
  if (status === "dueSoon") return `Will be due in ${days} day${days > 1 ? "s" : ""}`;
  return "Due today";
};

type UpcomingRemindersProps = {
  reminders: Reminder[];
};

const UpcomingReminders = ({ reminders }: UpcomingRemindersProps) => {
  const router = useRouter();
  const displayReminders = reminders.slice(0, 3);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reminders Due Soon</Text>
        <TouchableOpacity onPress={() => router.push('/reminders')} activeOpacity={0.7}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        decelerationRate="fast"
      >
        {displayReminders.map((item) => {
          const { status, days } = getReminderStatus(item.dueDate, item.dueTime);
          const s = statusStyles[status];
          const iconName = categoryIconMap[item.category] || "notifications-outline";

          return (
            <View
              key={item.id}
              style={[
                styles.card,
                {
                  borderColor: s.color,
                  backgroundColor: s.faintBg,
                },
              ]}
            >
              <View style={styles.cardHeader}>
                <View style={[styles.statusBadge, { backgroundColor: s.color }]}>
                  <Text style={styles.statusText}>{s.label}</Text>
                </View>

                <View style={styles.iconWrapper}>
                  <Ionicons name={iconName as any} size={22} color={s.color} />
                </View>
              </View>

              <Text style={styles.reminderType}>{item.category}</Text>
              <Text style={styles.description}>{item.title}</Text>

              <Text style={[styles.bottomText, { color: s.color }]}>
                {getBottomText(status, days)}
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
