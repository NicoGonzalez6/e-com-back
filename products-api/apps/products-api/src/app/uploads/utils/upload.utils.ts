export async function deleteObject(keyName: string, aws_instance) {
  var params = {
    Bucket: aws_instance.bucket_name,
    Key: keyName,
  };

  await aws_instance.s3.deleteObject(params, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data);
  });
}

export async function uploadS3(file, bucket, name, productId, s3) {
  const params = {
    ContentType: file.mimetype,
    Bucket: bucket,
    Key: `${productId}/${String(name).trim()}`,
    Body: file.buffer,
  };

  const info = s3.upload(params).promise();

  return info;
}
