import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export const createUserProfile = async (uid: string, profileData: any) => {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, profileData);
    console.log('User profile created!');
  } catch (error) {
    console.error('Error creating user profile:', error);
  }
};