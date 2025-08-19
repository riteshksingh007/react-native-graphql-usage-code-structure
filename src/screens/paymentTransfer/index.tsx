import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    Switch,
    Alert,
    Modal,
    SafeAreaView,
    Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';
import { AppConstants, ValidationConstants } from './constant';
import { PaymentForm } from './interface';
import { LabelWithIcon, ButtonWithIcon, LabelValueRowText } from '../../customComponents/Atoms';
import HeadingWithInput from '../../customComponents/Molecules/HeadingWithInput';

const PaymentTransfer: React.FC = () => {
    const [isInternational, setIsInternational] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const animatedHeight = useRef(new Animated.Value(0)).current;

    const [form, setForm] = useState<PaymentForm>({
        recipientName: '',
        accountNumber: '',
        amount: '',
        iban: '',
        swift: '',
    });

    const handleChange = (field: keyof PaymentForm, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    useEffect(() => {
        ///added some smooth transition for the international toggle view
        Animated.timing(animatedHeight, {
            toValue: isInternational ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [isInternational]);

    useEffect(() => {
        // Countdown logic for success modal, it will close after 3 seconds
        let timer: ReturnType<typeof setInterval>;
        if (showSuccess) {
            setCountdown(3);
            timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev === 1) {
                        clearInterval(timer);
                        setShowSuccess(false);
                        resetForm();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [showSuccess]);

    /// Function to reset the form fields
    const resetForm = () => {
        setForm({ recipientName: '', accountNumber: '', amount: '', iban: '', swift: '' });
        setIsInternational(false);
    };

    /// Function to validate the form fields
    const validateForm = (): boolean => {
        if (!ValidationConstants.regex.name.test(form.recipientName)) {
            Alert.alert('Validation Error', ValidationConstants.errors.name);
            return false;
        }
        if (!ValidationConstants.regex.account.test(form.accountNumber)) {
            Alert.alert('Validation Error', ValidationConstants.errors.account);
            return false;
        }
        if (!ValidationConstants.regex.amount.test(form.amount)) {
            Alert.alert('Validation Error', ValidationConstants.errors.amount);
            return false;
        }
        if (isInternational) {
            if (!ValidationConstants.regex.iban.test(form.iban)) {
                Alert.alert('Validation Error', ValidationConstants.errors.iban);
                return false;
            }
            if (!ValidationConstants.regex.swift.test(form.swift)) {
                Alert.alert('Validation Error', ValidationConstants.errors.swift);
                return false;
            }
        }
        return true;
    };

    /// Function to handle the form submission
    const handleSubmit = () => {
        if (!validateForm()) return;
        Alert.alert(
            AppConstants.labels.confirmPayment,
            `${AppConstants.labels.confirmMessage}${form.amount}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Confirm', onPress: () => setShowSuccess(true) },
            ]
        );
    };

    const totalAmount = form.amount ? Number(form.amount) : 0;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
                <View style={styles.cardContainer}>
                    <HeadingWithInput
                        label={AppConstants.labels.recipientName}
                        icon="person-outline"
                        placeholder={AppConstants.placeholders.recipientName}
                        value={form.recipientName}
                        onChangeText={(val) => handleChange('recipientName', val)}
                    />
                    <HeadingWithInput
                        label={AppConstants.labels.accountNumber}
                        icon="card-outline"
                        placeholder={AppConstants.placeholders.accountNumber}
                        keyboardType="numeric"
                        value={form.accountNumber}
                        onChangeText={(val) => handleChange('accountNumber', val)}
                    />
                    <HeadingWithInput
                        label={AppConstants.labels.amount}
                        icon="cash-outline"
                        placeholder={AppConstants.placeholders.amount}
                        keyboardType="numeric"
                        value={form.amount}
                        onChangeText={(val) => handleChange('amount', val)}
                    />

                    <View style={styles.toggleRow}>
                        <LabelWithIcon icon="globe-outline" label={AppConstants.labels.international} />
                        <Switch
                            value={isInternational}
                            onValueChange={setIsInternational}
                            trackColor={{ false: '#ccc', true: 'tomato' }}
                            thumbColor="#fff"
                        />
                    </View>

                    <Animated.View
                        style={{
                            overflow: 'hidden',
                            height: animatedHeight.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 180],
                            }),
                        }}
                    >
                        {isInternational && (
                            <>
                                <HeadingWithInput
                                    label={AppConstants.labels.iban}
                                    icon="id-card-outline"
                                    placeholder={AppConstants.placeholders.iban}
                                    value={form.iban}
                                    onChangeText={(val) => handleChange('iban', val)}
                                    maxLength={34}
                                />
                                <HeadingWithInput
                                    label={AppConstants.labels.swift}
                                    icon="swap-horizontal-outline"
                                    placeholder={AppConstants.placeholders.swift}
                                    value={form.swift}
                                    onChangeText={(val) => handleChange('swift', val)}
                                />
                            </>
                        )}
                    </Animated.View>

                    <ButtonWithIcon
                        icon="paper-plane"
                        label={AppConstants.labels.sendPayment}
                        onPress={handleSubmit}
                    />

                    <View style={styles.summaryBox}>
                        <LabelValueRowText label="Total" value={`£${totalAmount.toFixed(2)}`} />
                    </View>
                </View>
            </ScrollView>

            <Modal visible={showSuccess} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                            <Ionicons
                                name="checkmark-circle"
                                size={22}
                                color="#4BB543"
                            />
                            <Text style={styles.modalTitle}>{AppConstants.labels.modalTitle}</Text>
                        </View>
                        <Text style={styles.modalMessage}>
                            {AppConstants.labels.modalMessage.replace(
                                'has been sent',
                                `of £${form.amount} has been sent`
                            )}
                        </Text>
                        <Text style={[styles.modalMessage, { fontWeight: '700' }]}>
                            {AppConstants.labels.modalClosing} {countdown}...
                        </Text>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default PaymentTransfer;
