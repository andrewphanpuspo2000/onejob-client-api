import AWS from "aws-sdk";
export const addFile = async (file) => {
  const s3 = new AWS.S3();

  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `submitfile/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
  };
  return await s3.upload(param).promise();
};
export const addFileTask = async (file) => {
  const s3 = new AWS.S3();

  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `taskfile/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
  };
  return await s3.upload(param).promise();
};

export const addCompanyLogo = async (file) => {
  const s3 = new AWS.S3();

  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `companylogo/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
  };
  return await s3.upload(param).promise();
};
export const addPostFile = async (file) => {
  const s3 = new AWS.S3();

  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `post/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
  };

  return await s3.upload(param).promise();
};
