import {userQueries} from '@/entities/user/api';
import {CharacterCard} from '@/features/profile/CharacterCard';
import {useQuery} from '@tanstack/react-query';
import {ReactNode} from 'react';
import {useNavigate} from 'react-router-dom';
import MyProfileEmpty from './MyProfileEmpty';
import {memberQueries} from '@/entities/member/api';

const SectionInfo = ({children}: {children: ReactNode}) => {
  return (
    <div className="bg-white rounded-[20px] px-[18px] py-3">{children}</div>
  );
};

export interface SectionProps {
  title?: string;
  children?: ReactNode;
  rightContent?: ReactNode;
}

const Section2 = ({title, children}: Partial<SectionProps>) => {
  return (
    <div className="bg-white rounded-[20px] p-[13px]">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-medium text-black">{title}</h3>
      </div>
      {children}
    </div>
  );
};

// 정보 행 컴포넌트
const InfoRow = ({label, content}: {label: string; content: string}) => {
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
  const groupId = 1; // TODO:: localStorage

  const {data: userCardData} = useQuery(userQueries.card());
  const {data: acceptedGroupsData} = useQuery(userQueries.groupsAccepted());
  const {data: groupProfileMiniData} = useQuery(
    memberQueries.myProfileMini(groupId),
  );

  if (!userCardData) return <div>로딩 중...</div>;

  if (acceptedGroupsData?.length === 0) {
    return <MyProfileEmpty userCardData={userCardData} />;
  }

  if (!groupProfileMiniData?.position) {
    return (
      <div className="pt-1.5 pb-3.5 flex flex-col gap-[13px]">
        {/* TODO:: 그룹명들 드롭다운 */}
        <MyProfileEmpty userCardData={userCardData} isInGroup={true} />
      </div>
    );
  }

  return (
    <div className="pt-1.5 pb-3.5 flex flex-col gap-[13px]">
      {/* TODO 드롭다운 */}
      {acceptedGroupsData?.map(group => (
        <div key={group.groupId}>{group.groupName}</div>
      ))}
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
          topLeft: '검소한',
          topRight: '배려만땅',
          bottomLeft: '친절한',
        }}
      />

      <SectionInfo>
        <InfoRow label="직무" content="PM" />
        <InfoRow label="경력" content="10년" />
        <InfoRow label="목표" content="최고의 PM이 되는 것" />
        <div className="flex mb-2 last:mb-0">
          <div className="w-20 text-left font-medium">목적</div>
          <div className="flex-1 bg-gray-100 p-4 rounded-lg"></div>
        </div>
      </SectionInfo>

      <Section2 title="포트폴리오"></Section2>
      <Section2 title="자기소개서"></Section2>

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
