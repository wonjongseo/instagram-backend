import AWS from "aws-sdk";

AWS.config.update({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS,
        secretAccessKey: process.env.AWS_SECRET,
    },
    region: "ap-northeast-2",
});

const Bucket = "instargram-jongseo";
const bucketInstance = new AWS.S3();

export const deletePhotoS3 = async (fileUrl, folderName) => {
    const filePath = fileUrl.split(`/${folderName}/`)[1];

    const params = {
        Bucket: `${Bucket}/${folderName}`,
        Key: filePath,
    };

    await bucketInstance
        .deleteObject(params, (error, data) => {
            if (error) {
                console.log(error);
            } else {
                console.log(data);
            }
        })
        .promise();
};

export const uploadToS3 = async (file, userId, folderName) => {
    const {filename, createReadStream} = await file;
    const readStream = createReadStream();

    const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
    const {Location} = await new AWS.S3()
        .upload({
            Bucket: "instargram-jongseo",
            // Bucket: "filotshopping",
            Key: objectName,
            ACL: "public-read",
            Body: readStream,
        })
        .promise();
    return Location;
};
