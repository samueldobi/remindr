import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@/components/Themed';
import { taskItemStyles as styles } from './taskItem.styles';
import { Task } from './types';
// import { taskSections } from '@/constants/Tasks';

type TaskItemProps = {
  item: Task;
};
const TaskItem = React.memo(function TaskItem({ item }: TaskItemProps) {
    return(
            <View style={styles.taskCard}>
        <Image source={item.image} style={styles.image} />

        <View style={styles.cardContent}>
            <Text style={styles.taskName}>{item.name}</Text>
            <Text style={styles.taskDue}>Due: {item.dueDate}</Text>

            <View style={styles.progressBarBackground}>
            <View
                style={[
                styles.progressBarFill,
                { width: `${item.progress}%` },
                ]}
            />
            </View>

            <Text style={styles.progressText}>
            {item.progress}% completed
            </Text>
        </View>
    </View>
    )

    }
)
export default TaskItem