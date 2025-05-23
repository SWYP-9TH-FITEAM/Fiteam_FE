import * as React from 'react';
import {useQueries} from '@tanstack/react-query';
import {ChevronLeft} from 'lucide-react';
import {useNavigate, useParams} from 'react-router-dom';

import chatIcon from '@/assets/icons/chat.svg';
import {postCreateChatRoom} from '@/entities/chat/api/user-chat/create-room';
import {memberQueries} from '@/entities/member/api';
import {CharacterCard} from '@/features/profile/CharacterCard';
import {InfoRow, Section2, SectionInfo} from '@/features/profile/MyProfile';
import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';
import {useCardIdMap} from '@/shared/model/card-id-map';
import {useSetChatRoomId} from '@/shared/model/chat-room';
import {useCurrentGroupId} from '@/shared/model/group-id';
import {LikeButton} from './LikeButton';

export const OtherProfile: React.FC = () => {
  const {memberId} = useParams<{memberId: string}>();

  const isNotValidMemberId = !memberId || isNaN(Number(memberId));

  const parsedMemberId = isNotValidMemberId ? 0 : Number(memberId);

  const navigate = useNavigate();

  const cardData = useCardIdMap();

  const currentGroupId = useCurrentGroupId();

  const setChatRoomId = useSetChatRoomId();

  const {
    data: [{data: profile}, {data: members}],
  } = useQueries({
    queries: [
      {
        ...memberQueries.profileByMemberId(parsedMemberId),
        enabled: !isNotValidMemberId,
      },
      {
        ...memberQueries.membersByGroupId(currentGroupId ?? -1),
        enabled: !!currentGroupId,
      },
    ],
    combine: data => {
      return {
        data,
        loading: data.some(data => data.isLoading),
      };
    },
  });

  const keywords = React.useMemo(() => {
    if (cardData.state !== 'hasData' || !profile) return [];
    return cardData.data.get(profile.cardId)?.keyword?.split(',') || [];
  }, [cardData, profile]);

  React.useEffect(() => {
    if (isNotValidMemberId || profile?.position === null) {
      navigate('/profile');
    }
  }, [profile, isNotValidMemberId, navigate]);

  const targetMember = React.useMemo(() => {
    if (!currentGroupId || !members) return null;
    return members.find(member => member.memberId === parsedMemberId);
  }, [members, currentGroupId, parsedMemberId]);

  const handleCreateChatRoom = () => {
    if (!targetMember || !currentGroupId) return;
    postCreateChatRoom({
      receiverId: targetMember.userId,
      groupId: currentGroupId,
    }).then(response => {
      setChatRoomId(Number(response.chatRoomId));
      navigate('/chat');
    });
  };

  return (
    <LayoutBottomBar
      hideBottomBar
      classNames={{wrapper: 'bg-[#f6f6f6]'}}
      header={
        <header className="flex items-center gap-2.5 px-3 py-2.5">
          <button onClick={() => navigate(-1)}>
            <ChevronLeft className="h-6 w-6 stroke-[1.5]" />
          </button>
          <span className="text-xl font-semibold tracking-[-0.5px]">
            프로필
          </span>
          {targetMember && (
            <div className="ml-auto flex items-center gap-2">
              <LikeButton
                className="bg-transparent"
                likeId={targetMember.likeId}
                userId={targetMember.userId}
              />
              <button
                onClick={handleCreateChatRoom}
                className="flex h-6 w-6 items-center justify-center rounded-full"
              >
                <img src={chatIcon} alt="Message icon" className="h-4 w-4" />
              </button>
            </div>
          )}
        </header>
      }
    >
      {(!profile || cardData.state === 'loading') && (
        <div className="loading loading-spinner loading-xl" />
      )}
      {profile && cardData.state === 'hasData' && (
        <div className="flex flex-col gap-[13px] pt-1.5 pb-3.5">
          {/* 성향 카드 */}
          <CharacterCard
            name={cardData.data.get(profile.cardId)?.name ?? ''}
            score={{
              ei: profile.numEI,
              pd: profile.numPD,
              cl: profile.numCL,
              va: profile.numVA,
            }}
            tags={{
              topLeft: keywords[0] || '',
              topRight: keywords[1] || '',
              bottomLeft: keywords[2] || '',
            }}
          />

          <SectionInfo>
            <InfoRow label="직무" content={profile.position ?? ''} />
            <InfoRow label="경력" content={String(profile?.workHistory)} />
            <InfoRow label="목표" content={profile.projectGoal ?? ''} />
            <InfoRow label="목적" content={profile.projectPurpose ?? ''} />
          </SectionInfo>

          <Section2 title="포트폴리오">
            {profile.url && (
              <a href={profile.url} target="_blank" rel="noopener noreferrer">
                {profile.url}
              </a>
            )}
          </Section2>
          <Section2 title="자기소개서">{profile.introduction}</Section2>
        </div>
      )}
    </LayoutBottomBar>
  );
};
