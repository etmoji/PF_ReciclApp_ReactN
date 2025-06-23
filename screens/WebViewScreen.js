import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function WebViewScreen({ route }) {
  const { url } = route.params;

  return <WebView source={{ uri: url }} style={styles.webView} />;
}

const styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
});
