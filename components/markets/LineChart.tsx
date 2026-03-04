import { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import Colors from '@/constants/Colors';

interface Props {
  prices: number[];
  timestamps: number[];
  range: '1' | '7' | '30' | '365';
  width: number;
  height?: number;
  color?: string;
}

export default function LineChart({
  prices,
  timestamps,
  range,
  width,
  height = 180,
  color = Colors.primary,
}: Props) {
  const PADDING_H = 4;
  const PADDING_TOP = 12;
  const PADDING_BOTTOM = 24; // space for x-axis labels

  const chartWidth = width - PADDING_H * 2;
  const chartHeight = height - PADDING_TOP - PADDING_BOTTOM;

  const { linePath, areaPath, points, minPrice, maxPrice, xLabels } = useMemo(() => {
    if (prices.length < 2) return { linePath: '', areaPath: '', points: [], minPrice: 0, maxPrice: 0, xLabels: [] };

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1;

    const toX = (i: number) => PADDING_H + (i / (prices.length - 1)) * chartWidth;
    const toY = (p: number) => PADDING_TOP + chartHeight - ((p - minPrice) / priceRange) * chartHeight;

    // Build smooth bezier path using catmull-rom → cubic bezier conversion
    const pts = prices.map((p, i) => ({ x: toX(i), y: toY(p) }));

    let line = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[Math.max(i - 1, 0)];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[Math.min(i + 2, pts.length - 1)];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      line += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    const bottomY = PADDING_TOP + chartHeight;
    const area = `${line} L ${pts[pts.length - 1].x} ${bottomY} L ${pts[0].x} ${bottomY} Z`;

    // X-axis labels: pick ~4 evenly spaced timestamps
    const labelCount = 4;
    const xLabels: { x: number; label: string }[] = [];
    for (let i = 0; i < labelCount; i++) {
      const idx = Math.round((i / (labelCount - 1)) * (timestamps.length - 1));
      const ts = timestamps[idx];
      const date = new Date(ts);
      let label = '';
      if (range === '1') {
        label = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
      } else if (range === '7' || range === '30') {
        label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      } else {
        label = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      }
      xLabels.push({ x: toX(idx), label });
    }

    return {
      linePath: line,
      areaPath: area,
      points: pts,
      minPrice,
      maxPrice,
      xLabels,
    };
  }, [prices, timestamps, range, chartWidth, chartHeight]);

  if (prices.length < 2) {
    return <View style={[styles.empty, { width, height }]} />;
  }

  const lastPt = points[points.length - 1];

  const formatY = (v: number) => {
    if (v >= 1000) return `$${(v / 1000).toFixed(1)}k`;
    if (v >= 1) return `$${v.toFixed(2)}`;
    return `$${v.toPrecision(3)}`;
  };

  return (
    <View style={{ width, height }}>
      {/* Y-axis min/max */}
      <Text style={[styles.yLabel, { top: PADDING_TOP - 4 }]}>{formatY(maxPrice)}</Text>
      <Text style={[styles.yLabel, { top: PADDING_TOP + chartHeight - 14 }]}>{formatY(minPrice)}</Text>

      <Svg width={width} height={height - PADDING_BOTTOM}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <Stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </LinearGradient>
        </Defs>

        {/* Gradient fill */}
        <Path d={areaPath} fill="url(#grad)" />

        {/* Line */}
        <Path d={linePath} stroke={color} strokeWidth={2} fill="none" />

        {/* End dot */}
        {lastPt && (
          <>
            <Circle cx={lastPt.x} cy={lastPt.y} r={4} fill={color} />
            <Circle cx={lastPt.x} cy={lastPt.y} r={7} fill={color} opacity={0.25} />
          </>
        )}
      </Svg>

      {/* X-axis labels */}
      <View style={[styles.xRow, { width }]}>
        {xLabels.map((l, i) => (
          <Text
            key={i}
            style={[
              styles.xLabel,
              {
                position: 'absolute',
                left: l.x,
                transform: [{ translateX: -24 }],
              },
            ]}
          >
            {l.label}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    backgroundColor: 'transparent',
  },
  yLabel: {
    position: 'absolute',
    right: 4,
    fontSize: 9,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  xRow: {
    height: 20,
    position: 'relative',
  },
  xLabel: {
    fontSize: 9,
    color: Colors.textMuted,
    fontWeight: '500',
    width: 48,
    textAlign: 'center',
  },
});
