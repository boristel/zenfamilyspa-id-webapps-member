import React from 'react';
import { View, Text, TouchableOpacity, Modal as RNModal, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { X } from 'lucide-react-native';

interface QRCodeModalProps {
    visible: boolean;
    onClose: () => void;
    uid: string;
    userName?: string;
}

export default function QRCodeModal({ visible, onClose, uid, userName }: QRCodeModalProps) {
    return (
        <RNModal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {/* Close button */}
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.closeButton}
                    >
                        <X color="#4A5568" size={24} />
                    </TouchableOpacity>

                    {/* Header */}
                    <Text style={styles.title}>Member QR Code</Text>
                    {userName && (
                        <Text style={styles.subtitle}>{userName}</Text>
                    )}

                    {/* QR Code */}
                    <View style={styles.qrContainer}>
                        <QRCode
                            value={uid}
                            size={280}
                            backgroundColor="white"
                            color="#2D3748"
                        />
                    </View>

                    {/* Instructions */}
                    <Text style={styles.instructions}>
                        Show this QR code to spa staff for check-in
                    </Text>
                </View>
            </View>
        </RNModal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 32,
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2D3748',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#718096',
        marginBottom: 24,
    },
    qrContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    instructions: {
        marginTop: 24,
        fontSize: 14,
        color: '#718096',
        textAlign: 'center',
    },
});
