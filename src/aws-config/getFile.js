import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import AWS from 'aws-sdk';


export const getPostPreSigned=async(url)=>{
    // const client= new S3Client({
    //     region:process.env.AWS_BUCKET_REGION
    //     ,
    //     credentials:{
    //       accessKeyId:process.env.ACCESS_JWT,
    //       secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    //     },
    // });
    const s3= new AWS.S3();
    
    const key= url.split("/post/");
     
    const param={
        Bucket:process.env.AWS_BUCKET_NAME,
        Key:"post/"+key[1],
        Expires:5,
    };
    // const getObjectCommand= new GetObjectCommand(param);
    // const signedURL=await getSignedUrl(client,getObjectCommand,{expiresIn:3600});
     const signedURL= s3.getSignedUrlPromise("getObject",param);
    return signedURL;
}