import {FormEvent, useState} from 'react';

type ChatInputProps = {
  onSendMessage: (message: string) => void;
};

export const ChatInput = ({onSendMessage}: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() === '') return;

    onSendMessage(message);
    setMessage('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 items-center bg-white px-4 py-3 shadow-[0px_-1px_4px_0px_rgba(89,89,89,0.25)] sticky bottom-0 z-10"
    >
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="메시지를 입력하세요..."
        className="flex-grow h-[34px] py-2 px-4 bg-[#eee] rounded-lg focus:outline-none"
      />
      <button
        type="submit"
        disabled={message.trim() === ''}
        className="bg-[#5F4AFF] disabled:bg-[#EEECFF] flex w-[67px] h-[34px] justify-center items-center gap-2.5 shrink-0 rounded-[7px] text-white text-center text-sm font-medium leading-5"
      >
        전송
      </button>
    </form>
  );
};
