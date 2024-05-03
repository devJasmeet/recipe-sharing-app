import React, { useCallback, useEffect,useState } from 'react'
import { useForm } from 'react-hook-form'
import { Select,Button,Input,QuillRTE,Container,FormError } from '../index'
import service from '../../appwrite/services'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function ArticleForm({article}) {

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        getValues,
        formState: { errors }
    } = useForm({
        defaultValues:{
            title: article?.title || "",
            slug: article?.$id || "",
            content:article?.content || "",
            status:article?.status || "Active"
        }
    })

    const navigate = useNavigate()
    const [imageSrc,setSrc] = useState("")
    const userData = useSelector(state => state.auth.userData)
    //console.log(userData);
    console.log("Logged");

    const submit = async(data) => {
        console.log("article submit called");
//  current article has to be updated
        if(article) {
            console.log("entered update function");
            
            const file = data.featuredImage[0] ? await service.uploadFile(data.image[0]) : null;
            console.log("file upload result :", file);

            if(file) {
                await service.delFile(article.featuredImage)
            }
            
            try {
                const update = await service.updateArticle(article.$id,{
                    ...data,
                    featuredImage : file ? file.$id : undefined
                })
    
                if(update) {
                    console.log(update);
                    navigate(`/article/${update.$id}`)
                }
            } catch (error) {
                console.log(error);
            }

        } else {    
// new article creation
            //console.log(data);
            console.log("entered create function");
            if(userData) {
                if(data.featuredImage[0]) {

                    const file = await service.uploadFile(data.featuredImage[0])
                    console.log("file upload result :", file);

                    if(file) {
                        const fileId = file.$id;
                        data.featuredImage= fileId 
                        console.log(userData);

                            const newArticle = await service.createArticle({
                                ...data,
                                userId:userData.$id,
                                author:userData.name
                            })
                            if(newArticle) {
                                navigate(`/article/${newArticle.$id}`)
                            }
                        }
                } else {
                    console.log("Image is required");
                }
            } else { navigate("/") }
        }
    }

    const buildSlug = useCallback((value)=>{
        if(value && typeof value ==='string') {
            return value
            .trim()
            .toLowerCase()
            .replace( /\s+/g, "-") //replace spaces with -
        }
        return ""
    },[])

    useEffect(() => {
        if(article) service.getFile(article?.featuredImage).then( res => setSrc(res));
    },[])

    useEffect(()=>{
        const subscription = watch( (value,{name})=> {
            if(name === "title") {
                setValue('slug' , buildSlug(value.title,{shouldValidate:true}))
            }
        } )

        return () => {
            subscription.unsubscribe()
        }
    },[ watch , buildSlug , setValue])

    return (
        <div className='h-full'>
            <Container>
                <form onSubmit={handleSubmit(submit)} className='mx-2 my-6 flex h-full article-form ' >
                    <div className=' w-2/3 flex flex-col' >
                        <Input
                            label="Title"
                            placeholder="Article title"
                            type="text"
                            {...register("title" , {required:true})}
                        />
                        {errors.title && <FormError>title is required</FormError>}
                        <Input
                            label="Slug"
                            placeholder=""
                            type="text"
                            {...register("slug" , {required:true})}
                            onInput = {(e)=>{
                                setValue("slug" , buildSlug(e.currentTarget.value,{shouldValidate:true}) )
                            }}
                        />
                        

                        <QuillRTE 
                            label='Content'
                            control={control}
                            name='content'
                            defaultValue={getValues('content')}
                        /> 

                    </div>

                    <div className=' w-1/3 flex flex-col gap-8 h-full pl-4 items-end  ' >
                        <div className=' w-full flex-col'>
                            <Input
                                label="Image"
                                accept=" image/png image/jpg image/jpeg "
                                type="file"
                                {...register("featuredImage" , {required:!article})}
                                className = "border-transparent p-0 "
                            />
                            {errors.featuredImage && <FormError>Image is required</FormError>}
                            
                            {
                                article ? <div className='w-full  ' >
                                    <img 
                                        src={imageSrc}
                                        alt={article.title}
                                        className='w-1/2 mx-auto border-2 border-black' 
                                    />
                                </div> : null
                            }
                            
                        </div>
                        <div>
                            <Select 
                                options = {['Active','Inactive']}
                                label = "Status"
                                className = ""
                                {...register("status" , {required:true})}
                            />
                        </div>
                        <div>
                            <Button type='submit' className='ml-auto'>
                                {article ? "Update" : "Submit"}
                            </Button>  
                        </div>
                    </div>
                </form>
            </Container>
        </div>
  )
}

export default ArticleForm

/* 
<RTE 
                    label='content'
                    control={control}
                    name='content'
                    defaultValue={getValues('content')}
/>

<Input
                            label="Content"
                            placeholder="Write here"
                            type="text"
                            {...register("content" , {required:true})}
                        />
                        {errors.content && <FormError>content is required</FormError>}


*/