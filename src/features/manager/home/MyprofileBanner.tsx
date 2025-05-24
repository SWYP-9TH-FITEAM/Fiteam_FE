import charactersHiddenIcon from '@/assets/images/charactersHide.png';
import Block from '@/pages/manager/components/Block';

const MyprofileBanner = () => {
  return (
    <Block>
      <div className="flex">
        <div className="flex flex-1 flex-col text-left">
          <header>
            <h2 className="mb-4 text-[28px] leading-9 font-semibold not-italic">
              내 프로필
            </h2>
          </header>
          <div>
            <p className="text-gray-6 text-2xl leading-8 font-semibold not-italic">
              아직 테스트를 하지 않으셨네요.
              <br />
              내 프로필은 성향 테스트 후에 만들 수 있어요!
              <br />
              테스트 하러 가시겠어요?
            </p>
          </div>
          <button className="bg-primary mt-auto inline-flex h-[52px] w-[296px] items-center justify-center rounded-md px-10 py-0 text-white">
            테스트하고 내 성향 파악하기
          </button>
        </div>
        <div>
          <img
            src={charactersHiddenIcon}
            alt="테스트하기"
            className="h-[258px]"
          />
        </div>
      </div>
    </Block>
  );
};

export default MyprofileBanner;
