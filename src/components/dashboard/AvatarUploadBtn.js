import React, { useState, useRef } from 'react';
import { Alert, Button, Modal } from 'rsuite';
import { useModalState } from '../../misc/custom-hooks';
import AvatarEditor from 'react-avatar-editor';
import { database, storage } from '../../misc/firebase';
import { useProfile } from '../../context/profile.context';
import ProfileAvatar from '../ProfileAvatar';
import { getUserUpdates } from '../../misc/helpers';

const fileInputTypes =".png, .jpeg, .jpg"

const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpeg'];
const isValidFile = (file) => acceptedFileTypes.includes(file.type);

const getBlob = (canvas) => {
    return new Promise((resolve, reject) =>{
        canvas.toBlob((blob)=>{
            if(blob) {
                resolve(blob);
            } else {
                reject(new Error('File process error'));
            }
        })
    })
}

const AvatarUploadBtn = () => {
    const {isOpen, open, close } = useModalState()
    const {profile} = useProfile();
    const [img, setImg] = useState(null);
    const[isLoading, setIsloading] = useState(null);
    const avatarEditorRef = useRef();


    const onFileInputChange = (ev) => {
        const currFile = ev.target.files;
        if(currFile.length === 1){
            const file = currFile[0];
            if(isValidFile(file)){
                setImg(file);
                open();
            } else {
                Alert.warning(`Wrong file type ${file.type}`, 4000);
            }


        }
    }

    const onUploadClick = async () => {

        const canvas = avatarEditorRef.current.getImageScaledToCanvas();

        setIsloading(true);

        try {
            const blob = await getBlob(canvas);
            const avatarFileRef = storage.ref(`/profile/${profile.uid}`).child('avatar');
            const uploadAvatarResult = await avatarFileRef.put(blob,{cacheControl:`public, max-age=${3600 * 24 * 3}`});
            const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();
            
            // const userAvatarRef = database.ref(`/profiles/${profile.uid}`).child('avatar');
            // userAvatarRef.set(downloadUrl);

            const updates = await getUserUpdates(profile.uid,'avatar',downloadUrl, database)

            await database.ref().update(updates);


            setIsloading(false);
            Alert.info('Avatar has been uploaded',4000)
           
            
        } catch (err) {
            setIsloading(false);
            Alert.error(err.message,4000);
            
        }

    }

  return (
    <div className="mt-3 text-center">

        <ProfileAvatar name={profile.name} src={profile.avatar} className="width-200 height-200 img-fullsize font-huge"/>

        <div>
            <label
            htmlFor="avatar-upload"
            className="d-block cursor-pointer padded"
            >
            Select new Avatar
            <input id="avatar-upload" type="file" className="d-none" accept={fileInputTypes} onChange={onFileInputChange}/>
            </label>

            <Modal show={isOpen} onHide={close}>
                <Modal.Header><Modal.Title>Adjust and upload new avatar</Modal.Title></Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center align-items-center h-100">
                    {img &&
                        <AvatarEditor
                        ref = {avatarEditorRef}
                        image={img}
                        width={200}
                        height={200}
                        border={10}
                        borderRadius={100}

                        rotate={0}
                        />}
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button block appearance="Ghost" onClick={onUploadClick} disabled={isLoading}>
                        Upload new avatar
                    </Button>
                </Modal.Footer>

            </Modal>
        </div>
    </div>
  );
};

export default AvatarUploadBtn;
