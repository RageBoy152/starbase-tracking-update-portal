//  React Hooks
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../Authenticator.jsx';


//  React Compontents




import { socket, socketUpdateObject } from '../utils/socketIOHandler.js';
import { formatObjectNameText } from '../utils/utils.jsx';
import TrackingLogMessage from '../components/TrackingLogMessage.jsx';
import { Spinner } from '../components/Spinner.jsx';



export default function TrackingLogModal() {
  const { user, logout } = useAuth();

  const [pendingImages, setPendingImages] = useState([]);

  const [selectedObjectData, setSelectedObjectData] = useState(null);
  const [filteredMessages, setFilteredMessages] = useState(null);

  const textareaRef = useRef(null);
  const imageUploadRef = useRef(null);

  const [messageValue, setMessageValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const [editing, setEditing] = useState(null);
  


  //    OBJECT FETCH    \\

  useEffect(() => {

    // fetch object
    const fetchObject = async () => {
      try {
        const objId = new URLSearchParams(location.search).get('id');
        if (!objId) { return; }

        const res = await fetch(`http://localhost:3002/objects/fetch-objects?id=${objId}`);
        if (!res.ok) { throw new Error(res.statusText); }

        const json = await res.json();
        
        setSelectedObjectData(json);
      }
      catch (error) {
        console.error("Error handling fetchObject response");
        console.error(error);
      }
    }


    // update object
    socket.on('updateThisObject', object => {
      setSelectedObjectData((prevSelectedObjectData) => prevSelectedObjectData.id == object.id ? object : prevSelectedObjectData);
    });


    // error during socket request
    socket.on('objectSocketRequestError', errObj => {
      console.error(`Server error on '${errObj.action}'. Message: ${errObj.error_message}`);
      console.error(errObj.error);
    });


    fetchObject();


    return () => {
      socket.off('updateThisObject');
      socket.off('objectSocketRequestError');
    }
  }, []);



  //    SEND MESSAGE    \\

  function sendMessage(updatedLog) {
    const formattedMsgValue = messageValue.trim();

    // input validation
    if (formattedMsgValue == '') { console.log("invalid message"); return; }

    // Add object
    let newSelectedObject = { ...selectedObjectData };

    if (updatedLog) {
      if (user.id != updatedLog.userId) { console.log("can't edit someone elses message"); return; }

      newSelectedObject.logs = newSelectedObject.logs.map(log =>
        log.id == updatedLog.id ?
        { ...log, messageBody: formattedMsgValue, editedAt: Date.now() }
        : log
      );
    }
    else {
      newSelectedObject.logs.push({
        userId: user.id,
        userName: user.username,
        userAvatar: user.avatar,
        messageBody: formattedMsgValue,
        attachments: []
      });
    }


    socketUpdateObject(newSelectedObject, { save: true });


    setMessageValue('');
    textareaHeightFix();
    setEditing(null);
  }



  //    EDIT MESSAGE    \\

  function startEdit(log) {
    if (user.id != log.userId) { console.log("can't edit someone elses message"); return; }

    setMessageValue(log.messageBody);
    textareaHeightFix();
    setEditing(log);
  }

  function stopEdit(log) {
    setMessageValue('');
    textareaHeightFix();
    setEditing(null);
  }



  //    DELETE MESSAGE    \\

  function deleteMessage(logToDelete) {
    if (user.id != logToDelete.userId) { console.log("can't delete someone elses message"); return; }

    let newLogsArr = [...selectedObjectData.logs];
    const index = newLogsArr.findIndex(log => log.id == logToDelete.id);

    if (index == -1) return;

    newLogsArr.splice(index, 1);

    socketUpdateObject({ ...selectedObjectData, logs: newLogsArr }, { save: true });
  }



  //    MESSAGE INPUT UTILS    \\

  function textareaHeightFix() {
    const textarea = textareaRef.current;

    setTimeout(() => {
      textarea.style.height = "auto";  
      textarea.style.height = `${textarea.scrollHeight}px`;
    }, 0);
  }


  function handleInput(e) {
    if (e.ctrlKey && e.key == 'Enter') {
      e.preventDefault();

      sendMessage(editing);
    }
    else {
      textareaHeightFix();
    }
  }



  //    SEARCH    \\

  useEffect(() => {
    if (selectedObjectData && searchValue == '') { setFilteredMessages(selectedObjectData.logs); }
    else if (selectedObjectData) { filterMessages(selectedObjectData.logs, searchValue); }
  }, [selectedObjectData, searchValue]);


  function filterMessages(logs, q) {
    setFilteredMessages(logs.filter((log) => log.messageBody.toLowerCase().includes(q.trim().toLowerCase())));
  }



  //    MEDIA PROCESSING    \\

  function imageInputHandler(e) {
    console.log(e.target.files);
    console.log(e.target.files.length);

    if (e.target.files.length == 0) return;


    Array.from(e.target.files).forEach((file) => {
      if (file.size > (10 * 1024 * 1024)) { console.log("too big!"); return; }

      // add image to list of pending images
      setPendingImages((pendingImages) => [...pendingImages, {
        id: Date.now(),
        uploaded: false,
        error: null,
        private: false,
        mediaType: '',
        url: '',
        tempURL: URL.createObjectURL(file),
        fileName: file.name
      }]);
      
      // send http post req to upload image
      
    });
  }




  return (
    <>
      <section className="flex flex-col h-screen overflow-hidden">
        <section className='bg-body border-b border-white/50 px-8 py-3 flex'>
          <div className="w-10/12 mx-auto flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2">
              <h1 className='text-l font-semibold uppercase break-words'>{searchValue ? `Results for '${searchValue}'` : selectedObjectData ? `Tracking Logs for '` + formatObjectNameText(selectedObjectData)[1] + "'" : ''}</h1>
            </div>
            <div className="w-full md:w-1/2 flex">
              <input title='Ctrl+Enter to search' className="bg-primary/70 hover:bg-primary/80 focus:bg-primary/80 rounded-sm text-white py-1 px-3 w-full outline-0" placeholder='Search Logs...' maxLength={30} value={searchValue} onChange={(e) => setSearchValue(e.target.value)}></input>
            </div>
          </div>
        </section>
        

        <div className="h-screen overflow-y-auto flex flex-col-reverse py-2 bg-body">
          <section className='flex flex-col justify-end'>


            {filteredMessages && filteredMessages.length > 0 && filteredMessages.map((log, index) => (
                <TrackingLogMessage key={index} log={log} deleteMessage={deleteMessage} startEdit={startEdit} stopEdit={stopEdit} currentlyEditing={log == editing} userId={user.id} />
              ))
            }

            {filteredMessages && filteredMessages.length == 0 && (
              <p className='text-center pb-5'>{searchValue == '' ? 'No logs yet.' : 'No results.'}</p>
            )}


          </section>
        </div>


        {pendingImages.length > 0 && (
          <section className="bg-primary/70 border-b border-white/50 flex h-[300px] overflow-x-auto overflow-y-hidden">
            <div className="w-max flex p-2 gap-3">
              {pendingImages.map((imgObj, index) => (
                <div key={index} id={`pendingImage_${imgObj.id}`} className='aspect-square bg-primary p-4 rounded relative'>
                  <div className="bg-body/60 absolute top-0 start-0 rounded flex items-center justify-center w-full h-full pointer-events-none">
                    <Spinner />
                  </div>
                  <img className='w-full h-full object-contain' src={imgObj.tempURL} alt={imgObj.fileName} />
                </div>
              ))}
            </div>
          </section>
        )}
        
        <section className='bg-primary/70 flex'>
          <input className='hidden' multiple type="file" accept="image/png, image/gif, image/jpeg, image/jfif, image/webp, video/mp4, video/webm, video/x-matroska" ref={imageUploadRef} onChange={imageInputHandler} />
          <a className="h-full w-1/12 hover:bg-body/20 cursor-pointer flex justify-center items-center" onClick={() => imageUploadRef.current.click()}>
            <i className="bi bi-plus-lg"></i>
          </a>
          
          <textarea title='Ctrl+Enter to send' className="bg-transparent text-white ps-3 py-3 w-full resize-none outline-0 overflow-hidden" rows="1" placeholder='Message...' maxLength={1000} value={messageValue} onChange={(e) => setMessageValue(e.target.value)} ref={textareaRef} onKeyDown={handleInput}></textarea>

          <a className="h-full w-1/12 hover:bg-body/20 cursor-pointer border-s border-white/50 flex justify-center items-center" onClick={() => sendMessage(editing)}>
            <i className="bi bi-send"></i>
          </a>
        </section>
      </section>
    </>
  )
}