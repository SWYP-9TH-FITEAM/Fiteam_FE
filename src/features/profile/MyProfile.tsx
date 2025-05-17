import {userQueries} from '@/entities/user/api';
import {CharacterCard} from '@/features/profile/CharacterCard';
import {useQuery} from '@tanstack/react-query';
import {ReactNode} from 'react';
import {useNavigate} from 'react-router-dom';
import MyProfileEmpty from './MyProfileEmpty';
import {memberQueries} from '@/entities/member/api';
import {useCurrentGroupId} from '@/shared/model/group-id';
import {GroupDrawer} from '../../shared/ui/GroupDrawer';

export const SectionInfo = ({children}: {children: ReactNode}) => {
  return (
    <div className="bg-white rounded-[20px] px-[18px] py-3">{children}</div>
  );
};

export interface SectionProps {
  title?: string;
  children?: ReactNode;
  rightContent?: ReactNode;
}

export const Section2 = ({title, children}: Partial<SectionProps>) => {
  return (
    <div className="bg-white rounded-[20px] p-[13px] text-left">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium text-black">{title}</h3>
      </div>
      {children}
    </div>
  );
};

// 정보 행 컴포넌트
export const InfoRow = ({label, content}: {label: string; content: string}) => {
  return (
    <div className="flex mb-2 last:mb-0">
      <div className="w-20 text-left font-medium">{label}</div>
      <div className="flex-1 text-left">{content}</div>
    </div>
  );
};

// 성향카드 컴포넌트

const MyProfile = () => {
  const navigate = useNavigate();
  const currentGroupId = useCurrentGroupId();

  const {data: userCardData} = useQuery(userQueries.card());
  const {data: acceptedGroupsData} = useQuery(userQueries.groupsAccepted());
  const {data: groupProfileMiniData} = useQuery({
    ...memberQueries.myProfileMini(currentGroupId ?? 0),
    enabled: currentGroupId !== null,
  });
  const {data: myProfileData} = useQuery({
    ...memberQueries.myProfile(currentGroupId ?? 0),
    enabled: currentGroupId !== null,
  });

  if (!userCardData) return <div>로딩 중...</div>;

  if (acceptedGroupsData?.length === 0) {
    return <MyProfileEmpty userCardData={userCardData} />;
  }

  if (!groupProfileMiniData?.position) {
    return (
      <div className="pt-1.5 pb-3.5 flex flex-col gap-[13px]">
        <GroupDrawer />
        <MyProfileEmpty userCardData={userCardData} isInGroup={true} />
      </div>
    );
  }

  const keywords = userCardData?.keyword?.split(',').map(k => k.trim()) ?? [];

  return (
    <div className="pt-1.5 pb-3.5 flex flex-col gap-[13px]">
      <GroupDrawer />
      {/* 성향 카드 */}
      <CharacterCard
        name={userCardData.name}
        score={{
          ei: userCardData.ei,
          pd: userCardData.pd,
          cl: userCardData.cl,
          va: userCardData.va,
        }}
        tags={{
          topLeft: keywords[0] || '',
          topRight: keywords[1] || '',
          bottomLeft: keywords[2] || '',
        }}
      />

      <SectionInfo>
        <InfoRow label="직무" content={myProfileData?.position ?? ''} />
        <InfoRow label="경력" content={String(myProfileData?.workHistory)} />
        <InfoRow label="목표" content={myProfileData?.projectGoal ?? ''} />
        <InfoRow label="목적" content={myProfileData?.projectPurpose ?? ''} />
      </SectionInfo>

      <Section2 title="포트폴리오">
        {myProfileData?.url && (
          <a href={myProfileData.url} target="_blank" rel="noopener noreferrer">
            {myProfileData.url}
          </a>
        )}
      </Section2>
      <Section2 title="자기소개서">{myProfileData?.introduction}</Section2>

      {/* 수정하기 버튼 */}
      <div className="mt-6 mb-8">
        <button
          className="w-full py-3 bg-gray-400 text-white rounded-lg font-medium"
          onClick={() => navigate('/profile/edit')}
        >
          수정하기
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
