interface ChartBarProps {
  label: string;
  value: number; // 0-10 사이 값
  rightLabel: string;
}

const ChartBar = ({label, value, rightLabel}: ChartBarProps) => {
  const percentage = (value / 75) * 100;
  const isLessThanHalf = percentage <= 50;
  const activeStyle =
    'text-[#111] text-[13px] not-italic font-medium leading-4 tracking-[-0.325px]';
  const inactiveStyle =
    'text-[#979797] text-[13px] not-italic font-medium leading-4 tracking-[-0.325px]';

  const gradientStyle = {
    background:
      'linear-gradient(90deg, #9182FF 0%, #5F4AFF 58.51%, #4432CE 169.03%)',
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <div className={isLessThanHalf ? inactiveStyle : activeStyle}>
          {label}
        </div>
        <div className="flex-1 mx-3">
          <div className="w-full h-2.5 bg-gray-200 rounded-full">
            <div
              className="h-full rounded-full"
              style={{
                width: `${percentage}%`,
                ...gradientStyle,
              }}
            ></div>
          </div>
        </div>
        <div className={isLessThanHalf ? activeStyle : inactiveStyle}>
          {rightLabel}
        </div>
      </div>
    </div>
  );
};

// 섹션 컴포넌트

interface CharacterCardProps {
  name: string;
  score?: {
    ei: number;
    pd: number;
    cl: number;
    va: number;
  };
  tags: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
  };
}

const PersonalityTag = ({
  text,
  position,
}: {
  text: string;
  position: 'topLeft' | 'topRight' | 'bottomLeft';
}) => {
  let positionClass = '';

  switch (position) {
    case 'topLeft':
      positionClass = 'absolute top-2 -left-20';
      break;
    case 'topRight':
      positionClass = 'absolute top-12 -right-30';
      break;
    case 'bottomLeft':
      positionClass = 'absolute bottom-6 -left-12';
      break;
  }

  return (
    <div
      className={`${positionClass} flex w-[97px] h-[31px] justify-center items-center gap-2.5 shrink-0 bg-white shadow-[0px_0px_2px_0px_#9A9A9A] rounded-lg text-gray-dark text-center text-lg font-medium`}
    >
      {text}
    </div>
  );
};

export const CharacterCard = ({name, score, tags}: CharacterCardProps) => {
  const {ei = 0, pd = 0, cl = 0, va = 0} = score ?? {};

  return (
    <>
      <div
        className="w-full bg-primary-light rounded-[20px] border-2 border-solid border-[#5F4AFF] p-[13px]
bg-[linear-gradient(0deg,#F1F2FB_0%,#F1F2FB_100%),linear-gradient(187deg,#FFF_0.79%,rgba(255,255,255,0.00)_69.96%)]
        "
      >
        <h3 className="text-left text-xl font-medium text-black">나의 성향</h3>
        <div className="flex flex-col items-center justify-center mb-[11px]">
          <div className="relative w-[120px] h-[200px]">
            <div className="absolute top-[10px] left-[20px] w-[150px] h-[150px] bg-white rounded-full " />
            <img
              src="/src/assets/images/robot.png"
              alt="로봇 캐릭터"
              className="absolute top-0 left-0 w-[120px] h-[120px] object-contain z-20"
            />

            <PersonalityTag text={tags.topLeft} position="topLeft" />
            <PersonalityTag text={tags.topRight} position="topRight" />
            <PersonalityTag text={tags.bottomLeft} position="bottomLeft" />
          </div>

          <h3 className="text-[#111] text-center text-[28px] not-italic font-semibold leading-9 tracking-[-0.7px]">
            {name}
          </h3>
        </div>

        {score && (
          <div className="h-[142px] bg-gray-50 p-4 rounded-xl flex flex-col justify-between">
            <ChartBar label="외향형" value={ei} rightLabel="내향형" />
            <ChartBar label="계획형" value={pd} rightLabel="실행형" />
            <ChartBar label="창의형" value={cl} rightLabel="분석형" />
            <ChartBar label="조율형" value={va} rightLabel="주도형" />
          </div>
        )}
        {/* </Section> */}
      </div>
    </>
  );
};
