import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

const BucketName = "swith-upload";

export const uploadToS3 = async (fileUri, userId, folderName) => {
  const { filename, createReadStream } = await fileUri;
  const readStream = createReadStream();
  console.log("readStream", readStream);
  const newFilename = `${folderName}/${userId}-${Date.now()}-${filename}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: BucketName,
      Key: newFilename,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();
  return Location;
};
