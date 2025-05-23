import type {InitialGroupInfo} from '../model/form';
import type {Step} from '../model/step';

import * as React from 'react';
import {useNavigate} from 'react-router-dom';

import ManagerHeader from '@/features/manager/layouts/ManagerHeader';
import LeftMenu from '@/pages/manager-team-building/ui/LeftMenu';
import {Footer} from '@/shared/ui/desktop/Footer';
import {Main} from '@/shared/ui/desktop/Main';
import {STEP} from '../model/step';
import {ConfirmAndCreate} from './ConfirmAndCreate';
import {SetCondition} from './SetCondition';
import {SetInfo} from './SetInfo';
import {StepBar} from './StepBar';

export const CreateGroup: React.FC = () => {
  const [groupInfo, setGroupInfo] = React.useState<InitialGroupInfo>({
    memberCountPerPosition: [{position: '', count: 1}],
    startDatetime: new Date().toISOString(),
    endDatetime: new Date(
      new Date().setDate(new Date().getDate() + 7),
    ).toISOString(),
    groupDescription: '',
    groupName: '',
    maxMembers: 1,
    maxUserCount: 999,
    minMembers: 1,
    positionBased: true,
    teamTypeDescription: '',
  });

  const [step, setStep] = React.useState<Step>(STEP.SET_INFO);

  const navigate = useNavigate();

  const stepRenderMap = {
    [STEP.SET_INFO]: () => (
      <SetInfo
        onNext={data => {
          setGroupInfo(prev => ({...prev, ...data}));
          setStep(STEP.SET_CONDITION);
        }}
        groupInfo={groupInfo}
        onBack={() => navigate('/manager/team-building')}
      />
    ),
    [STEP.SET_CONDITION]: () => (
      <SetCondition
        onNext={data => {
          setGroupInfo(prev => ({...prev, ...data}));
          setStep(STEP.CONFIRM_AND_CREATE);
        }}
        groupInfo={groupInfo}
        onBack={() => setStep(STEP.SET_INFO)}
      />
    ),
    [STEP.CONFIRM_AND_CREATE]: () => (
      <ConfirmAndCreate
        groupInfo={groupInfo}
        onBack={() => setStep(STEP.SET_CONDITION)}
      />
    ),
  };

  return (
    <>
      <ManagerHeader />
      <Main classNames={{main: 'bg-[#F9F9F9]'}}>
        <div className="flex flex-1">
          <LeftMenu />

          <main className="flex flex-1 flex-col gap-10 px-8 py-12">
            <div className="flex -space-x-12">
              <StepBar
                label="정보 설정"
                enabled={step === STEP.SET_INFO}
                className="z-[2]"
              />
              <StepBar
                label="조건 설정"
                enabled={step === STEP.SET_CONDITION}
                className="z-[1]"
              />
              <StepBar
                label="확인 및 생성"
                enabled={step === STEP.CONFIRM_AND_CREATE}
                isEnd
                className="z-[0]"
              />
            </div>

            {stepRenderMap[step]()}
          </main>
        </div>
      </Main>
      <Footer />
    </>
  );
};
