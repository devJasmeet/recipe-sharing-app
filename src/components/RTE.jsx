import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'
 
function RTE({name,control,label,defaultValue=""}) {
  return (
    <div>
      {
        label && <label>{label}</label>
      }

      <Controller 
        name={name || "content"}
        control={control}
        render={({field:{onChange}})=>(
            <Editor 
                initialValue='default'
                init={
                    {
                        initialValue:defaultValue,
                        branding:false,
                        height:500,
                        menubar:true,
                        plugins: ['advlist autolink link image imagetools lists charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount save textcolor'
                        ],
                        toolbar: 'undo redo | formatselect | bold italic forecolor backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | link image media | code | fullscreen | save',
                    }
                }
                onEditorChange={onChange}
            />
        )}
      />
    </div>
  )
}

export default RTE
/*
<Editor 
    initialValue='default'
    init={
        {
            branding:false,
            height:500,
            menubar:true,
            plugins: ['advlist autolink link image imagetools lists charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount save textcolor'
            ],
            toolbar: 'undo redo | formatselect | bold italic forecolor backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | link image media | code | fullscreen | save',
        }
    }
/>
*/