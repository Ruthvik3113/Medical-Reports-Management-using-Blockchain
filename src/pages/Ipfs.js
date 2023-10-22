import React, { useCallback, useState } from 'react';
import { useStorageUpload, MediaRenderer } from '@thirdweb-dev/react';
import { useDropzone } from 'react-dropzone';



const Ipfs = () => {
    const [uris, setUris] = useState([]);
    const { mutateAsync: upload } = useStorageUpload();

    const onDrop = useCallback(async (acceptedFiles) => {
        const _uris = await upload({ data: acceptedFiles });
        setUris(_uris);
    }, [upload]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <button className='addContactTriggerButton'>Upload Report into Ipfs</button>
            </div>
            <div>
                {uris.map((uri) => (
                    <div key={uri}>
                        <MediaRenderer src={uri} alt="Image" width='100%' />
                        <a>{uri}</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Ipfs;
