import fs from 'fs';
import path from 'path';
import AWS from 'aws-sdk';
//import { extname } from 'path';
import formidable from 'formidable';
//const multer = require('multer');
//const multerS3 = require('multer-s3');
import { v4 as newUuid } from 'uuid';

const accessKeyId     = process.env.AWS_S3_CLIENT_ID || '';
const secretAccessKey = process.env.AWS_S3_CLIENT_SECRET || '';
const Bucket          = process.env.AWS_S3_BUCKET || 'frenchbench';
const Region          = process.env.AWS_S3_REGION || 'eu-west-2';
const folders         = ['uploads', 'images']; // '/uploads/images/[small|medium|large]/uuid.[jpg|jpeg|png]'
const ACL             = 'public-read';

const s3 = new AWS.S3({ accessKeyId, secretAccessKey });

export const ACCEPT_MIMETYPES      = ['image/jpeg', 'image/png'];
export const ERR_NO_FILE_UPLOADED  = 'upload JPEG or PNG image';
export const ERR_INVALID_FILE_TYPE = 'JPEG or PNG images are allowed';
export const ERR_INVALID_FILE_SIZE = 'max file size allowed is 50MB';
export const MAX_FILE_SIZE         = 50 * 1024 * 1024; // 50MB

// for next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

// for next.js
export default async function handler(req, res) {
  const t1 = new Date();
  req.id = newUuid();
  console.log(req.id, '/api/upload request START');
  let data = null, error = null;
  try {
    // TODO: require a valid JWT cookie
    const { files, fields } = await receiveFiles(req);
    const { fb_file } = files || {};
    if (!fb_file) throw new Error(ERR_NO_FILE_UPLOADED);
    // {
    //   size: 13284,
    //   path: '/path-to-temp-folder/upload_2413ccfdac63f873406d89c602112a6a.jpg',
    //   name: 'frenchbench.jpg',
    //   type: 'image/jpeg',
    //   hash: 'a97c303cb92884476c99fa02e5778134c7a352b6',
    //   lastModifiedDate: 2020-10-31T11:16:20.810Z,
    // }

    checkFileType(fb_file);
    checkFileSize(fb_file);
    pruneFileName(fb_file);
    const asset_id = newUuid();
    const file_name = asset_id + getFileExt(fb_file.path);
    const params = {
      Bucket,
      Key:  [...folders, 'large', file_name].join('/'), // '/uploads/images/large/uuid.jpg'
      Body: fs.createReadStream(fb_file.path),
      ACL,
    };
    const s3data = await s3UploadPromise(params);
    // TODO: save versions: small (400x300) and medium (1024x768), large (2048x1446 ideally)
    data = { ...s3data, asset_id, file_name, file_type: fb_file.type, file_size: fb_file.size };
  } catch (err) {
    error = err.message;
  }

  const t2 = new Date();
  const delta = t2.getTime() - t1.getTime();
  console.log(req.id, '/api/upload request END', delta, 'ms');
  // try to send status 200, always! HTTP is merely a way of talking to backend; no need for a RESTful service.
  res.setHeader('x-fb-time-ms', delta);
  res.json({ data, error });
}

export async function receiveFiles(req) {
  console.log('receiveFiles');
  return new Promise((resolve, reject) => {  
    const form = formidable({ multiples: true, keepExtensions: true, hash: 'sha1' });
    console.log('form parse start');
    form.parse(req, (err, fields, files) => {
      console.log('form parse end', err, fields, files);
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  })
}

export async function s3UploadPromise(params) {
  console.log('s3UploadPromise start', params);
  return new Promise((resolve, reject) => {  
    s3.upload(params, (err, data) => {
      console.log('s3UploadPromise end', err, data);
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  })
}

export function checkFileType({ type }) {
  if (!ACCEPT_MIMETYPES.includes(type)) throw new Error(ERR_INVALID_FILE_TYPE);
  return true;
}

export function checkFileSize({ size = 0 }) {
  if (MAX_FILE_SIZE < size) throw new Error(ERR_INVALID_FILE_SIZE);
  return true;
}

export function pruneFileName(fb_file) {
  fb_file.name = String(fb_file.name).toLowerCase().replace(/[^a-z0-9.-]/, '-');
  return fb_file;
}

export function getFileExt(filePath) {
  return path.extname(filePath).toLocaleLowerCase(); // => '.jpg'
}
