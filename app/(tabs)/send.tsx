import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, X, Coffee, ArrowRight } from 'lucide-react-native';

// Types
interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
  recent?: boolean;
}

// Mock data
const friends: Friend[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    username: '@sarahj',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop',
    recent: true
  },
  {
    id: '2',
    name: 'Michael Chen',
    username: '@mikechen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&h=100&auto=format&fit=crop',
    recent: true
  },
  {
    id: '3',
    name: 'Emma Wilson',
    username: '@emmaw',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop',
    recent: true
  },
  {
    id: '4',
    name: 'David Kim',
    username: '@davidk',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&h=100&auto=format&fit=crop',
  },
  {
    id: '5',
    name: 'Olivia Martinez',
    username: '@oliviam',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&h=100&auto=format&fit=crop',
  },
  {
    id: '6',
    name: 'James Wilson',
    username: '@jamesw',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&h=100&auto=format&fit=crop',
  },
];

export default function SendScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [coffeeAmount, setCoffeeAmount] = useState(1);
  const [message, setMessage] = useState('');

  const recentFriends = friends.filter(friend => friend.recent);
  
  const filteredFriends = searchQuery 
    ? friends.filter(friend => 
        friend.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        friend.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : friends;

  const handleSelectFriend = (friend: Friend) => {
    setSelectedFriend(friend);
  };

  const handleClearSelection = () => {
    setSelectedFriend(null);
    setCoffeeAmount(1);
    setMessage('');
  };

  const handleIncreaseCoffee = () => {
    if (coffeeAmount < 10) {
      setCoffeeAmount(coffeeAmount + 1);
    }
  };

  const handleDecreaseCoffee = () => {
    if (coffeeAmount > 1) {
      setCoffeeAmount(coffeeAmount - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Send Coffee</Text>
      </View>

      {!selectedFriend ? (
        <>
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <Search size={20} color="#9E9E9E" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search friends..."
                placeholderTextColor="#9E9E9E"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <X size={18} color="#9E9E9E" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {recentFriends.length > 0 && !searchQuery && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recent</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentList}>
                {recentFriends.map((friend) => (
                  <TouchableOpacity 
                    key={friend.id} 
                    style={styles.recentFriend}
                    onPress={() => handleSelectFriend(friend)}
                  >
                    <Image source={{ uri: friend.avatar }} style={styles.recentAvatar} />
                    <Text style={styles.recentName}>{friend.name.split(' ')[0]}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>All Friends</Text>
            <FlatList
              data={filteredFriends}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.friendItem}
                  onPress={() => handleSelectFriend(item)}
                >
                  <Image source={{ uri: item.avatar }} style={styles.avatar} />
                  <View style={styles.friendInfo}>
                    <Text style={styles.friendName}>{item.name}</Text>
                    <Text style={styles.friendUsername}>{item.username}</Text>
                  </View>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              contentContainerStyle={styles.friendsList}
            />
          </View>
        </>
      ) : (
        <ScrollView style={styles.sendContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleClearSelection}>
            <X size={24} color="#333333" />
          </TouchableOpacity>
          
          <View style={styles.recipientCard}>
            <Image source={{ uri: selectedFriend.avatar }} style={styles.recipientAvatar} />
            <Text style={styles.recipientName}>{selectedFriend.name}</Text>
            <Text style={styles.recipientUsername}>{selectedFriend.username}</Text>
          </View>
          
          <View style={styles.coffeeSelector}>
            <Text style={styles.selectorLabel}>How many coffees?</Text>
            <View style={styles.counterContainer}>
              <TouchableOpacity 
                style={[styles.counterButton, coffeeAmount <= 1 && styles.counterButtonDisabled]} 
                onPress={handleDecreaseCoffee}
                disabled={coffeeAmount <= 1}
              >
                <Text style={styles.counterButtonText}>-</Text>
              </TouchableOpacity>
              
              <View style={styles.coffeeCounter}>
                <Coffee size={24} color="#6F4E37" />
                <Text style={styles.coffeeCount}>{coffeeAmount}</Text>
              </View>
              
              <TouchableOpacity 
                style={[styles.counterButton, coffeeAmount >= 10 && styles.counterButtonDisabled]} 
                onPress={handleIncreaseCoffee}
                disabled={coffeeAmount >= 10}
              >
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.messageContainer}>
            <Text style={styles.messageLabel}>Add a message (optional)</Text>
            <TextInput
              style={styles.messageInput}
              placeholder="Write a note..."
              placeholderTextColor="#9E9E9E"
              multiline
              maxLength={100}
              value={message}
              onChangeText={setMessage}
            />
            <Text style={styles.charCount}>{message.length}/100</Text>
          </View>
          
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Sending</Text>
              <Text style={styles.summaryValue}>{coffeeAmount} Coffee{coffeeAmount > 1 ? 's' : ''}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>To</Text>
              <Text style={styles.summaryValue}>{selectedFriend.name}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Your Balance After</Text>
              <Text style={styles.summaryValue}>{12 - coffeeAmount} Coffee{12 - coffeeAmount !== 1 ? 's' : ''}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send Coffee</Text>
            <ArrowRight size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </ScrollView>
      )}
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
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333333',
    marginLeft: 10,
    padding: 0,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333333',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  recentList: {
    paddingLeft: 20,
  },
  recentFriend: {
    alignItems: 'center',
    marginRight: 20,
  },
  recentAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  recentName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#333333',
  },
  friendsList: {
    paddingHorizontal: 20,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  friendInfo: {
    marginLeft: 15,
  },
  friendName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333333',
  },
  friendUsername: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#9E9E9E',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  sendContainer: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  recipientCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 20,
  },
  recipientAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  recipientName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333333',
  },
  recipientUsername: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#9E9E9E',
  },
  coffeeSelector: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 20,
  },
  selectorLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 15,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  counterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterButtonDisabled: {
    opacity: 0.5,
  },
  counterButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#6F4E37',
  },
  coffeeCounter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coffeeCount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#6F4E37',
    marginLeft: 10,
  },
  messageContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 20,
  },
  messageLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 15,
  },
  messageInput: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333333',
    minHeight: 80,
    textAlignVertical: 'top',
  },
  charCount: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#9E9E9E',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  summaryContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 20,
  },
  summaryTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333333',
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666666',
  },
  summaryValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#333333',
  },
  sendButton: {
    flexDirection: 'row',
    backgroundColor: '#6F4E37',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  sendButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 10,
  },
});