export const dummyData = [
  {
    chatRoomId: 1,
    userId: 1,
    otherUserId: 2,
    otherUserName: '김고양이',
    otherUserProfileImgUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
    lastMessageContent: '안녕하세요! 관심 있어서 연락드립니다.',
    unreadMessageCount: 3,
    lastMessageTime: '2025-05-01T14:10:00',
  },
  {
    chatRoomId: 2,
    userId: 1,
    otherUserId: 3,
    otherUserName: '박강아지',
    otherUserProfileImgUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    lastMessageContent: '다음 미팅 일정 확인해주세요.',
    unreadMessageCount: 1,
    lastMessageTime: '2025-05-01T13:30:00',
  },
  {
    chatRoomId: 3,
    userId: 1,
    otherUserId: 4,
    otherUserName: '김와마 디자인',
    otherUserProfileImgUrl: 'https://randomuser.me/api/portraits/women/3.jpg',
    lastMessageContent: '전 좋아요 ~!',
    unreadMessageCount: 0,
    lastMessageTime: '2025-05-01T11:20:00',
  },
  {
    chatRoomId: 4,
    userId: 1,
    otherUserId: 5,
    otherUserName: '이토끼',
    otherUserProfileImgUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
    lastMessageContent: '프로젝트 진행 상황 공유드립니다.',
    unreadMessageCount: 0,
    lastMessageTime: '2025-04-30T16:45:00',
  },
  {
    chatRoomId: 5,
    userId: 1,
    otherUserId: 6,
    otherUserName: '오소라',
    otherUserProfileImgUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
    lastMessageContent: '오늘 미팅 준비 완료!',
    unreadMessageCount: 0,
    lastMessageTime: '2025-04-30T16:45:00',
  },
  {
    chatRoomId: 6,
    userId: 1,
    otherUserId: 7,
    otherUserName: '박소라',
    otherUserProfileImgUrl: 'https://randomuser.me/api/portraits/men/6.jpg',
    lastMessageContent: '오늘 미팅 준비 완료!',
    unreadMessageCount: 0,
    lastMessageTime: '2025-04-30T16:45:00',
  },
  {
    chatRoomId: 7,
    userId: 1,
    otherUserId: 8,
    otherUserName: '최고양이',
    otherUserProfileImgUrl: 'https://randomuser.me/api/portraits/women/7.jpg',
    lastMessageContent: '오늘 미팅 준비 완료!',
    unreadMessageCount: 0,
    lastMessageTime: '2025-04-30T16:45:00',
  },
  {
    chatRoomId: 8,
    userId: 1,
    otherUserId: 9,
    otherUserName: '김강아지',
    otherUserProfileImgUrl: 'https://randomuser.me/api/portraits/men/8.jpg',
    lastMessageContent: '오늘 미팅 준비 완료!',
    unreadMessageCount: 0,
    lastMessageTime: '2025-04-30T16:45:00',
  },
  {
    chatRoomId: 9,
    userId: 1,
    otherUserId: 10,
    otherUserName: '박고양이',
    otherUserProfileImgUrl: 'https://randomuser.me/api/portraits/women/9.jpg',
    lastMessageContent: '오늘 미팅 준비 완료!',
    unreadMessageCount: 0,
    lastMessageTime: '2025-04-30T16:45:00',
  },
  {
    chatRoomId: 10,
    userId: 1,
    otherUserId: 11,
    otherUserName: '이강아지',
    otherUserProfileImgUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
    lastMessageContent: '오늘 미팅 준비 완료!',
    unreadMessageCount: 0,
    lastMessageTime: '2025-04-30T16:45:00',
  },
];

export const dummyChatMessages = [
  {
    id: 3,
    chatRoomId: 1,
    senderId: 4,
    messageType: 'TEXT',
    content: '안녕하세요!',
    isRead: false,
    sentAt: '2025-05-10T06:48:56.000+00:00',
  },
  {
    id: 4,
    chatRoomId: 1,
    senderId: 3,
    messageType: 'TEXT',
    content: '다음 미팅 일정 확인해주세요.',
    isRead: true,
    sentAt: '2025-05-01T13:30:00.000+00:00',
  },
  {
    id: 5,
    chatRoomId: 1,
    senderId: 1,
    messageType: 'TEXT',
    content: '다음 미팅 일정 확인해주세요.',
    isRead: true,
    sentAt: '2025-05-01T13:30:00.000+00:00',
  },
  {
    id: 6,
    chatRoomId: 1,
    senderId: 3,
    messageType: 'TEXT',
    content: '다음 미팅 일정 확인해주세요.',
    isRead: false,
    sentAt: '2025-04-30T16:45:00.000+00:00',
  },
  {
    id: 7,
    chatRoomId: 1,
    senderId: 3,
    messageType: 'TEXT',
    content: '오늘 미팅 준비 완료!',
    isRead: true,
    sentAt: '2025-04-30T16:45:00.000+00:00',
  },
  {
    id: 8,
    chatRoomId: 1,
    senderId: 3,
    messageType: 'TEXT',
    content: '전 좋아요 ~!',
    isRead: false,
    sentAt: '2025-05-01T11:20:00.000+00:00',
  },
  {
    id: 9,
    chatRoomId: 1,
    senderId: 1,
    messageType: 'TEAM_REQUEST',
    content: '박소라님이 팀 제안을 보냈습니다!',
    isRead: false,
    sentAt: '2025-05-01T09:00:00.000+00:00',
  },
  {
    id: 10,
    chatRoomId: 1,
    senderId: 3,
    messageType: 'TEAM_RESPONSE',
    content: '나님이 팀 제안을 수락했습니다!',
    isRead: false,
    sentAt: '2025-05-01T09:00:00.000+00:00',
  },
];
