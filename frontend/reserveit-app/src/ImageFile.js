import React from 'react';

const ImageFile = (props) => {
    const BK_PATH = 'D:\\master\\ReserveIt-Server\\'
    const fileUrl = `http://localhost:3001/file?path=${encodeURIComponent(BK_PATH + props.filePath)}`;

    return (
        <img
            src={fileUrl}
            alt="preview"
            style={{width: '250px', height: '250px'}}
        />
    );
};

export default ImageFile;