import { Injectable } from "@angular/core";
// import { S3 } from "aws-sdk";
import * as AWS from "aws-sdk/global";
import * as S3 from "aws-sdk/clients/s3";

@Injectable({
  providedIn: "root",
})
export class UploadService {
  constructor() {}

  uploadFile(file) {
    let successData;
    console.log("called");
    const contentType = file.type;
    const bucket = new S3({
      accessKeyId: "AKIA6FVO5N22QUZE7P3V",
      secretAccessKey: "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",
      region: "ap-south-1",
    });
    console.log(bucket);
    const params = {
      Bucket: "ano-bucket",
      //   this.FOLDER +
      Key: file.name,
      Body: file,
      ACL: "public-read",
      ContentType: contentType,
    };
    console.log(params);
    bucket.upload(params, function (err, data) {
      console.log("bucket upload call");
      if (err) {
        console.log("There was an error uploading your file: ", err);
        return false;
      }
      console.log("Successfully uploaded file.", data);
      successData = data;
      console.log(successData.Location);
      console.log(data.Location);
      return successData;
    });
    //for upload progress
    // bucket
    //   .upload(params)
    //   .on("httpUploadProgress", function (evt) {
    //     console.log(evt.loaded + " of " + evt.total + " Bytes");
    //   })
    //   .send(function (err, data) {
    //     if (err) {
    //       console.log("There was an error uploading your file: ", err);
    //       return false;
    //     }
    //     console.log("Successfully uploaded file.", data);
    //     console.log("in location", data.location);
    //     return true;
    //   });
    return successData;
  }
}
