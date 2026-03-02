import { useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Pdf from 'react-native-pdf';

type Props = {
  uri: string;
  initialPage?: number;
  onPageChanged?: (page: number, totalPages: number) => void;
  onError?: (error: object) => void;
};

export function PdfViewer({ uri, initialPage = 1, onPageChanged, onError }: Props) {
  const source = useRef({ uri, cache: true }).current;

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        page={initialPage}
        onPageChanged={onPageChanged}
        onError={onError}
        style={styles.pdf}
        trustAllCerts={false}
        enablePaging={false}
        renderActivityIndicator={() => (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Loading PDF…</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1 },
  pdf:          { flex: 1, width: '100%', backgroundColor: '#1a1a1a' },
  loading:      { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText:  { color: '#999', fontSize: 14 },
});
