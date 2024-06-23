import { CircleX } from "lucide-react";
import React from "react";
function Schema({
  currentHashtag,
  handleChangeHashTags,
  handleKeyDown,
  listHashtags,
  setListHashtags,
}: any) {
  const handleDeleteHashtag = (index: number) => {
    const newList = listHashtags.filter((_: any, i: number) => i !== index);
    setListHashtags(newList);
  };

  return (
    <>
      <p>
        <input
          type="text"
          value={currentHashtag}
          onChange={handleChangeHashTags}
          onKeyDown={handleKeyDown}
          className="w-full py-1"
          placeholder="Nhập hashtag và nhấn Enter"
        />
      </p>
      <ul className="flex flex-wrap gap-2">
        {listHashtags.map((hashtag: string, index: number) => (
          <li
            key={index}
            className="hashtag px-1 w-auto max-h-[30px] space-x-3 flex justify-between items-center border-2 rounded-full"
          >
            {hashtag}
            <div
              className="pl-2 cursor-pointer"
              onClick={() => handleDeleteHashtag(index)}
            >
              <CircleX className="h-5 w-5" />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default React.memo(Schema);
