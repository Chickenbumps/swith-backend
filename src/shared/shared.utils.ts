import AWS from "aws-sdk";
import moment from "moment";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const BucketName = "swith-upload";
const now = new Date();
const Expire = new Date(now.setFullYear(now.getFullYear() + 1));
export const uploadToS3 = async (fileUri, userId, folderName) => {
  const { filename, createReadStream } = await fileUri;
  const readStream = createReadStream();
  const newFilename = `${folderName}/${userId}-${Date.now()}-${filename}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: BucketName,
      Key: newFilename,
      ACL: "public-read",
      Body: readStream,
      Expires: Expire,
    })
    .promise();
  return Location;
};

export const currentTime = () => {
  let time = new Date();
  time.setHours(time.getHours() + 9);
  return time;
};
