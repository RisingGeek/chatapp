import React from 'react';

const ChatComponent = (props) => {
    return (
        <div>
            <div className="p-5" id="chat" style={{height:'65vh', overflowY:'scroll', border: '1px solid rgba(0,0,0,0.5)'}}>
            {
                props.chats.map((chat,i) => (
                    chat.message.startsWith('https://firebasestorage.googleapis.com/v0/b/burger-128d8.appspot.com')? (
                        <div key={i}>
                            <p>{chat.from===props.username?'You':chat.from}:</p>
                            <img src={chat.message} className="img-fluid" onLoad={()=> {
                                let chat = document.querySelector('#chat');
                                if(chat) {
                                    chat.scrollTop = chat.scrollHeight;
                                }
                            }} alt={chat.message} 
                            style={{width:'20%', cursor: 'pointer'}}
                            onClick={()=>window.open(chat.message,'_blank')}
                            />
                        </div>
                    ):
                    <p key={i}>{chat.from===props.username?'You':chat.from}: {chat.message}</p>
                ))
            }
            </div>
            <div className="row pt-4 text-center">
                <div className="col-sm-9">
                    <input type="text" value={props.message} className="form-control" 
                    onChange={e => props.setMessage(e)} 
                    placeholder="Type message here..."
                    />
                </div>
                <div className="col-sm-2">
                    <label htmlFor="image" style={{cursor:'pointer'}}>
                        <i className="far fa-image" style={{fontSize:'20px'}}></i>
                        <p>Photo</p>
                    </label>
                    <input type="file" id="image" disabled={props.disabledPhoto} onChange={(e) => props.uploadFile(e)}
                    style={{opacity:'0'}}
                    />
                </div>
                <div className="col-sm-1">
                    <button className="btn btn-info" onClick={props.sendMessage} disabled={props.disabledSend}>send</button>
                </div>
            </div>
        </div>
    );
}

export default ChatComponent;