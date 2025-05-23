import type {InitialGroupInfo, SetConditionSchema} from '../model/form';

import * as React from 'react';
import {Input, NumberInput} from '@heroui/react';
import {zodResolver} from '@hookform/resolvers/zod';
import {Plus, X} from 'lucide-react';
import {Controller, useFieldArray, useForm} from 'react-hook-form';

import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {initialSetConditionSchema, setConditionSchema} from '../model/form';

interface SetConditionProps {
  onNext: (data: SetConditionSchema) => void;
  onBack: () => void;
  groupInfo: InitialGroupInfo;
}

export const SetCondition: React.FC<SetConditionProps> = ({
  onNext,
  onBack,
  groupInfo,
}) => {
  const {data: defaultValues} = initialSetConditionSchema.safeParse(groupInfo);

  const form = useForm<SetConditionSchema>({
    resolver: zodResolver(setConditionSchema),
    defaultValues,
    mode: 'all',
  });

  const {fields, append, remove} = useFieldArray({
    name: 'memberCountPerPosition',
    control: form.control,
  });

  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = (data: SetConditionSchema) => {
    const {memberCountPerPosition, maxMembers, minMembers} = data;

    const minMemberCountLimit = memberCountPerPosition.filter(
      ({count}) => count > 0,
    ).length;

    const maxMemberCountLimit = memberCountPerPosition.reduce(
      (acc, curr) => acc + curr.count,
      0,
    );

    let isError = false;

    if (minMembers < minMemberCountLimit) {
      form.setError('minMembers', {
        message: '최소 인원수는 직군 수의 합보다 작을 수 없습니다.',
      });
      isError = true;
    }

    if (maxMembers > maxMemberCountLimit) {
      form.setError('maxMembers', {
        message: '최대 인원수는 직군 별 최대 인원수의 합보다 클 수 없습니다.',
      });
      isError = true;
    }

    if (maxMembers < minMembers) {
      form.setError('maxMembers', {
        message: '최대 인원수는 최소 인원수보다 작을 수 없습니다.',
      });
      isError = true;
    }

    if (isError) {
      return;
    }

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
        <div className="flex gap-9">
          <div className="flex flex-col gap-5 text-left">
            <span className="text-[28px] leading-[36px] font-semibold tracking-[-0.7px]">
              팀 인원수
            </span>

            <div className="flex gap-2">
              <Controller
                control={form.control}
                name="minMembers"
                render={({
                  field: {onChange, ...field},
                  fieldState: {invalid, error},
                }) => (
                  <NumberInput
                    onValueChange={onChange}
                    {...field}
                    label="최소"
                    classNames={{inputWrapper: 'shadow-xs'}}
                    className="w-48"
                    isInvalid={invalid}
                    errorMessage={error?.message}
                  />
                )}
              />
              <Controller
                control={form.control}
                name="maxMembers"
                render={({
                  field: {onChange, ...field},
                  fieldState: {invalid, error},
                }) => (
                  <NumberInput
                    onValueChange={onChange}
                    {...field}
                    label="최대"
                    classNames={{inputWrapper: 'shadow-xs'}}
                    className="w-48"
                    isInvalid={invalid}
                    errorMessage={error?.message}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex flex-col gap-5 text-left">
            <div className="flex items-center gap-3.5">
              <span className="text-[28px] leading-[36px] font-semibold tracking-[-0.7px]">
                직군 별 인원 수
              </span>
              {fields.length < 8 && (
                <Button
                  type="button"
                  variant="secondary"
                  className="bg-gray-2 hover:bg-gray-2/70 aspect-square h-9 w-9 rounded-full"
                  onClick={() => {
                    append({position: '', count: 1});
                  }}
                >
                  <Plus />
                </Button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {fields.map((field, index) => (
                <Controller
                  key={field.id}
                  control={form.control}
                  name={`memberCountPerPosition.${index}`}
                  render={({field, fieldState: {invalid}}) => (
                    <div className="flex items-center">
                      <Input
                        aria-label="포지션"
                        radius="none"
                        placeholder="포지션"
                        value={field.value.position}
                        onValueChange={value =>
                          field.onChange({
                            position: value,
                            count: field.value.count,
                          })
                        }
                        classNames={{inputWrapper: 'h-14 rounded-l-lg'}}
                        isInvalid={invalid}
                      />
                      <NumberInput
                        aria-label="최대"
                        placeholder="최대"
                        radius="none"
                        value={field.value.count}
                        onValueChange={value =>
                          field.onChange({
                            position: field.value.position,
                            count: value,
                          })
                        }
                        classNames={{
                          inputWrapper: 'rounded-r-lg shadow-xs pl-1',
                        }}
                        className="w-28"
                        minValue={1}
                        maxValue={99}
                        isInvalid={invalid}
                      />
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => {
                            remove(index);
                          }}
                          variant="secondary"
                          className="bg-gray-2 hover:bg-gray-2/70 ml-2 aspect-square h-6 w-6 rounded-full"
                        >
                          <X />
                        </Button>
                      )}
                    </div>
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-5 text-left">
          <span className="text-[28px] leading-[36px] font-semibold tracking-[-0.7px]">
            방출 조건 설정
          </span>
          <Controller
            control={form.control}
            name="teamTypeDescription"
            render={({field, fieldState: {invalid}}) => (
              <Input
                {...field}
                placeholder="방출 조건을 입력해주세요."
                classNames={{
                  inputWrapper: 'px-[18px] py-4 h-auto',
                  input: 'text-lg',
                }}
                isInvalid={invalid}
              />
            )}
          />
        </div>
      </form>

      <div className="flex justify-center gap-3.5">
        <Button
          variant="secondary"
          className="bg-gray-2 hover:bg-gray-2/70 h-[51px] px-[70px] py-1.5 text-2xl leading-[32px] tracking-[-0.6px]"
          onClick={onBack}
        >
          이전
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
