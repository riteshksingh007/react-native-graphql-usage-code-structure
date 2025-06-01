import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Switch,
} from 'react-native';
import { ProgressBar } from 'react-native-paper';
import styles from './style';
import AspireLogo from '../../assets/images/Aspire Logo.svg';
import Logo from '../../assets/images/Logo.svg';
import VisaLogo from '../../assets/images/Visa Logo.svg';
import EyeIcon from '../../assets/images/Group 2370.svg';
import TransferIcon from '../../assets/images/Transfer.svg';
import CardIcon from '../../assets/images/Transfer (1).svg';
import NewCardIcon from '../../assets/images/Transfer (3).svg';
import DeactivateIcon from '../../assets/images/Transfer (2).svg';
import Insight from '../../assets/images/insight.svg';
import DebitCardConstants from './constant';

const DebitCardScreen = () => {
  const [isLimitEnabled, setIsLimitEnabled] = useState(true);
  const [isFreezeCard, setisFreezeCard] = useState(false);

  //////Header and Balance view
  const headerBackgroundView = () => (
    <View style={styles.headerBackground}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>{DebitCardConstants.headerTitle}</Text>
        <TouchableOpacity>
          <Logo width={28} height={28} />
        </TouchableOpacity>
      </View>
      <Text style={styles.balanceLabel}>{DebitCardConstants.balanceLabel}</Text>
      <View style={styles.balanceRow}>
        <View style={styles.currencyBadge}>
          <Text style={styles.currencyText}>{DebitCardConstants.currencySymbol}</Text>
        </View>
        <Text style={styles.balanceAmount}>{DebitCardConstants.balanceAmount}</Text>
      </View>
    </View>
  );

  ///card top view, will move this as template in custom component as a reusable thing
  const cardTopView = () => (
    <View style={styles.topView}>
      {/* Hide Card Button */}
      <TouchableOpacity style={styles.hideButton}>
        <EyeIcon width={16} height={16} />
        <Text style={styles.hideText}>{DebitCardConstants.hideCardNumber}</Text>
      </TouchableOpacity>

      {/* Green Card */}
      <View style={styles.card}>
        <View style={{ flex: 1, alignSelf: 'flex-end' }}>
          <AspireLogo width={85} height={35} />
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.cardName}>{DebitCardConstants.cardHolderName}</Text>
        </View>
        <Text style={styles.cardNumber}>{DebitCardConstants.cardNumber}</Text>
        <View style={styles.cardDetailsRow}>
          <Text style={styles.cardDetails}>{DebitCardConstants.expiryLabel}</Text>
          <Text style={[styles.cardDetails, { marginLeft: 25 }]}>{DebitCardConstants.cvvLabel}</Text>
        </View>
        <View style={styles.cardBrandRow}>
          <VisaLogo width={65} height={25} />
        </View>
      </View>
    </View>
  );


  /////Spending Limit and progress bar view
  const progressBarView = () => (
    <View style={styles.progressBarMainView}>
      <View style={styles.progressBarTextView}>
        <View style={styles.limitRow}>
          <Text style={styles.spendingLabel}>{DebitCardConstants.spendingLabel}</Text>
        </View>
        <View style={styles.limitRow}>
          <Text style={styles.limitAmountGreen}>{DebitCardConstants.spendingCurrentAmount}</Text>
          <Text style={styles.limitAmountGrey}> | {DebitCardConstants.spendingTotalAmount}</Text>
        </View>
      </View>
      <View style={styles.progressBarView}>
        {/* For progress bar we will move this as a atom , also for anle cut progress between the bar we need to customize the progress bar in that will not use react native paper, this will require some more efforts */}
        <ProgressBar progress={0.069} color="#01D167" style={styles.progressBar} />
      </View>
    </View>
  );

  ////Options or action bottom view
  const bottomActionView = () => (
    <>
      {/* we can create atoms and molecules for this title, subtitle and icon for reusablibility */}
      <View style={styles.optionItem}>
        <Insight width={32} height={32} />
        <View style={styles.optionText}>
          <Text style={styles.optionTitle}>{DebitCardConstants.topUpTitle}</Text>
          <Text style={styles.optionSubtitle}>{DebitCardConstants.topUpSubtitle}</Text>
        </View>
      </View>

      <View style={styles.optionItem}>
        <TransferIcon width={32} height={32} />
        <View style={styles.optionText}>
          <Text style={styles.optionTitle}>{DebitCardConstants.spendingLimitTitle}</Text>
          <Text style={styles.optionSubtitle}>{DebitCardConstants.spendingLimitSubtitle}</Text>
        </View>
        <TouchableOpacity onPress={() => setIsLimitEnabled(!isLimitEnabled)} activeOpacity={0.8}>
          <Switch
            value={isLimitEnabled}
            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            onValueChange={() => setIsLimitEnabled(!isLimitEnabled)}
            trackColor={{ false: '#ccc', true: '#01D167' }}
            thumbColor={isLimitEnabled ? '#fff' : '#f4f3f4'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.optionItem}>
        <CardIcon width={32} height={32} />
        <View style={styles.optionText}>
          <Text style={styles.optionTitle}>{DebitCardConstants.freezeCardTitle}</Text>
          <Text style={styles.optionSubtitle}>{DebitCardConstants.freezeCardSubtitle}</Text>
        </View>
        <Switch
          value={isFreezeCard}
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
          onValueChange={() => setisFreezeCard(!isFreezeCard)}
          trackColor={{ false: '#ccc', true: '#01D167' }}
          thumbColor={isFreezeCard ? '#fff' : '#f4f3f4'}
        />
      </View>

      <View style={styles.optionItem}>
        <NewCardIcon width={32} height={32} />
        <View style={styles.optionText}>
          <Text style={styles.optionTitle}>{DebitCardConstants.newCardTitle}</Text>
          <Text style={styles.optionSubtitle}>{DebitCardConstants.newCardSubtitle}</Text>
        </View>
      </View>

      <View style={styles.optionItem}>
        <DeactivateIcon width={32} height={32} />
        <View style={styles.optionText}>
          <Text style={styles.optionTitle}>{DebitCardConstants.deactivatedCardTitle}</Text>
          <Text style={styles.optionSubtitle}>{DebitCardConstants.deactivatedCardSubtitle}</Text>
        </View>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      {headerBackgroundView()}
      <View style={styles.absoluteScrollWrapper}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={[styles.scrollContent, { minHeight: Dimensions.get('window').height }]}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            {cardTopView()}
            <View style={styles.contentView}>
              <View style={styles.fillerView} />
              {progressBarView()}
              {bottomActionView()}
              <View style={[styles.bottomEmptyView]} />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DebitCardScreen;
