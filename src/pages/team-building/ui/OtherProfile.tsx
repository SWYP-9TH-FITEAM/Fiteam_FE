import {memberQueries} from '@/entities/member/api';
import {CharacterCard} from '@/features/profile/CharacterCard';
import {InfoRow, Section2, SectionInfo} from '@/features/profile/MyProfile';
import {LayoutBottomBar} from '@/layouts/LayoutBottomBar';
import {useCardIdMap} from '@/shared/model/card-id-map';
import {useQuery} from '@tanstack/react-query';

import * as React from 'react';
import {useNavigate, useParams} from 'react-router-dom';

export const OtherProfile: React.FC = () => {
  const {memberId} = useParams<{memberId: string}>();

  const isNotValidMemberId = !memberId || isNaN(Number(memberId));

  const parsedMemberId = isNotValidMemberId ? 0 : Number(memberId);

  const navigate = useNavigate();

  const cardData = useCardIdMap();

  const {data: profile} = useQuery({
    ...memberQueries.profileByMemberId(parsedMemberId),
    enabled: !isNotValidMemberId,
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

  return (
    <LayoutBottomBar
      classNames={{wrapper: 'bg-[#f6f6f6]'}}
      header={
        <header className="sticky top-0 z-10 h-12 px-4 py-3 text-center font-semibold text-lg">
          나의 프로필
        </header>
      }
    >
      {(!profile || cardData.state === 'loading') && (
        <div className="loading loading-spinner loading-xl" />
      )}
      {profile && cardData.state === 'hasData' && (
        <div className="pt-1.5 pb-3.5 flex flex-col gap-[13px]">
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
