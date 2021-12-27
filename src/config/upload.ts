import multer from 'multer';
import { resolve, extname } from 'path';

export default {
  upload(folder: string, fileName: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (request, file, callback) => {
          const fileName = `${request.params.id}_SCAN${extname(
            file.originalname
          )}`;

          return callback(null, fileName);
        },
      }),
    };
  },
};
