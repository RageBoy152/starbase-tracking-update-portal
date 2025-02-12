//  React Hooks
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../Authenticator.jsx';


//  React Compontents




import { socket, fetchObjectDataFromId, socketUpdateObject } from '../utils/socketIOHandler.js';



export default function TrackingLogModal() {
  const { user, logout } = useAuth();

  const [selectedObjectData, setSelectedObjectData] = useState(null);
  const textareaRef = useRef(null);

  const [messageValue, setMessageValue] = useState('');


  useEffect(() => {
    const objId = new URLSearchParams(location.search).get('id');
    if (!objId) { return; }
    
    fetchObjectDataFromId(objId);
    
    const handleRes = (data) => { setSelectedObjectData(data[0]); }
    
    socket.on('objectsFetchRes', handleRes);
    
    return () => { socket.off('objectsFetchRes', handleRes) }
  }, []);



  function sendMessage() {
    const formattedMsgValue = messageValue.trim();

    // input validation
    if (formattedMsgValue == '') { console.log("invalid message"); return; }

    // Add object
    let newSelectedObject = { ...selectedObjectData };

    newSelectedObject.logs.push({
      userId: user.id,
      userName: user.username,
      userAvatar: user.avatar,
      messageBody: formattedMsgValue,
      attachments: []
    });

    socketUpdateObject(newSelectedObject, false, true);

    setMessageValue('');
  }


  function deleteMessage(logId) {
    let newLogsArr = [...selectedObjectData.logs];
    const index = newLogsArr.findIndex(log => log.id == logId);

    if (index == -1) return;

    newLogsArr.splice(index, 1);

    socketUpdateObject({ ...selectedObjectData, logs: newLogsArr }, false, true);
  }



  function handleInput(e) {
    const textarea = textareaRef.current;

    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

    if (e.ctrlKey && e.key == 'Enter') {
      e.preventDefault();

      sendMessage();
    }
  }




  return (
    <>
      <section className="flex flex-col h-screen overflow-hidden">
        <div className="h-screen overflow-y-auto flex flex-col-reverse py-2 bg-primary">
          <section className='flex flex-col justify-end'>


            {selectedObjectData && selectedObjectData.logs.length > 0 && selectedObjectData.logs.map((log, index) => (
                <section key={index} className="bg-primary px-5 py-3 flex relative border-b border-black">
                  <div className="w-1/12 flex justify-center">
                    <img className='w-[40px] h-[40px] rounded-full' src={`${log.avatar ? log.avatar : 'discord_logo.png'}`} alt="PFP" />
                  </div>
                  <div className="flex flex-col w-9/12 px-3">
                    <p className='text-md text-gray-300'>{log.userName}</p>
                    <div className="flex flex-col">
                      {log.messageBody}
                    </div>
                  </div>

                  <div className="absolute end-0 top-0 h-full w-2/12 pe-3 gap-2 flex justify-center items-center">
                    <a className="ring-1 ring-white hover:bg-white hover:text-black w-[30px] h-[30px] flex justify-center items-center rounded cursor-pointer"><i className="bi bi-pencil flex"></i></a>
                    <a className="ring-1 ring-white hover:bg-danger hover:text-white w-[30px] h-[30px] flex justify-center items-center rounded cursor-pointer" onClick={() => deleteMessage(log.id)}><i className="bi bi-trash flex"></i></a>
                  </div>
                </section>
              ))
            }

            {selectedObjectData && selectedObjectData.logs.length == 0 && (
              <p className='text-center pb-5'>No logs yet.</p>
            )}


          </section>
        </div>

        <section className='bg-primary flex'>
          <input className='hidden' type="file" name="" id="" />
          <a className="h-full w-1/12 bg-body/50 hover:bg-body/20 cursor-pointer flex justify-center items-center">
            <i className="bi bi-plus-lg"></i>
          </a>
          
          <textarea className="bg-body/50 text-white ps-3 py-3 w-full rounded-sm resize-none outline-0" rows="1" placeholder='Message...' maxLength={1000} value={messageValue} onChange={(e) => setMessageValue(e.target.value)} ref={textareaRef} onKeyDown={handleInput}></textarea>

          <a className="h-full w-1/12 bg-body/50 hover:bg-body/20 cursor-pointer flex justify-center items-center" onClick={sendMessage}>
            <i className="bi bi-send"></i>
          </a>
        </section>
      </section>
    </>
  )
}