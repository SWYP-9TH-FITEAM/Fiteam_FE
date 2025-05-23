import type {InitialGroupInfo, SetInfoSchema} from '../model/form';

import * as React from 'react';
import {Radio, RadioGroup} from '@heroui/radio';
import {DateRangePicker, Input} from '@heroui/react';
import {zodResolver} from '@hookform/resolvers/zod';
import {parseAbsoluteToLocal} from '@internationalized/date';
import {Controller, useForm} from 'react-hook-form';

import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {initialSetInfoSchema, setInfoSchema} from '../model/form';

interface SetInfoProps {
  onNext: (data: SetInfoSchema) => void;
  onBack: () => void;
  groupInfo: InitialGroupInfo;
}

export const SetInfo: React.FC<SetInfoProps> = ({
  onNext,
  onBack,
  groupInfo,
}) => {
  const {data: defaultValues} = initialSetInfoSchema.safeParse(groupInfo);

  const form = useForm<SetInfoSchema>({
    resolver: zodResolver(setInfoSchema),
    defaultValues,
    mode: 'all',
  });

  const formRef = React.useRef<HTMLFormElement>(null);

  const startDatetime = form.watch('startDatetime');
  const endDatetime = form.watch('endDatetime');
  const setValue = form.setValue;

  const start = parseAbsoluteToLocal(startDatetime);
  const end = parseAbsoluteToLocal(endDatetime);

  const handleSubmit = (data: SetInfoSchema) => {
    onNext(data);
  };

  const handleNext = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-10 rounded-[20px] bg-white p-11 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]"
      >
        <div className="flex flex-col gap-5 text-left">
          <span className="text-[28px] leading-[36px] font-semibold tracking-[-0.7px]">
            그룹 이름
          </span>
          <Controller
            control={form.control}
            name="groupName"
            render={({field, fieldState: {invalid}}) => (
              <Input
                {...field}
                placeholder="그룹 이름을 입력해주세요."
                classNames={{
                  inputWrapper: 'px-[18px] py-4 h-auto',
                  input: 'text-lg',
                }}
                isInvalid={invalid}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-5 text-left">
          <span className="text-[28px] leading-[36px] font-semibold tracking-[-0.7px]">
            그룹 설명
          </span>
          <Controller
            control={form.control}
            name="groupDescription"
            render={({field, fieldState: {invalid}}) => (
              <Input
                {...field}
                placeholder="그룹 설명을 입력해주세요."
                classNames={{
                  inputWrapper: 'px-[18px] py-4 h-auto',
                  input: 'text-lg',
                }}
                isInvalid={invalid}
              />
            )}
          />
        </div>

        <Separator />

        <div className="flex gap-[170px]">
          <div className="flex flex-col gap-5 text-left">
            <span className="text-[28px] leading-[36px] font-semibold tracking-[-0.7px]">
              구성 방식
            </span>
            <Controller
              control={form.control}
              name="positionBased"
              render={({field}) => (
                <RadioGroup
                  orientation="horizontal"
                  value={`${field.value}`}
                  onValueChange={value => field.onChange(value === 'true')}
                >
                  <Radio value="false">랜덤 방식</Radio>
                  <Radio value="true">직접 빌딩</Radio>
                </RadioGroup>
              )}
            />
          </div>

          <div className="flex flex-col gap-5 text-left">
            <span className="text-[28px] leading-[36px] font-semibold tracking-[-0.7px]">
              팀 빌딩 기간 / 시간
            </span>
            <DateRangePicker
              hideTimeZone
              hourCycle={24}
              visibleMonths={2}
              granularity="minute"
              value={{start, end}}
              onChange={value => {
                if (!value) return;
                const {start, end} = value;

                setValue('startDatetime', start.toAbsoluteString());
                setValue('endDatetime', end.toAbsoluteString());
              }}
            />
          </div>
        </div>
      </form>

      <div className="flex justify-center gap-3.5">
        <Button
          variant="secondary"
          className="bg-gray-2 hover:bg-gray-2/70 h-[51px] px-[70px] py-1.5 text-2xl leading-[32px] tracking-[-0.6px]"
          onClick={onBack}
        >
          취소
        </Button>

        <Button
          onClick={handleNext}
          className="h-[51px] px-[70px] py-1.5 text-2xl leading-[32px] tracking-[-0.6px]"
        >
          다음
        </Button>
      </div>
    </>
  );
};
