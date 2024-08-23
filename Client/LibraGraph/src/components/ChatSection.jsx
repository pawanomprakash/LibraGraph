import React from 'react';

const ChatSection = () => {
  return (
    <section className="flex flex-col py-10 pl-1.5 text-center bg-gray-900 text-slate-100 max-md:max-w-full">
      <h2 className="self-start ml-3 text-4xl font-extrabold max-md:ml-2.5">Libr-Ai-nian</h2>
      <div className="px-16 pt-4 pb-6 text-2xl rounded-xl bg-neutral-700 mt-[598px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
        Hello, how can i help you today?
      </div>
      <form className="flex gap-5 self-center mt-6 max-w-full w-[453px]">
        <input
          type="text"
          placeholder="Enter your message..."
          className="grow px-16 pt-2.5 pb-5 text-2xl rounded-xl bg-neutral-700 w-fit max-md:px-5"
        />
        <button type="submit" className="px-3 py-6 text-base whitespace-nowrap rounded-xl bg-neutral-700">
          SEARCH
        </button>
      </form>
    </section>
  );
};

export default ChatSection;