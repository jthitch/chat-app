import React, { useCallback, useState } from 'react'
import { Alert, Icon, Input, InputGroup } from 'rsuite'
import firebase from 'firebase/app'
import { useProfile } from '../../../context/profile.context'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import {database} from '../../../misc/firebase'

function assembleMessage(profile,chatId){
    return{
        roomId: chatId,
        author:{
            name: profile.name,
            uid: profile.uid,
            createdAt: profile.createdAt,
            ...(profile.avatar ? {avatar: profile.avatar} : {})
        },
        createdAt: firebase.database.ServerValue.TIMESTAMP,
    };
};

const Bottom = () => {

    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {profile} = useProfile();
    const {chatId} = useParams();



    const onInputChange = useCallback((value)=>{
        setInput(value);
    },[]);

    const onKeyDown = (ev) =>{
        if(ev.keyCode === 13){
            ev.preventDefault();
            onSendClick();
        }

    }

    const onSendClick = async () => {
        if(input.trim() === '' ) {
            return ;
        }

        const msgData = assembleMessage(profile, chatId);
        msgData.text = input;
        

        const updates = {};

        const messageId = database.ref('messages').push().key

        updates[`/messages/${messageId}`] = msgData;
        updates[`/rooms/${chatId}/lastMessage`] = {
            ...msgData,
            msgId: messageId,
        };

        setIsLoading(true);

        try {
            await database.ref().update(updates);
            setInput('')
            setIsLoading(false);
            
        } catch (err) {
            Alert.error(err.message);
            setIsLoading(false);
            
        }




        
    }


  return <div>
    <InputGroup>
        <Input placeholder="Write a new message ..." value={input} onChange={onInputChange} onKeyDown={onKeyDown}/>
        <InputGroup.Button color="blue" appearance='primary' onClick={onSendClick} disabled={isLoading}>
        <Icon icon="send" />
        </InputGroup.Button>
        
    </InputGroup>
    </div>
  
}

export default Bottom