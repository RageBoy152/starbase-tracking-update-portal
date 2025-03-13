import { useEffect, useState } from "react";

export default function TrackingLogMessage({ log, deleteMessage, startEdit, stopEdit, currentlyEditing, userId }) {
  const [timeAgo, setTimeAgo] = useState('Just now');
  const [dateFormatted, setDateFormatted] = useState('');


  useEffect(() => {
    if (!log.uploadDate) { return; }

    const date = new Date(log.uploadDate);
    const now = new Date();


    //  FORMAT DATE/TIME

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');

    setDateFormatted(`${yyyy}-${mm}-${dd} ${hh}:${min}`);

    
    //  GET TIME AGO

    setTimeAgo(() => {
      const diffInSeconds = Math.floor((now - date) / 1000);

      if (diffInSeconds < 10) return "Just now";
      if (diffInSeconds < 60) return `${diffInSeconds} second${diffInSeconds == 1 ? "" : "s"} ago`;

      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes == 1 ? "" : "s"} ago`;

      const diffInHours = Math.floor(diffInMinutes / 60);
      if (diffInHours < 24) return `${diffInHours} hour${diffInHours == 1 ? "" : "s"} ago`;

      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays === 1) return "Yesterday";
      if (diffInDays < 7) return `${diffInDays} day${diffInDays == 1 ? "" : "s"} ago`;
      if (diffInDays < 14) return "Last week";

      const diffInWeeks = Math.floor(diffInDays / 7);
      if (diffInWeeks < 4) return `${diffInWeeks} week${diffInWeeks == 1 ? "" : "s"} ago`;

      const diffInMonths = Math.floor(diffInDays / 30);
      if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths == 1 ? "" : "s"} ago`;

      const diffInYears = Math.floor(diffInDays / 365);
      return `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
    })
  }, [log.uploadDate]);


  if (dateFormatted == '') { return; }    // prevent date elem flashing


  return (
    <section className={`bg-body ${currentlyEditing ? '' : 'hover:'}bg-primary/40 flex relative py-3 group`}>
      <div className="w-1/12 flex justify-center px-5">
        <img className='w-[30px] h-[30px] mt-1 rounded-full select-none' src={`${log.avatar ? log.avatar : 'discord_logo.png'}`} alt="PFP" />
      </div>
      <div className="flex flex-col w-9/12">
        <div className="flex items-baseline gap-5 cursor-default">
          <p className='text-md text-gray-300'>{log.userName}</p>
          <p className='text-xs text-gray-300' title={log.uploadDate}>{dateFormatted} ({timeAgo})</p>
        </div>
        <div className="flex flex-col">
          {log.messageBody.split("\n").map((line, index, arr) => (
            <p key={index}>
              {line}
              {index === arr.length - 1 && log.editedAt && <span className="text-gray-400 text-xs ms-2 cursor-default" title={log.editedAt}>(edited)</span>}
            </p>
          ))}
        </div>
      </div>

      {userId == log.userId && (
        <div className={`absolute end-0 top-0 h-full w-2/12 pe-3 gap-2 ${currentlyEditing ? 'flex' : 'hidden'} group-hover:flex justify-center items-center`}>
          <a className="ring-1 ring-white hover:bg-white hover:text-black w-[30px] h-[30px] flex justify-center items-center rounded cursor-pointer" title={currentlyEditing ? 'Cancel edit' : 'Edit message'} onClick={() => currentlyEditing ? stopEdit(log) : startEdit(log)}><i className={`bi bi-${currentlyEditing ? 'x-lg' : 'pencil'} flex`}></i></a>
          <a className="ring-1 ring-white hover:bg-danger hover:text-white w-[30px] h-[30px] flex justify-center items-center rounded cursor-pointer" onClick={() => deleteMessage(log)}><i className="bi bi-trash flex"></i></a>
        </div>
      )}
    </section>
  );
}