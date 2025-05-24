import {useState} from 'react';
import {zodResolver} from '@hookform/resolvers/zod';
import {ChevronLeft} from 'lucide-react';
import {useForm} from 'react-hook-form';
import {toast} from 'sonner';
import {z} from 'zod';

import {Button} from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {MyPageNoticeStatus} from './MypageNotice';

interface NoticeCreateProps {
  setMyPageNoticeStatus: (status: MyPageNoticeStatus) => void;
}

// 폼 데이터 스키마 정의
const formSchema = z.object({
  title: z.string().min(1, {message: '제목을 입력해주세요.'}),
  content: z.string().min(1, {message: '내용을 입력해주세요.'}),
  file: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const NoticeCreate = ({setMyPageNoticeStatus}: NoticeCreateProps) => {
  console.log(setMyPageNoticeStatus);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      form.setValue('file', e.target.files[0]);
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log({
      ...data,
      file: file ? file.name : '첨부파일 없음',
    });

    toast.success('공지사항이 생성되었습니다.');
  };

  return (
    <section className="mb-15 w-full rounded-[20px] bg-white px-13 py-10 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)]">
      <div className="relative mb-10 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="absolute -left-9"
          onClick={() => setMyPageNoticeStatus('NOTICE_MANAGEMENT')}
        >
          <ChevronLeft className="h-7 w-7" />
        </Button>
        <h1 className="text-xl leading-7 font-medium">공지사항 작성</h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 flex-col space-y-8"
        >
          {/* 제목 필드 */}
          <FormField
            control={form.control}
            name="title"
            render={({field}) => (
              <FormItem>
                <FormLabel className="text-gray-5 text-xl leading-7 font-medium">
                  제목
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="제목을 입력해주세요."
                    className="h-12 border-gray-300 text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 본문 필드 */}
          <FormField
            control={form.control}
            name="content"
            render={({field}) => (
              <FormItem className="flex-1">
                <FormLabel className="text-gray-5 text-xl leading-7 font-medium">
                  본문
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="내용을 입력해주세요."
                    className="h-full min-h-[200px] resize-none border-gray-300 text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 첨부파일 필드 */}
          <FormItem>
            <FormLabel className="text-gray-5 text-xl leading-7 font-medium">
              첨부파일
            </FormLabel>
            <FormControl>
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  onChange={handleFileChange}
                  className="border-gray-300"
                />
              </div>
            </FormControl>
            {file && <p className="mt-2 text-sm text-blue-600">{file.name}</p>}
          </FormItem>

          <div className="mt-auto flex justify-center">
            <Button
              type="submit"
              className="bg-primary h-12 w-[214px] text-xl leading-7 font-medium text-white"
            >
              작성 완료
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default NoticeCreate;
