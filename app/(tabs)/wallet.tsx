import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Coffee, CreditCard, History, MapPin, ChevronRight } from 'lucide-react-native';

// Types
interface Transaction {
  id: string;
  type: 'purchase' | 'send' | 'receive' | 'redeem';
  amount: number;
  date: string;
  with?: string;
  location?: string;
  avatar?: string;
}

// Mock data
const transactions: Transaction[] = [
  {
    id: '1',
    type: 'purchase',
    amount: 5,
    date: 'Today, 10:30 AM',
  },
  {
    id: '2',
    type: 'send',
    amount: 1,
    date: 'Yesterday, 3:15 PM',
    with: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop',
  },
  {
    id: '3',
    type: 'redeem',
    amount: 1,
    date: 'May 15, 2:45 PM',
    location: 'Starbucks',
  },
  {
    id: '4',
    type: 'receive',
    amount: 2,
    date: 'May 12, 9:20 AM',
    with: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop',
  },
  {
    id: '5',
    type: 'redeem',
    amount: 1,
    date: 'May 10, 4:30 PM',
    location: 'Blue Bottle',
  },
];

export default function WalletScreen() {
  const getTransactionIcon = (transaction: Transaction) => {
    switch (transaction.type) {
      case 'purchase':
        return <CreditCard size={24} color="#6F4E37" />;
      case 'send':
        return transaction.avatar ? 
          <Image source={{ uri: transaction.avatar }} style={styles.transactionAvatar} /> : 
          <Coffee size={24} color="#6F4E37" />;
      case 'receive':
        return transaction.avatar ? 
          <Image source={{ uri: transaction.avatar }} style={styles.transactionAvatar} /> : 
          <Coffee size={24} color="#6F4E37" />;
      case 'redeem':
        return <MapPin size={24} color="#6F4E37" />;
      default:
        return <Coffee size={24} color="#6F4E37" />;
    }
  };

  const getTransactionTitle = (transaction: Transaction) => {
    switch (transaction.type) {
      case 'purchase':
        return 'Purchased Coffee';
      case 'send':
        return `Sent to ${transaction.with}`;
      case 'receive':
        return `Received from ${transaction.with}`;
      case 'redeem':
        return `Redeemed at ${transaction.location}`;
      default:
        return 'Coffee Transaction';
    }
  };

  const getTransactionAmount = (transaction: Transaction) => {
    switch (transaction.type) {
      case 'purchase':
        return `+${transaction.amount}`;
      case 'send':
        return `-${transaction.amount}`;
      case 'receive':
        return `+${transaction.amount}`;
      case 'redeem':
        return `-${transaction.amount}`;
      default:
        return `${transaction.amount}`;
    }
  };

  const getTransactionAmountColor = (transaction: Transaction) => {
    return transaction.type === 'send' || transaction.type === 'redeem' ? '#FF5252' : '#4CAF50';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Coffee Wallet</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Your Balance</Text>
          <View style={styles.balanceRow}>
            <Coffee size={32} color="#FFFFFF" />
            <Text style={styles.balanceAmount}>12</Text>
          </View>
          <TouchableOpacity style={styles.topUpButton}>
            <Text style={styles.topUpButtonText}>Top Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <Coffee size={24} color="#6F4E37" />
            </View>
            <Text style={styles.actionText}>Send</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <MapPin size={24} color="#6F4E37" />
            </View>
            <Text style={styles.actionText}>Redeem</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <History size={24} color="#6F4E37" />
            </View>
            <Text style={styles.actionText}>History</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.subscriptionCard}>
          <View style={styles.subscriptionContent}>
            <Text style={styles.subscriptionTitle}>Coffee Club</Text>
            <Text style={styles.subscriptionDescription}>Get 5 free coffees every month</Text>
            <TouchableOpacity style={styles.subscriptionButton}>
              <Text style={styles.subscriptionButtonText}>Join Now</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.subscriptionImageContainer}>
            <Coffee size={60} color="#6F4E37" strokeWidth={1} />
          </View>
        </View>

        <View style={styles.transactionsContainer}>
          <View style={styles.transactionsHeader}>
            <Text style={styles.transactionsTitle}>Recent Transactions</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <ChevronRight size={16} color="#6F4E37" />
            </TouchableOpacity>
          </View>

          {transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={styles.transactionIconContainer}>
                {getTransactionIcon(transaction)}
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionTitle}>{getTransactionTitle(transaction)}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <Text style={[styles.transactionAmount, { color: getTransactionAmountColor(transaction) }]}>
                {getTransactionAmount(transaction)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#333333',
  },
  balanceCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#6F4E37',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  balanceLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#E0D3C8',
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  balanceAmount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  topUpButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  topUpButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#6F4E37',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    width: '30%',
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  actionText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#333333',
  },
  subscriptionCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  subscriptionContent: {
    flex: 3,
  },
  subscriptionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333333',
    marginBottom: 5,
  },
  subscriptionDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
  },
  subscriptionButton: {
    backgroundColor: '#6F4E37',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  subscriptionButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  subscriptionImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transactionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  transactionsTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333333',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#6F4E37',
    marginRight: 5,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  transactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  transactionAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#333333',
  },
  transactionDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#9E9E9E',
  },
  transactionAmount: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
});