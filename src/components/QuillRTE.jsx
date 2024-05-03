import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import {Controller} from 'react-hook-form'
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const QuillRTE = ({name,control,label,defaultValue=""}) => {

    const [content, setContent] = useState('');

    return (
    <>
        <div className="editor mt-4 ">

            {label && <label className='text-sm font-semibold ' >{label} :</label>}

            <Controller
                name={name || "content"}
                control={control}
                render={({field : {value,onChange} }) => (
                    <ReactQuill
                        value={value || defaultValue}
                        onChange={onChange}
                        modules={{
                            toolbar: [
                            [{ 'header': '1'}],
                            [{size: []}],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            ['clean']
                            ]
                        }}
                    />
                )}
            />
        </div>
    </>
  );
};

export default QuillRTE;
