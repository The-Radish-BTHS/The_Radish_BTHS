import { Storage } from "@google-cloud/storage";

if (
  !process.env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME ||
  !process.env.GOOGLE_CLOUD_SERVICE_CREDENTIALS
)
  throw new Error(
    "Missing env GOOGLE_CLOUD_SERVICE_CREDENTIALS and GOOGLE_CLOUD_STORAGE_BUCKET_NAME"
  );

export const rawStorage = new Storage({
  credentials: JSON.parse(process.env.GOOGLE_CLOUD_SERVICE_CREDENTIALS),
});
const bucket = rawStorage.bucket(process.env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME);
const BASE_URL = `https://storage.googleapis.com/${process.env.GOOGLE_CLOUD_STORAGE_BUCKET_NAME}`;

// creates upload / replaces file at [key] with base64 data
const uploadPublic = async (key: string, data: string) => {
  await bucket
    .file(key)
    .save(Buffer.from(data, "base64"), { private: false, public: true });
};

const deleteFile = async (key: string) => {
  await bucket.file(key).delete();
};

const clone = async (from: string, to: string) => {
  await bucket.file(from).copy(to);
};

const key = (key: string) => `${BASE_URL}/${key}`;
const unkey = (url: string) => url.replace(`${BASE_URL}/`, "");

export const storage = {
  uploadPublic,
  deleteFile,
  clone,
  key,
  unkey,
};
