import { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';
import TabBar, { type AcademyTab } from '@/components/learn/TabBar';
import GlossaryList from '@/components/learn/GlossaryList';
import ModuleList from '@/components/learn/ModuleList';

export default function LearnScreen() {
  const [activeTab, setActiveTab] = useState<AcademyTab>('glossary');

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Academy</Text>
      </View>

      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'glossary' && <GlossaryList />}
      {activeTab === 'modules' && <ModuleList />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.text,
  },
});
