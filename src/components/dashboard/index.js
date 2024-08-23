import React from 'react';
import { Alert, Button, Divider, Drawer } from 'rsuite';
import { useProfile } from '../../context/profile.context';
import EditableInput from '../EditableInput';
import { database } from '../../misc/firebase';
import ProviderBlock from './ProviderBlock';
import AvatarUploadBtn from './AvatarUploadBtn';
import { getUserUpdates } from '../../misc/helpers';

const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile();

  const onSave = async newData => {
    // const userNicknameRef = database
    //   .ref(`/profiles/${profile.uid}`)
    //   .child('name');
    try {
      // await userNicknameRef.set(newData);

      const updates = await getUserUpdates(profile.uid,'name',newData, database)
      console.log(updates)

      await database.ref().update(updates);



      Alert.success('Nickname updated', 4000);
    } catch (err) {
      console.log(err.message)
      Alert.error(err.message, 4000);
    }
  };

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
        <ProviderBlock />
        <Divider />
        <EditableInput
          name="nickname"
          initalValue={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">Nickname</h6>}
        />
        <AvatarUploadBtn />
      </Drawer.Body>

      <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}>
          Sign Out
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default Dashboard;
