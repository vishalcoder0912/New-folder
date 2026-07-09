import fs from 'fs/promises';
import ImageKit from 'imagekit';

const getImageKit = () => {
  const { IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT } = process.env;
  if (!IMAGEKIT_PUBLIC_KEY || !IMAGEKIT_PRIVATE_KEY || !IMAGEKIT_URL_ENDPOINT) {
    throw new Error('ImageKit environment variables are not configured');
  }
  return new ImageKit({
    publicKey: IMAGEKIT_PUBLIC_KEY,
    privateKey: IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: IMAGEKIT_URL_ENDPOINT
  });
};

export const uploadToImageKit = async (file, folder = '/edtech-cms') => {
  const imagekit = getImageKit();
  const buffer = await fs.readFile(file.path);
  const result = await imagekit.upload({
    file: buffer,
    fileName: file.originalname,
    folder,
    useUniqueFileName: true
  });
  await fs.unlink(file.path).catch(() => {});
  return result;
};

export const deleteFromImageKit = async (fileId) => {
  if (!fileId) return;
  const imagekit = getImageKit();
  await imagekit.deleteFile(fileId);
};
