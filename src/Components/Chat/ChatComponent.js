import React, { Fragment} from 'react';
import cx from 'classnames';
import styles from './chat.module.css';

const ChatComponent = (props) => {
    return (
        <Fragment>
            <div className={matchMedia('(max-width:768px)').matches?'container-fluid':''}>
            <div className={cx('row pt-2', styles.chatname)}>
                <div className="col-sm-12">
                    <img src={props.userPhoto} className={cx('img-fluid', styles.userimg)} alt={props.chatname} />
                    <span> {props.chatname}</span>
                </div>
            </div>
            <div id="chat" className={cx('pt-3 row', styles.chats)}>
                <div className={cx('col-sm-12')}>
                {
                    props.chats.map((chat,i) => (
                        chat.message.startsWith('https://firebasestorage.googleapis.com/v0/b/burger-128d8.appspot.com')? (
                            <div key={i} className='row pb-3'>
                                <div className='col-sm-5'>
                                {
                                    chat.from===props.username ? null:
                                    <img src={chat.message} className={cx('img-fluid', styles.chatimg)} 
                                    onLoad={()=> {
                                        let chat = document.querySelector('#chat');
                                        if(chat) {
                                            chat.scrollTop = chat.scrollHeight;
                                        }
                                    }} alt={chat.message}
                                    onClick={()=>window.open(chat.message,'_blank')}
                                    />
                                }
                                </div>
                                <div className='col-sm-2'></div>
                                <div className='col-sm-5 text-right'>
                                {
                                    chat.from===props.username ? 
                                    <img src={chat.message} className={cx('img-fluid', styles.chatimg)} 
                                    onLoad={()=> {
                                        let chat = document.querySelector('#chat');
                                        if(chat) {
                                            chat.scrollTop = chat.scrollHeight;
                                        }
                                    }} alt={chat.message} 
                                    onClick={()=>window.open(chat.message,'_blank')}
                                    /> : null
                                }
                                </div>
                                
                            </div>
                        ): (
                        <div key={i} className='row'>
                            <div className='col-sm-5'>
                            {
                                chat.from===props.username ? null:
                                <p className={cx('p-2',styles.chatbubbleother)}>{chat.message}
                                    <span style={{float:'right'}}>
                                        <sub>{new Date(chat.date).getHours()}: {new Date(chat.date).getMinutes()}</sub>
                                    </span>
                                </p>
                            }
                            </div>
                            <div className='col-sm-2'></div>
                            <div className='col-sm-5'>
                            {
                                chat.from===props.username ?
                                <p className={cx('p-2',styles.chatbubbleme)}>{chat.message} 
                                    <span style={{float:'right'}}>
                                        <sub>{new Date(chat.date).getHours()}: {new Date(chat.date).getMinutes()}</sub>
                                    </span>
                                </p>
                                : null
                            }
                            </div>
                        </div>
                        // <p key={i} align="right" className={cx('p-2',styles.chatbubble)}>{chat.from===props.username?'You':chat.from}: {chat.message}</p>
                        )
                    ))
                }
                </div>
            </div>
            </div>
            {
                matchMedia('(max-width:768px)').matches ? 
                <div className={cx(styles.flexrow, styles.send)}>
                    <div className={styles.col1}>
                        <input type="text" value={props.message} className="form-control" 
                        onChange={e => props.setMessage(e)} 
                        onKeyPress={e => {
                            if(e.keyCode===13 || e.which===13) {
                                props.sendMessage();
                            }
                        }}
                        placeholder="Type message here..."
                        />
                    </div>
                    <div className={styles.col2}>
                        <button className={cx('btn', styles.sendbtn)} 
                        onClick={props.sendMessage} 
                        disabled={props.disabledSend}>
                        <i className="fas fa-paper-plane" style={{fontSize: '20px', color: 'white'}}></i>
                        </button>
                    </div>
                    <div className={styles.col3}>
                        <label htmlFor="image" style={{cursor:'pointer'}} className={cx('btn', styles.sendbtn)}>
                            <i className="far fa-image" style={{fontSize:'20px', color: 'white'}}></i>
                            {/* <p>Photo</p> */}
                        </label>
                        <input type="file" id="image" disabled={props.disabledPhoto} onChange={(e) => props.uploadFile(e)}
                        style={{display:'none'}}
                        />
                    </div>
                </div> :
                <div className={cx('row text-center', styles.send)}>
                <div className="col-sm-10">
                    <input type="text" value={props.message} className="form-control" 
                    onChange={e => props.setMessage(e)} 
                    onKeyPress={e => {
                        if(e.keyCode===13 || e.which===13) {
                            props.sendMessage();
                        }
                    }}
                    placeholder="Type message here..."
                    />
                </div>
                <div className="col-sm-1">
                    <button className={cx('btn', styles.sendbtn)} 
                    onClick={props.sendMessage} 
                    disabled={props.disabledSend}>
                    <i className="fas fa-paper-plane" style={{fontSize: '20px', color: 'white'}}></i>
                    </button>
                </div>
                <div className="col-sm-1">
                    <label htmlFor="image" style={{cursor:'pointer'}} className={cx('btn', styles.sendbtn)}>
                        <i className="far fa-image" style={{fontSize:'20px', color: 'white'}}></i>
                        {/* <p>Photo</p> */}
                    </label>
                    <input type="file" id="image" disabled={props.disabledPhoto} onChange={(e) => props.uploadFile(e)}
                    style={{display:'none'}}
                    />
                </div>
            </div>
            }
        </Fragment>
    );
}

export default ChatComponent;