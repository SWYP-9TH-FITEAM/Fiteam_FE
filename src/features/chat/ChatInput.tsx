import type {FormEvent} from 'react';

import {useState} from 'react';

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
      className="sticky bottom-0 z-10 flex items-center gap-2 bg-white px-4 py-3 shadow-[0px_-1px_4px_0px_rgba(89,89,89,0.25)]"
    >
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="메시지를 입력하세요..."
        className="h-[34px] flex-grow rounded-lg bg-[#eee] px-4 py-2 focus:outline-none"
      />
      <button
        type="submit"
        disabled={message.trim() === ''}
        className="flex h-[34px] w-[67px] shrink-0 items-center justify-center gap-2.5 rounded-[7px] bg-[#5F4AFF] text-center text-sm leading-5 font-medium text-white disabled:bg-[#EEECFF]"
      >
        전송
      </button>
    </form>
  );
};
