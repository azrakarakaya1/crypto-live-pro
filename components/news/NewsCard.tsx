import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Colors from '@/constants/Colors';
import SentimentBadge from './SentimentBadge';
import { timeAgo } from '@/utils/formatters';
import type { NewsArticle } from '@/types';

export default function NewsCard({ article }: { article: NewsArticle }) {
  async function handlePress() {
    if (!article.url) return;
    await WebBrowser.openBrowserAsync(article.url, {
      toolbarColor: Colors.card,
      controlsColor: Colors.primary,
    });
  }

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.75}>
      {/* Top row: source + time */}
      <View style={styles.meta}>
        <Text style={styles.source}>{article.source}</Text>
        <Text style={styles.time}>{timeAgo(article.publishedAt)}</Text>
      </View>

      {/* Title */}
      <Text style={styles.title} numberOfLines={3}>{article.title}</Text>

      {/* Bottom row: sentiment + currency tags */}
      <View style={styles.footer}>
        <SentimentBadge sentiment={article.sentiment} />
        {article.currencies.length > 0 && (
          <View style={styles.currencies}>
            {article.currencies.slice(0, 4).map((c) => (
              <View key={c} style={styles.currencyTag}>
                <Text style={styles.currencyText}>{c}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 14,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  source: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  time: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    lineHeight: 20,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  currencies: {
    flexDirection: 'row',
    gap: 5,
    flexWrap: 'wrap',
  },
  currencyTag: {
    backgroundColor: 'rgba(139,92,246,0.12)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  currencyText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
  },
});
