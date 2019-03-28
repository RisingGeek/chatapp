import React from 'react';
import styles from './chats.module.css';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Chat from '../../Containers/Chat/Chat';

const ChatComponent = props => {
    if(props.id && matchMedia('(max-width:768px)').matches) {
        return (
            <Chat id={props.id} />
        );
    }
    return (
        <div className={cx(['container-fluid'], styles['chat-component'])}>
            <div className={cx('row')}>
                <div className={cx('col-sm-4', styles.allchats)}>
                    {
                        props.allUsersChat.map(chat => (
                            <Link key={chat._id} to={
                                props.username!==chat.userOne?
                                {pathname: '/chats/'+chat.userOne.replace(/ /g,'-')}:
                                {pathname: '/chats/'+chat.userTwo.replace(/ /g,'-')}
                                }>
                            <div className={cx('row', 'py-2', styles.chatuser)}>
                                <div className={cx('col-sm-3')}>
                                    <img src={chat.photo} className={cx('img-fluid',styles.rounded)} alt={chat.photo} />
                                </div>
                                <div className={cx('col-sm-9')}>
                                    <h3 className="text-dark">{props.username!==chat.userOne? chat.userOne: chat.userTwo}
                                        {
                                            props.connectedUsers? 
                                            props.connectedUsers.map(onlineUser => (
                                                (chat.userOne!==props.username && chat.userOne===onlineUser) || (chat.userTwo!==props.username && chat.userTwo===onlineUser)?
                                                <span key={onlineUser} 
                                                style={{
                                                    color:'green', 
                                                    fontSize:'30px', 
                                                    verticalAlign: 'top'}}> &bull;
                                                </span>
                                            :null
                                            )) : null
                                        }
                                    </h3>
                                    {
                                        chat.chat[chat.chat.length-1].message.startsWith('https://firebasestorage.googleapis.com/v0/b/burger-128d8.appspot.com')? (
                                            <p className="text-secondary">
                                            <i className="fas fa-camera"></i> Photo
                                            </p>
                                        ) :
                                        <p className="text-secondary">{chat.chat[chat.chat.length-1].message.substr(0,30)}</p>
                                    }
                                </div>
                                <div className={styles.border}></div>
                            </div>
                            </Link>
                        ))
                    }
                </div>
                <div className={cx('col-sm-8')}>
                {
                    props.id ? (
                        <Chat id={props.id} />
                    ):null
                }
                </div>
            </div>
        </div>
    );
}

export default ChatComponent;