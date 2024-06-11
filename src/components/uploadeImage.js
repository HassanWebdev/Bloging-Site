import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app from '../lib/firebase';

const storage = getStorage(app);

export async function uploadImageToFirebase(file, folderName = 'images') {
  try {
    if (!file) {
      throw new Error('No file provided');
    }

    const fileName = file.name;

    const storageRef = ref(storage, `${folderName}/${fileName}`);

    const snapshot = await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(snapshot.ref);

    return { url: downloadURL};
  } catch (error) {
    throw error;
  }
}

export default app;
